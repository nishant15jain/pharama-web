import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dermagreat Pharma | Speciality Dermatology",
  description: "An innovative driven speciality Dermatology company in India offering high quality products in medical dermatology for skin as well hair care.",
  keywords: ["dermatology", "skincare", "haircare", "pharmaceutical", "dermagreat", "india"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
