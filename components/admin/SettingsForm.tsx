"use client";

import { useActionState } from "react";
import { saveSettings } from "@/app/admin/actions";
import type { Store } from "@/lib/types";
import SubmitButton from "./SubmitButton";

type Props = Pick<Store, "contact" | "about" | "marquee">;

export default function SettingsForm({ contact, about, marquee }: Props) {
  const [state, action] = useActionState(saveSettings, {});

  return (
    <form action={action} className="adm-card adm-settings">
      <h2 className="adm-h2">Aloqa ma&apos;lumotlari</h2>
      <div className="adm-grid2">
        <label className="adm-field">
          <span className="adm-label">Telefon</span>
          <input name="phone" defaultValue={contact.phone} required />
        </label>
        <label className="adm-field">
          <span className="adm-label">Ish vaqti</span>
          <input name="hours" defaultValue={contact.hours} />
        </label>
        <label className="adm-field adm-span2">
          <span className="adm-label">Manzil</span>
          <input name="address" defaultValue={contact.address} />
        </label>
        <label className="adm-field adm-span2">
          <span className="adm-label">Xaritada qidiriladigan manzil</span>
          <input name="mapQuery" defaultValue={contact.mapQuery} />
          <span className="adm-hint">Google xaritada shu matn bo&apos;yicha joy ko&apos;rsatiladi.</span>
        </label>
        <label className="adm-field">
          <span className="adm-label">Instagram</span>
          <input name="instagram" defaultValue={contact.instagram} placeholder="one23_uz" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Telegram</span>
          <input name="telegram" defaultValue={contact.telegram} placeholder="one23uz" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Founder (Instagram)</span>
          <input name="founder" defaultValue={contact.founder} placeholder="bek_vines" />
        </label>
      </div>

      <h2 className="adm-h2">Matnlar</h2>
      <label className="adm-field">
        <span className="adm-label">&quot;Biz haqimizda&quot; matni</span>
        <textarea name="about" rows={5} defaultValue={about} />
      </label>
      <label className="adm-field">
        <span className="adm-label">Yuguruvchi yozuv so&apos;zlari</span>
        <textarea name="marquee" rows={3} defaultValue={marquee.join("\n")} />
        <span className="adm-hint">Har bir so&apos;z yangi qatorda yoki vergul bilan.</span>
      </label>

      {state.error && <p className="adm-error">{state.error}</p>}
      <div className="adm-actions">
        <SubmitButton />
      </div>
    </form>
  );
}
