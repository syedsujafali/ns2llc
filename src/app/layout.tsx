import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NS2LLC Roadside Assistance | 24/7 Mobile Services",
  description:
    "Professional mobile tire service and 24/7 emergency roadside assistance serving the District of Columbia (DC), Maryland (MD), and Northern Virginia (NVA). We come to you. Call 410-417-8155.",
  keywords: [
    "mobile tire service",
    "roadside assistance",
    "flat tire repair",
    "battery jump start",
    "lockout service",
    "Maryland",
    "DC",
    "Northern Virginia",
  ],
  openGraph: {
    title: "NS2LLC Roadside Assistance | We Come To You",
    description:
      "24/7 roadside assistance and mobile tire services across DC, Maryland, and Northern Virginia.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-ivory text-ink antialiased">{children}</body>
    </html>
  );
}
