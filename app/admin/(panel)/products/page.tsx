import Link from "next/link";
import { readStore } from "@/lib/store";
import { deleteProduct, moveProduct } from "../../actions";
import Saved from "@/components/admin/Saved";
import ConfirmButton from "@/components/admin/ConfirmButton";
import MoveButtons from "@/components/admin/MoveButtons";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ products }, { saved }] = await Promise.all([readStore(), searchParams]);

  return (
    <>
      <header className="adm-head">
        <div>
          <h1 className="adm-h1">Mahsulotlar</h1>
          <p className="adm-muted">Saytdagi &quot;Obrazlar&quot; bo&apos;limi. Tartibni strelkalar bilan o&apos;zgartiring.</p>
        </div>
        <Link href="/admin/products/new" className="adm-btn">
          + Yangi mahsulot
        </Link>
      </header>
      <Saved show={saved === "1"} />

      {products.length === 0 ? (
        <p className="adm-card adm-muted">Hali mahsulot yo&apos;q.</p>
      ) : (
        <ul className="adm-list">
          {products.map((p, i) => (
            <li key={p.id} className="adm-card adm-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt="" className="adm-row__thumb" />
              <div className="adm-row__info">
                <strong>{p.title}</strong>
                <span className="adm-muted">{p.note}</span>
                {p.tag && <span className="adm-tag">{p.tag}</span>}
              </div>
              <div className="adm-row__tools">
                <MoveButtons id={p.id} action={moveProduct} canUp={i > 0} canDown={i < products.length - 1} />
                <Link href={`/admin/products/${p.id}`} className="adm-btn adm-btn--ghost">
                  Tahrirlash
                </Link>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton message={`"${p.title}" o'chirilsinmi?`}>O&apos;chirish</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
