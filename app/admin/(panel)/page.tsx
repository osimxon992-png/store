import Link from "next/link";
import { readStore } from "@/lib/store";

export default async function Dashboard() {
  const store = await readStore();
  const cards = [
    { href: "/admin/products", label: "Mahsulotlar", value: store.products.length, note: "Obrazlar bo'limi" },
    { href: "/admin/categories", label: "Kategoriyalar", value: store.categories.length, note: "Kolleksiya bo'limi" },
    { href: "/admin/images", label: "Rasmlar", value: store.hero.length + store.lookbook.length, note: "Bosh ekran va lookbook" },
  ];

  return (
    <>
      <header className="adm-head">
        <div>
          <h1 className="adm-h1">Xush kelibsiz 👋</h1>
          <p className="adm-muted">Saytdagi mahsulotlar, rasmlar va ma&apos;lumotlarni shu yerdan boshqaring.</p>
        </div>
        <Link href="/admin/products/new" className="adm-btn">
          + Yangi mahsulot
        </Link>
      </header>
      <div className="adm-stats">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="adm-card adm-stat">
            <span className="adm-muted">{c.label}</span>
            <strong>{c.value}</strong>
            <span className="adm-hint">{c.note} →</span>
          </Link>
        ))}
      </div>
      <section className="adm-card">
        <h2 className="adm-h2">Aloqa</h2>
        <dl className="adm-dl">
          <dt>Telefon</dt>
          <dd>{store.contact.phone}</dd>
          <dt>Manzil</dt>
          <dd>{store.contact.address}</dd>
          <dt>Ish vaqti</dt>
          <dd>{store.contact.hours}</dd>
          <dt>Instagram</dt>
          <dd>@{store.contact.instagram}</dd>
        </dl>
        <Link href="/admin/settings" className="adm-link">
          O&apos;zgartirish →
        </Link>
      </section>
    </>
  );
}
