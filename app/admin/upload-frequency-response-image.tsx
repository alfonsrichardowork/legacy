"use server"
import fs from "node:fs/promises";
import path from "path";

function sanitizeFilename(name: string) {
  // Extract extension safely
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, ext);

  // Normalize, replace spaces with dash, remove bad chars
  const safeBase = base
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/\s+/g, '-')                            // spaces → dash
    .replace(/[^a-zA-Z0-9_-]/g, '')                  // remove non-safe chars
    .replace(/-+/g, '-')                             // collapse dashes
    .replace(/^[-_]+|[-_]+$/g, '')                   // trim dashes/underscores
    .toLowerCase();

  return `${safeBase}${ext}`;
}

export async function uploadFrequencyResponseImage(formData: FormData) {
  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  // Create a unique filename to avoid collisions
  const filename = `${Date.now()}-${sanitizeFilename(file.name)}`;
  const filePath = path.join(process.cwd(), "uploads", "productfrequencyresponse", filename);

  // Write the file to the specified path
  await fs.writeFile(filePath, buffer);

  // Return the URL for the uploaded file
  const fileUrl = `/uploads/productfrequencyresponse/${filename}`;
  return fileUrl;
}