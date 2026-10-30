import { readStore } from "@/lib/store";
import GalleryForm from "@/components/admin/GalleryForm";
import Saved from "@/components/admin/Saved";

export default async function ImagesPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [store, { saved }] = await Promise.all([readStore(), searchParams]);

  return (
    <>
      <header className="adm-head">
        <div>
          <h1 className="adm-h1">Rasmlar</h1>
          <p className="adm-muted">Vertikal (portret) rasmlar eng yaxshi ko&apos;rinadi.</p>
        </div>
      </header>
      <Saved show={saved === "1"} />

      <section className="adm-card">
        <h2 className="adm-h2">Bosh ekran</h2>
        <p className="adm-muted">Yonma-yon 3 ta rasm. Telefonda faqat 2-rasm ko&apos;rinadi.</p>
        <GalleryForm kind="hero" images={store.hero} count={3} />
      </section>
      <section className="adm-card">
        <h2 className="adm-h2">Lookbook</h2>
        <p className="adm-muted">Scroll paytida har xil tezlikda harakatlanadigan 4 ta rasm.</p>
        <GalleryForm kind="lookbook" images={store.lookbook} count={4} />
      </section>
    </>
  );
}
