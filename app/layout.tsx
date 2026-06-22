import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://federico-landozzi-live-cv.vercel.app"),
  title: "Federico Landozzi | Portfolio & CV",
  description:
    "Project Manager focused on digital transformation, process modernization, governance and AI-assisted delivery.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Federico Landozzi | Portfolio & CV",
    description:
      "Project Manager focused on digital transformation, process modernization, governance and AI-assisted delivery.",
    type: "website",
    images: [{ url: "/images/avatar.png", width: 512, height: 512 }]
  }
};

const themeScript = `
  (function () {
    try {
      var saved = localStorage.getItem('fl-theme');
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
