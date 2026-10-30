"use client";

import { useRef } from "react";
import Image from "next/image";
import { isUpload, type Product } from "@/lib/types";
import { useReveal } from "@/lib/useReveal";

export default function Products({ products }: { products: Product[] }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section className="products" id="mahsulotlar" ref={root}>
      <div className="section-head">
        <p className="eyebrow">Obrazlar</p>
        <h2 className="h2 reveal">Kuz kolleksiyasi</h2>
      </div>
      <div className="grid">
        {products.map((p) => (
          <a className="card reveal" key={p.title} href={p.href} target="_blank" rel="noopener">
            <div className="card__img">
              <Image src={p.image} alt={p.title} fill unoptimized={isUpload(p.image)} sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw" />
              <Image
                className="card__hover"
                src={p.hover}
                unoptimized={isUpload(p.hover)}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
              />
              {p.tag && <span className="tag">{p.tag}</span>}
            </div>
            <div className="card__info">
              <h3>{p.title}</h3>
              <p>{p.note}</p>
            </div>
            <span className="card__link">Buyurtma berish ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
