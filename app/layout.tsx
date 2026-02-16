import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

const LeagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Beanywood",
    default: "Home | Beanywood",
  },
  description: "Beanywood shop management system",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${LeagueSpartan.variable} antialiased`}>{children}</body>
    </html>
  );
}
