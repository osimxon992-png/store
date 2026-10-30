import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin forms upload photos through server actions.
    serverActions: { bodySizeLimit: "40mb" },
  },
  async headers() {
    return [
      {
        // Browsers must always re-check the service worker so updates reach installed apps.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default nextConfig;
