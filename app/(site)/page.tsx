import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Collection from "@/components/Collection";
import Products from "@/components/Products";
import Lookbook from "@/components/Lookbook";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { readStore } from "@/lib/store";
import { contactLinks } from "@/lib/types";

export default async function Home() {
  const store = await readStore();
  const links = contactLinks(store.contact);

  return (
    <>
      <Loader />
      <Cursor />
      <Header contact={store.contact} />
      <main id="top">
        <Hero images={store.hero} />
        <Marquee words={store.marquee} />
        <Manifesto text={store.about} />
        <Collection
          categories={store.categories}
          instagramUrl={links.instagramUrl}
          instagramHandle={links.instagramHandle}
        />
        <Products products={store.products.map((p) => ({ ...p, href: p.href || links.instagramUrl }))} />
        <Lookbook images={store.lookbook} />
        <Contact contact={store.contact} />
      </main>
      <Footer founderUrl={links.founderUrl} founderHandle={links.founderHandle} />
    </>
  );
}
