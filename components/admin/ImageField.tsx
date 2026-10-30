"use client";

import { useEffect, useState } from "react";

type Props = { name: string; label: string; current?: string; hint?: string };

// Shows the current photo and previews a newly picked file before it is saved.
export default function ImageField({ name, label, current = "", hint }: Props) {
  const [preview, setPreview] = useState(current);

  useEffect(() => () => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <label className="adm-image">
      <span className="adm-label">{label}</span>
      <span className="adm-image__box">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" />
        ) : (
          <span className="adm-image__empty">Rasm tanlang</span>
        )}
        <span className="adm-image__change">{preview ? "Almashtirish" : "Yuklash"}</span>
      </span>
      <input
        type="file"
        name={`${name}_file`}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setPreview(file ? URL.createObjectURL(file) : current);
        }}
      />
      <input type="hidden" name={`${name}_current`} value={current} />
      {hint && <span className="adm-hint">{hint}</span>}
    </label>
  );
}
