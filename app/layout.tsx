import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineType — Find What Your Brain Wants to Watch",
  description:
    "Take the Watch Personality test. Discover movies and shows that actually match who you are as a viewer.",
  openGraph: {
    title: "CineType — Find What Your Brain Wants to Watch",
    description:
      "Stop scrolling. Let your Watch DNA choose. Personality-driven movie & TV recommendations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
