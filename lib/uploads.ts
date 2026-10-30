import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

export const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");
const MAX_BYTES = 20 * 1024 * 1024;

// Saves an uploaded photo as a resized JPEG and returns its public URL, or null if no file was chosen.
export async function saveUpload(file: FormDataEntryValue | null): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/")) throw new Error("Faqat rasm fayllarini yuklash mumkin");
  if (file.size > MAX_BYTES) throw new Error("Rasm hajmi 20 MB dan oshmasligi kerak");

  const name = `${crypto.randomUUID()}.jpg`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await sharp(Buffer.from(await file.arrayBuffer()))
    .rotate()
    .resize({ width: 1600, height: 2000, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true })
    .toFile(path.join(UPLOAD_DIR, name));
  return `/uploads/${name}`;
}
