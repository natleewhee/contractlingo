import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ContractLingo",
    short_name: "ContractLingo",
    description: "5 minutes a day to think like a contracts manager.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ea",
    theme_color: "#ffc93c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
