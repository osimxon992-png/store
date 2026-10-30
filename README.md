# store — one23

one23 kiyim do'koni uchun sayt: smooth scroll animatsiyalari, admin panel va telefonga o'rnatiladigan PWA ilova.

Next.js 15, React 19, GSAP + Lenis.

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # ADMIN_PASSWORD va SESSION_SECRET ni o'zgartiring
npm run dev                  # http://localhost:3000
```

Production (PWA / service worker faqat shu rejimda ishlaydi):

```bash
npm run build
npm run start
```

## Tuzilishi

- `app/(site)` — sayt sahifasi, `components/` — sayt bo'limlari
- `app/admin` — admin panel (`/admin`): mahsulotlar, kategoriyalar, rasmlar, sozlamalar
- `data/store.json` — saytdagi barcha kontent (admin panel shu faylni tahrirlaydi)
- `data/uploads/` — admin orqali yuklangan rasmlar (git'ga kirmaydi)
- `public/sw.js`, `app/manifest.ts` — PWA

## Hosting

Admin panel fayllarga yozadi, shuning uchun doimiy diskli server (VPS) kerak. Ilovani o'rnatish va admin kirishi HTTPS talab qiladi.
