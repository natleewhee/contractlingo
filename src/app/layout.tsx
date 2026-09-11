import type { Metadata, Viewport } from "next";
import { Public_Sans, PT_Serif, Special_Elite } from "next/font/google";
import { InstallPrompt } from "@/components/InstallPrompt";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import "./globals.css";

// Three fonts, one role each - see DESIGN.md. Special Elite only ships a
// single static weight; bold is browser-synthesized where used, which is
// fine for its short, all-caps use (stamps, entry metadata).
const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: "400",
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ContractLingo",
  description: "5 minutes a day to think like a contracts manager.",
};

export const viewport: Viewport = {
  themeColor: "#d9a62e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${specialElite.variable} ${ptSerif.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ServiceWorkerRegister />
        <InstallPrompt />
      </body>
    </html>
  );
}
