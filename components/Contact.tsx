"use client";

import { useRef } from "react";
import { contactLinks, type Contact as ContactInfo } from "@/lib/types";
import { useReveal } from "@/lib/useReveal";

export default function Contact({ contact }: { contact: ContactInfo }) {
  const links = contactLinks(contact);
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section className="contact" id="aloqa" ref={root}>
      <div className="contact__info">
        <p className="eyebrow">Aloqa</p>
        <h2 className="h2 reveal">
          Do&apos;konimizga
          <br />
          tashrif buyuring
        </h2>
        <ul className="contact__list">
          <li className="reveal">
            <span>Manzil</span>
            <p>{contact.address}</p>
          </li>
          <li className="reveal">
            <span>Ish vaqti</span>
            <p>{contact.hours}</p>
          </li>
          <li className="reveal">
            <span>Telefon</span>
            <p>
              <a href={links.phoneHref}>{contact.phone}</a>
            </p>
          </li>
          <li className="reveal">
            <span>Instagram</span>
            <p>
              <a href={links.instagramUrl} target="_blank" rel="noopener">
                {links.instagramHandle}
              </a>
            </p>
          </li>
        </ul>
        <div className="contact__actions reveal">
          <a href={links.phoneHref} className="btn">
            Qo&apos;ng&apos;iroq qilish <span className="arrow">→</span>
          </a>
          <a href={links.instagramUrl} target="_blank" rel="noopener" className="btn btn--ghost">
            Direct&apos;ga yozish ↗
          </a>
        </div>
      </div>
      <div className="contact__map reveal">
        <iframe
          title="one23 do'koni xaritada"
          src={links.mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
