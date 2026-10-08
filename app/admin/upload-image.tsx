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
//   "image/jpeg",
//   "image/png",
//   "image/webp",
//   "image/gif",
//   "image/svg+xml",
//   "image/bmp",
//   "image/tiff",
//   "image/avif"
// ];

// const ALLOWED_EXTENSIONS = [
//   ".jpg",
//   ".jpeg",
//   ".png",
//   ".webp",
//   ".gif",
//   ".svg",
//   ".bmp",
//   ".tif",
//   ".tiff",
//   ".avif"
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

// export async function uploadImage(formData: FormData, folder: string) {
//   const file = formData.get("image") as File;
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
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".bmp",
  ".tif",
  ".tiff",
  ".avif"
];

const ALLOWED_TYPES_BY_EXTENSION: Record<string, string[]> = {
  ".jpg": ["image/jpeg"],
  ".jpeg": ["image/jpeg"],
  ".png": ["image/png"],
  ".webp": ["image/webp"],
  ".gif": ["image/gif"],
  ".svg": ["image/svg+xml"],
  ".bmp": ["image/bmp"],
  ".tif": ["image/tiff"],
  ".tiff": ["image/tiff"],
  ".avif": ["image/avif"],
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

function hasApplicationImageSignature(buffer: Uint8Array, extension: string): boolean {
  const header = String.fromCharCode(...buffer.subarray(0, 12));
  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case ".png":
      return header.startsWith("\x89PNG\r\n\x1a\n");
    case ".gif":
      return header.startsWith("GIF87a") || header.startsWith("GIF89a");
    case ".webp":
      return header.startsWith("RIFF") && header.slice(8, 12) === "WEBP";
    case ".bmp":
      return header.startsWith("BM");
    case ".tif":
    case ".tiff":
      return (
        (buffer[0] === 0x49 && buffer[1] === 0x49 && buffer[2] === 0x2a && buffer[3] === 0x00) ||
        (buffer[0] === 0x4d && buffer[1] === 0x4d && buffer[2] === 0x00 && buffer[3] === 0x2a)
      );
    case ".avif":
      return header.slice(4, 8) === "ftyp" && /avif|avis/.test(header.slice(8));
    default:
      return false;
  }
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

export async function uploadImage(formData: FormData, folder: string) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Please sign in before uploading images");
  }
  if (!(await checkBearerAPI(session))) {
    session.destroy();
    throw new Error("Your session is no longer valid");
  }

  if (!ALLOWED_FOLDERS.includes(folder)) {
    throw new Error("Invalid folder");
  }
  const value = formData.get("image");
  if (typeof File === "undefined" || !(value instanceof File) || value.size === 0) {
    throw new Error("A non-empty image file is required");
  }

  const file = value;
  if (file.size > MAX_SIZE) {
    throw new Error("Images must be 50 MB or smaller");
  }

  const extension = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error("Invalid image extension");
  }
  if (!ALLOWED_TYPES_BY_EXTENSION[extension]?.includes(file.type)) {
    throw new Error("Image type does not match its file extension");
  }
  if (folder === "applicationimage" && extension === ".svg") {
    throw new Error("SVG images are not supported for applications");
  }

  const safeBase = path.basename(file.name, path.extname(file.name))
    .replace(/[^a-zA-Z0-9 _.-]/g, "_")
    .replace(/^\.+$/, "image")
    .slice(0, 180);
  const safeName = `${safeBase || "image"}${extension}`;
  const buffer = new Uint8Array(await file.arrayBuffer());
  if (folder === "applicationimage" && !hasApplicationImageSignature(buffer, extension)) {
    throw new Error("The uploaded file is not a supported image");
  }
  const uploadDir = path.join(process.cwd(), "uploads", folder);
  await fs.mkdir(uploadDir, { recursive: true });

  const uniqueFilename = await writeUniqueFile(uploadDir, safeName, buffer);

  return `/uploads/${folder}/${uniqueFilename}`;
}
