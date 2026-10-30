"use client";

import { useActionState } from "react";
import { saveGallery } from "@/app/admin/actions";
import ImageField from "./ImageField";
import SubmitButton from "./SubmitButton";

type Props = { kind: "hero" | "lookbook"; images: string[]; count: number };

export default function GalleryForm({ kind, images, count }: Props) {
  const [state, action] = useActionState(saveGallery, {});

  return (
    <form action={action} className="adm-gallery">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="count" value={count} />
      <div className="adm-gallery__grid">
        {Array.from({ length: count }, (_, i) => (
          <ImageField key={i} name={`slot${i}`} label={`${i + 1}-rasm`} current={images[i]} />
        ))}
      </div>
      {state.error && <p className="adm-error">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
