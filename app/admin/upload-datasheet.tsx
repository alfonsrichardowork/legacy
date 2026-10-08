// "use server"
// import fs from "node:fs/promises";
// import path from "path";

// function sanitizeFilename(name: string) {
//   const ext = path.extname(name);
//   const base = path.basename(name, ext);

//   // Replace unsafe characters with underscore
//   const safeBase = base.replace(/[^a-zA-Z0-9 _.-]/g, "_");

//   return safeBase + ext;
// }

// const ALLOWED_TYPES = [
//   "application/pdf",
//   "application/zip",
//   "application/x-zip-compressed",
//   "application/step",
//   "application/sla",
//   "application/octet-stream"
// ];

// const ALLOWED_EXTENSIONS = [
//   ".pdf",
//   ".zip",
//   ".step",
//   ".stp"
// ];

// const ALLOWED_FOLDERS = [
//   "featuredimages", 
//   "newsimages", 
//   "other", 
//   "productcoverimage",
//   "productdatasheet",
//   "productdrawing",
//   "productfrequencyresponse",
//   "productimagecatalogues",
//   "productimpedance"
// ];

// async function getUniqueFilename(dir: string, originalName: string): Promise<string> {
//   const ext = path.extname(originalName);
//   const base = path.basename(originalName, ext);

//   if (!ALLOWED_EXTENSIONS.includes(ext.toLowerCase())) {
//     throw new Error("Invalid file extension");
//   }

//   let filename = originalName;
//   let counter = 1;

//   // Keep looping until we find a non-existing filename
//   while (true) {
//     try {
//       await fs.access(path.join(dir, filename)); // Check if file exists
//       filename = `${base}-${counter}${ext}`;      // If exists, increment
//       counter++;
//     } catch {
//       break; // File does not exist → we can use this filename
//     }
//   }

//   return filename;
// }

// export async function uploadDatasheet(formData: FormData, folder: string) {
//   const file = formData.get("file") as File;
//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = new Uint8Array(arrayBuffer);

//   if (!ALLOWED_FOLDERS.includes(folder)) {
//     throw new Error("Invalid folder");
//   }

//   const uploadDir = path.join(process.cwd(), "uploads", folder);

//   // Sanitize filename (keep case)
//   const safeName = sanitizeFilename(file.name);

//   // Find a unique filename by incrementing
//   const uniqueFilename = await getUniqueFilename(uploadDir, safeName);

//   if (!ALLOWED_TYPES.includes(file.type)) {
//     throw new Error("Invalid file type");
//   }

//   const filePath = path.join(/* turbopackIgnore: true */ uploadDir, uniqueFilename);

//   await fs.writeFile(filePath, buffer);

//   return `/uploads/${folder}/${uniqueFilename}`;
// }







"use server"
import fs from "node:fs/promises";
import path from "path";
import { checkBearerAPI, getSession } from "./actions";
import { MAX_SIZE } from "./model/model";

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".zip",
  ".step",
  ".stp"
];

const ALLOWED_TYPES_BY_EXTENSION: Record<string, string[]> = {
  ".pdf": ["application/pdf"],
  ".zip": ["application/zip", "application/x-zip-compressed", "application/octet-stream"],
  ".step": ["application/step", "application/sla", "application/octet-stream"],
  ".stp": ["application/step", "application/sla", "application/octet-stream"],
};

const ALLOWED_FOLDERS = [
  "featuredimages", 
  "newsimages", 
  "other", 
  "productcoverimage",
  "productdatasheet",
  "productdrawing",
  "productfrequencyresponse",
  "productimagecatalogues",
  "productimpedance"
];

function hasErrorCode(error: unknown, code: string): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === code;
}

async function writeUniqueFile(dir: string, originalName: string, buffer: Uint8Array): Promise<string> {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);
  let counter = 0;

  while (true) {
    const filename = counter === 0 ? originalName : `${base}-${counter}${ext}`;
    try {
      await fs.writeFile(path.join(dir, filename), buffer, { flag: "wx" });
      return filename;
    } catch (error) {
      if (!hasErrorCode(error, "EEXIST")) throw error;
      counter++;
    }
  }
}

export async function uploadDatasheet(formData: FormData, folder: string = 'productdatasheet') {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Please sign in before uploading files");
  }
  if (!(await checkBearerAPI(session))) {
    session.destroy();
    throw new Error("Your session is no longer valid");
  }

  if (!ALLOWED_FOLDERS.includes(folder)) {
    throw new Error("Invalid folder");
  }
  const value = formData.get("file");
  if (typeof File === "undefined" || !(value instanceof File) || value.size === 0) {
    throw new Error("A non-empty file is required");
  }

  const file = value;
  if ((folder === "catalogues" || folder === "applicationdatasheet") && file.size > MAX_SIZE) {
    throw new Error("Files must be 50 MB or smaller");
  }

  const extension = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error("Invalid file extension");
  }
  if (!ALLOWED_TYPES_BY_EXTENSION[extension]?.includes(file.type)) {
    throw new Error("File type does not match its extension");
  }
  if (folder === "applicationdatasheet" && extension !== ".pdf") {
    throw new Error("Application datasheets must be PDF files");
  }

  const safeBase = path.basename(file.name, path.extname(file.name))
    .replace(/[^a-zA-Z0-9 _.-]/g, "_")
    .replace(/^\.+$/, "file")
    .slice(0, 180);
  const safeName = `${safeBase || "file"}${extension}`;
  const buffer = new Uint8Array(await file.arrayBuffer());
  if (folder === "applicationdatasheet" && !new TextDecoder().decode(buffer.subarray(0, 1024)).includes("%PDF-")) {
    throw new Error("Application datasheets must contain a valid PDF header");
  }

  const uploadDir = path.join(process.cwd(), "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });
  const uniqueFilename = await writeUniqueFile(uploadDir, safeName, buffer);

  return `/uploads/${folder}/${uniqueFilename}`;
}
