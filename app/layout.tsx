import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MainNav from "./_navbar/MainNav";
import logo from "../public/images/logo.png";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CoH Hardcore",
  description:
    "The hub to manage your hardcore characters and track their progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {/* Background Image */}
        <div
          className="fixed inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: `url(${logo.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
        {/* Navigation and Content */}
        <MainNav />
        {children}
      </body>
    </html>
  );
}
