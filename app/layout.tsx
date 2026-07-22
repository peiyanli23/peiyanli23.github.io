import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://peiyanli23.github.io"),
  title: "Peiyan Li | Physics, Quantum Computing & Photography",
  description: "The bilingual portfolio of Peiyan Li — physics, superconducting quantum computing, research, and photography.",
  icons: {
    icon: "/images/lotus-avatar.jpg",
    shortcut: "/images/lotus-avatar.jpg",
  },
  openGraph: {
    title: "Peiyan Li | Physics, Quantum Computing & Photography",
    description: "The bilingual portfolio of Peiyan Li — physics, superconducting quantum computing, research, and photography.",
    type: "website",
    images: [{ url: "/og.png", width: 1733, height: 909, alt: "Peiyan Li — Physics, Quantum Computing, Photography" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peiyan Li | Physics, Quantum Computing & Photography",
    description: "The bilingual portfolio of Peiyan Li — physics, superconducting quantum computing, research, and photography.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
