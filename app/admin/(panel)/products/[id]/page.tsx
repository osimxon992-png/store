import Link from "next/link";
import { notFound } from "next/navigation";
import { readStore } from "@/lib/store";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }, store] = await Promise.all([params, readStore()]);
  const product = store.products.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/products" className="adm-link">
            ← Mahsulotlar
          </Link>
          <h1 className="adm-h1">{product.title}</h1>
        </div>
      </header>
      <ProductForm product={product} />
    </>
  );
}
