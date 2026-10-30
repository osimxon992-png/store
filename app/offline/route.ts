import { readStore } from "@/lib/store";
import { contactLinks } from "@/lib/types";

// Self-contained page (no Next.js scripts or web fonts) that the service worker
// precaches and shows for any page that can't be loaded without a connection.
export async function GET() {
  const { contact } = await readStore();
  const escape = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

  const html = `<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0d0d0c">
<title>Internet yo'q — one23</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;
    padding:24px 16px;background:#0d0d0c;color:#f1ede6;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center}
  .logo{margin-bottom:24px;font-size:26px;letter-spacing:.2em}
  .logo b{color:#c49a6c;font-weight:inherit}
  h1{font-size:clamp(26px,6vw,40px);font-weight:700;letter-spacing:-.02em}
  p{max-width:380px;color:#8d887f;line-height:1.6}
  .tel{margin-bottom:16px;font-size:20px;color:#c49a6c;text-decoration:none}
  button{padding:16px 28px;border:0;border-radius:999px;background:#f1ede6;color:#121211;font:inherit;font-weight:600;cursor:pointer}
</style>
</head>
<body>
  <div class="logo">ONE<b>23</b></div>
  <h1>Internet aloqasi yo'q</h1>
  <p>Ulanishni tekshirib, qayta urinib ko'ring. Buyurtma uchun qo'ng'iroq qilishingiz mumkin:</p>
  <a class="tel" href="${escape(contactLinks(contact).phoneHref)}">${escape(contact.phone)}</a>
  <button onclick="location.reload()">Qayta urinish</button>
</body>
</html>`;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
