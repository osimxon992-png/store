export type Contact = {
  phone: string;
  address: string;
  hours: string;
  instagram: string;
  telegram: string;
  founder: string;
  mapQuery: string;
};

export type Category = { id: string; title: string; image: string };

export type Product = {
  id: string;
  title: string;
  note: string;
  tag: string;
  image: string;
  hover: string;
  href: string;
};

export type Store = {
  contact: Contact;
  about: string;
  marquee: string[];
  hero: string[];
  categories: Category[];
  products: Product[];
  lookbook: string[];
};

// Links derived from the handles stored in the admin panel.
export function contactLinks(c: Contact) {
  return {
    phoneHref: `tel:+${c.phone.replace(/\D/g, "")}`,
    instagramUrl: `https://www.instagram.com/${c.instagram}/`,
    instagramHandle: `@${c.instagram}`,
    telegramUrl: `https://t.me/${c.telegram}`,
    founderUrl: `https://www.instagram.com/${c.founder}/`,
    founderHandle: `@${c.founder}`,
    mapSrc: `https://maps.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&z=15&output=embed`,
  };
}

// Uploaded files are served by a route handler, so they skip the image optimizer.
export const isUpload = (src: string) => src.startsWith("/uploads/");
