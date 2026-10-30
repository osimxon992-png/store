// Confirmation banner shown after a save redirects back with ?saved=1.
export default function Saved({ show }: { show: boolean }) {
  if (!show) return null;
  return <p className="adm-saved">✓ Saqlandi — saytda yangilandi</p>;
}
