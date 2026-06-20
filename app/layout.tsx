import type { Metadata } from "next";
import { Funnel_Sans, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./system.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const funnel = Funnel_Sans({ subsets: ["latin"], variable: "--font-funnel", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "layout.page · Proven layouts for every section",
  description:
    "Start from a proven section, add your copy, then re-skin it with one token set. Built for Claude, Lovable, Webflow, and plain HTML.",
};

// pre-paint: apply saved theme before first paint to avoid a flash
const themeScript = `(function(){try{if(localStorage.getItem('lp-theme')==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${funnel.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <TopNav />
        <div className="mx-auto w-full max-w-[1440px]">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
