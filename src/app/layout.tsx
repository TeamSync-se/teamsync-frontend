import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: {
    default: "TeamSync",
    template: "%s | TeamSync",
  },
  description: "Hệ thống hỗ trợ làm việc nhóm trực tuyến",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-body-md">{children}</body>
    </html>
  );
}
