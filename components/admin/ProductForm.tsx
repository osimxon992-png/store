"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveProduct } from "@/app/admin/actions";
import type { Product } from "@/lib/types";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";

export default function ProductForm({ product }: { product?: Product }) {
  const [state, action] = useActionState(saveProduct, {});

  return (
    <form action={action} className="adm-card adm-form">
      <input type="hidden" name="id" value={product?.id ?? ""} />
      <div className="adm-form__images">
        <ImageField name="image" label="Asosiy rasm" current={product?.image} hint="Kartochkada ko'rinadi" />
        <ImageField
          name="hover"
          label="Ikkinchi rasm"
          current={product?.hover}
          hint="Sichqoncha ustiga borganda chiqadi (ixtiyoriy)"
        />
      </div>
      <div className="adm-form__fields">
        <label className="adm-field">
          <span className="adm-label">Nomi</span>
          <input name="title" defaultValue={product?.title} required placeholder="Masalan: Bordo kurtka" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Qisqa izoh</span>
          <textarea name="note" rows={3} defaultValue={product?.note} placeholder="1–2 jumla" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Belgi (ixtiyoriy)</span>
          <input name="tag" defaultValue={product?.tag} placeholder="Yangi, Hit, Chegirma…" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Buyurtma havolasi</span>
          <input name="href" type="url" defaultValue={product?.href} placeholder="https://www.instagram.com/p/…" />
          <span className="adm-hint">Instagram post yoki Telegram havolasi. Bo&apos;sh qolsa Instagram sahifasi ochiladi.</span>
        </label>
        {state.error && <p className="adm-error">{state.error}</p>}
        <div className="adm-actions">
          <SubmitButton />
          <Link href="/admin/products" className="adm-btn adm-btn--ghost">
            Bekor qilish
          </Link>
        </div>
      </div>
    </form>
  );
}
