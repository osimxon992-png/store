"use client";

import { useEffect, useState } from "react";
import ScrollLink from "./ScrollLink";
import { useLenis } from "./SmoothScroll";
import { NAV } from "@/lib/data";
import { contactLinks, type Contact } from "@/lib/types";

export default function Header({ contact }: { contact: Contact }) {
  const { phoneHref } = contactLinks(contact);
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ scroll, direction }: { scroll: number; direction: number }) => {
      setScrolled(scroll > 40);
      setHidden(scroll > 400 && direction === 1);
    };
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`header${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}${open ? " menu-open" : ""}`}
      >
        <ScrollLink href="#top" className="logo" onClick={close}>
          one<b>23</b>
        </ScrollLink>
        <nav className="nav" aria-label="Asosiy menyu">
          {NAV.map((item) => (
            <ScrollLink key={item.href} href={item.href}>
              {item.label}
            </ScrollLink>
          ))}
        </nav>
        <a href={phoneHref} className="btn btn--small header__tel">
          {contact.phone.replace(/^\+998\s*/, "")}
        </a>
        <button
          className="burger"
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {NAV.map((item) => (
          <ScrollLink key={item.href} href={item.href} onClick={close} tabIndex={open ? 0 : -1}>
            {item.label}
          </ScrollLink>
        ))}
        <a href={phoneHref} className="mobile-menu__tel" tabIndex={open ? 0 : -1}>
          {contact.phone}
        </a>
      </div>
    </>
  );
}
