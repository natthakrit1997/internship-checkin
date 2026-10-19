
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ระบบเช็กชื่อเข้า–ออกฝึกงาน",
  description:
    "ระบบบันทึกเวลาเข้า–ออกฝึกงานของนักเรียน นักศึกษา",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}