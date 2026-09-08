import type { Metadata } from "next";
import localFont from "next/font/local";
import ClickEffect from "@/src/components/ClickEffect";
import "./globals.css";
import "@/src/styles/interactions.css";
import "@/src/styles/click-effect.css";
import "@/src/styles/letter-swap.css";

const aliMedium = localFont({
  src: "../public/fonts/AlibabaPuHuiTi-Medium.ttf",
  variable: "--font-ali-medium",
  weight: "500",
  display: "swap",
});

const aliSemiBold = localFont({
  src: "../public/fonts/AlibabaPuHuiTi-SemiBold.ttf",
  variable: "--font-ali-semibold",
  weight: "600",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ellie — UI/UX Designer",
  description:
    "Independent UI/UX designer focused on digital products, interaction design and visual experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${aliMedium.variable} ${aliSemiBold.variable}`}>
      <body>
        {children}
        <ClickEffect />
      </body>
    </html>
  );
}
