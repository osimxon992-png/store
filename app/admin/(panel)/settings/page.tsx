import { readStore } from "@/lib/store";
import SettingsForm from "@/components/admin/SettingsForm";
import Saved from "@/components/admin/Saved";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [store, { saved }] = await Promise.all([readStore(), searchParams]);

  return (
    <>
      <header className="adm-head">
        <div>
          <h1 className="adm-h1">Sozlamalar</h1>
          <p className="adm-muted">Aloqa ma&apos;lumotlari va saytdagi matnlar.</p>
        </div>
      </header>
      <Saved show={saved === "1"} />
      <SettingsForm contact={store.contact} about={store.about} marquee={store.marquee} />
    </>
  );
}
