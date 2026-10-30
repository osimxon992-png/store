import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/products" className="adm-link">
            ← Mahsulotlar
          </Link>
          <h1 className="adm-h1">Yangi mahsulot</h1>
        </div>
      </header>
      <ProductForm />
    </>
  );
}
