"use client";

import { useActionState } from "react";
import { login } from "../actions";
import SubmitButton from "@/components/admin/SubmitButton";

export default function LoginPage() {
  const [state, action] = useActionState(login, {});

  return (
    <main className="adm-login">
      <form action={action} className="adm-card adm-login__card">
        <div className="adm-logo">
          ONE<b>23</b>
        </div>
        <p className="adm-muted">Boshqaruv paneliga kirish</p>
        <label className="adm-field">
          <span className="adm-label">Parol</span>
          <input type="password" name="password" required autoFocus autoComplete="current-password" />
        </label>
        {state.error && <p className="adm-error">{state.error}</p>}
        <SubmitButton>Kirish</SubmitButton>
      </form>
    </main>
  );
}
