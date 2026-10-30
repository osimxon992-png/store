"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { slugify, updateStore } from "@/lib/store";
import { saveUpload } from "@/lib/uploads";

export type FormState = { error?: string };

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

// A picture field is either a freshly uploaded file or the path it already had.
async function picture(form: FormData, key: string) {
  return (await saveUpload(form.get(`${key}_file`))) ?? text(form, `${key}_current`);
}

function done(path: string): never {
  revalidatePath("/");
  redirect(`${path}?saved=1`);
}

function move<T extends { id: string }>(list: T[], id: string, dir: string) {
  const i = list.findIndex((x) => x.id === id);
  const j = dir === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
}

/* ---------- Auth ---------- */

export async function login(_: FormState, form: FormData): Promise<FormState> {
  if (!checkPassword(text(form, "password"))) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: "Parol noto'g'ri" };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------- Products ---------- */

export async function saveProduct(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(form, "id");
  const title = text(form, "title");
  if (!title) return { error: "Nomini kiriting" };

  try {
    const image = await picture(form, "image");
    const hover = (await picture(form, "hover")) || image;
    if (!image) return { error: "Asosiy rasmni yuklang" };

    const product = { title, note: text(form, "note"), tag: text(form, "tag"), href: text(form, "href"), image, hover };
    await updateStore((s) => {
      const existing = s.products.find((p) => p.id === id);
      if (existing) Object.assign(existing, product);
      else s.products.unshift({ id: slugify(title), ...product });
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  done("/admin/products");
}

export async function deleteProduct(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  await updateStore((s) => {
    s.products = s.products.filter((p) => p.id !== id);
  });
  done("/admin/products");
}

export async function moveProduct(form: FormData) {
  await requireAdmin();
  await updateStore((s) => move(s.products, text(form, "id"), text(form, "dir")));
  revalidatePath("/");
  redirect("/admin/products");
}

/* ---------- Categories ---------- */

export async function saveCategory(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(form, "id");
  const title = text(form, "title");
  if (!title) return { error: "Nomini kiriting" };

  try {
    const image = await picture(form, "image");
    if (!image) return { error: "Rasmni yuklang" };
    await updateStore((s) => {
      const existing = s.categories.find((c) => c.id === id);
      if (existing) Object.assign(existing, { title, image });
      else s.categories.push({ id: slugify(title), title, image });
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  done("/admin/categories");
}

export async function deleteCategory(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  await updateStore((s) => {
    s.categories = s.categories.filter((c) => c.id !== id);
  });
  done("/admin/categories");
}

export async function moveCategory(form: FormData) {
  await requireAdmin();
  await updateStore((s) => move(s.categories, text(form, "id"), text(form, "dir")));
  revalidatePath("/");
  redirect("/admin/categories");
}

/* ---------- Hero & lookbook photos ---------- */

export async function saveGallery(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const kind = text(form, "kind");
  if (kind !== "hero" && kind !== "lookbook") return { error: "Noma'lum bo'lim" };
  const count = Number(text(form, "count"));

  try {
    const images: string[] = [];
    for (let i = 0; i < count; i++) images.push(await picture(form, `slot${i}`));
    await updateStore((s) => {
      s[kind] = images;
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Saqlashda xatolik" };
  }
  done("/admin/images");
}

/* ---------- Settings ---------- */

export async function saveSettings(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const phone = text(form, "phone");
  if (!phone) return { error: "Telefon raqamini kiriting" };
  const handle = (key: string) => text(form, key).replace(/^@/, "").replace(/^https?:\/\/[^/]+\//, "").replace(/\/$/, "");

  await updateStore((s) => {
    s.contact = {
      phone,
      address: text(form, "address"),
      hours: text(form, "hours"),
      instagram: handle("instagram"),
      telegram: handle("telegram"),
      founder: handle("founder"),
      mapQuery: text(form, "mapQuery"),
    };
    s.about = text(form, "about");
    s.marquee = text(form, "marquee")
      .split(/[\n,]/)
      .map((w) => w.trim())
      .filter(Boolean);
  });
  revalidatePath("/offline");
  done("/admin/settings");
}
