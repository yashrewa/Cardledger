import "./globals.css";
import type { Metadata } from "next";
import PwaRegister from "./pwa-register";

export const metadata: Metadata = {
  title: "CardLedger",
  description: "Credit card billing-cycle expense tracker",
  applicationName: "CardLedger",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "CardLedger",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
