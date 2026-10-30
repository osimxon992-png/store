import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link href="/admin" className="adm-logo">
          ONE<b>23</b>
        </Link>
        <AdminNav />
        <div className="adm-side__foot">
          <a href="/" target="_blank" className="adm-side__link">
            Saytni ko&apos;rish ↗
          </a>
          <form action={logout}>
            <button className="adm-side__link">Chiqish</button>
          </form>
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  );
}
