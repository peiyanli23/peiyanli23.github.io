import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive | Peiyan Li",
  description:
    "Selected projects, reports, course notes, and presentation materials from different stages of Peiyan Li's academic development.",
  alternates: {
    canonical: "/archive/",
  },
  openGraph: {
    title: "Archive | Peiyan Li",
    description:
      "Selected projects, reports, course notes, and presentation materials from different stages of Peiyan Li's academic development.",
    url: "/archive/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archive | Peiyan Li",
    description:
      "Selected projects, reports, course notes, and presentation materials from different stages of Peiyan Li's academic development.",
    images: ["/og.png"],
  },
};

export default function ArchiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
