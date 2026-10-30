"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children = "Saqlash" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn" disabled={pending}>
      {pending ? "Saqlanmoqda…" : children}
    </button>
  );
}
