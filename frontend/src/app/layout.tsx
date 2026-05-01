import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Campus Compare — Find & Compare Top Colleges in India",
  description:
    "Discover, compare and apply to 500+ top colleges across India. Get real data on fees, placements, rankings, courses and admissions — all in one place.",
  keywords: "colleges in India, college comparison, IIT, NIT, BITS, MBA, B.Tech, NEET, JEE, campus compare",
  openGraph: {
    title: "Campus Compare — Find & Compare Top Colleges in India",
    description: "Discover, compare and apply to 500+ top colleges across India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <Navbar />
        <div className="pt-20 flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
