import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Simple Memo",
  description: "シンプルなメモアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
