import SmoothScroll from "@/components/SmoothScroll";
import Pwa from "@/components/Pwa";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      {children}
      <Pwa />
    </SmoothScroll>
  );
}
