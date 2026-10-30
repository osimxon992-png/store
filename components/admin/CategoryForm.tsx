"use client";

import { useActionState } from "react";
import { saveCategory } from "@/app/admin/actions";
import type { Category } from "@/lib/types";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";

export default function CategoryForm({ category }: { category?: Category }) {
  const [state, action] = useActionState(saveCategory, {});

  return (
    <form action={action} className="adm-cat">
      <input type="hidden" name="id" value={category?.id ?? ""} />
      <ImageField name="image" label="Rasm" current={category?.image} />
      <label className="adm-field">
        <span className="adm-label">Nomi</span>
        <input name="title" defaultValue={category?.title} required placeholder="Masalan: Kurtkalar" />
      </label>
      {state.error && <p className="adm-error">{state.error}</p>}
      <SubmitButton>{category ? "Saqlash" : "Qo'shish"}</SubmitButton>
    </form>
  );
}
