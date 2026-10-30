"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Bosh sahifa" },
  { href: "/admin/products", label: "Mahsulotlar" },
  { href: "/admin/categories", label: "Kategoriyalar" },
  { href: "/admin/images", label: "Rasmlar" },
  { href: "/admin/settings", label: "Sozlamalar" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="adm-nav">
      {LINKS.map((l) => {
        const active = l.href === "/admin" ? path === "/admin" : path.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} className={active ? "is-active" : undefined}>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
