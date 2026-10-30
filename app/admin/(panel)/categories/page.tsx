import { readStore } from "@/lib/store";
import { deleteCategory, moveCategory } from "../../actions";
import CategoryForm from "@/components/admin/CategoryForm";
import ConfirmButton from "@/components/admin/ConfirmButton";
import MoveButtons from "@/components/admin/MoveButtons";
import Saved from "@/components/admin/Saved";

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [{ categories }, { saved }] = await Promise.all([readStore(), searchParams]);

  return (
    <>
      <header className="adm-head">
        <div>
          <h1 className="adm-h1">Kategoriyalar</h1>
          <p className="adm-muted">Saytdagi gorizontal &quot;Kolleksiya&quot; bo&apos;limi.</p>
        </div>
      </header>
      <Saved show={saved === "1"} />

      <div className="adm-cats">
        {categories.map((c, i) => (
          <div key={c.id} className="adm-card">
            <CategoryForm category={c} />
            <div className="adm-cat__tools">
              <MoveButtons
                id={c.id}
                action={moveCategory}
                canUp={i > 0}
                canDown={i < categories.length - 1}
                labels={["Chapga", "O'ngga"]}
                arrows={["←", "→"]}
              />
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={c.id} />
                <ConfirmButton message={`"${c.title}" o'chirilsinmi?`}>O&apos;chirish</ConfirmButton>
              </form>
            </div>
          </div>
        ))}
        <div className="adm-card adm-card--new">
          <h2 className="adm-h2">Yangi kategoriya</h2>
          <CategoryForm />
        </div>
      </div>
    </>
  );
}
