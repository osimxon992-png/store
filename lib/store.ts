import { promises as fs } from "fs";
import path from "path";
import type { Store } from "./types";

const FILE = path.join(process.cwd(), "data", "store.json");

export async function readStore(): Promise<Store> {
  return JSON.parse(await fs.readFile(FILE, "utf8"));
}

// Writes are queued so two quick saves from the admin panel can't clobber each other.
let queue: Promise<unknown> = Promise.resolve();

export function updateStore(change: (store: Store) => void | Promise<void>): Promise<void> {
  const run = queue.then(async () => {
    const store = await readStore();
    await change(store);
    const tmp = `${FILE}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(store, null, 2) + "\n");
    await fs.rename(tmp, FILE);
  });
  queue = run.catch(() => {});
  return run;
}

export function slugify(text: string) {
  const base = text
    .toLowerCase()
    .replace(/[ʻʼ'`’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "item"}-${Math.random().toString(36).slice(2, 6)}`;
}
