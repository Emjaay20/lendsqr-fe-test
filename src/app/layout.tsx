import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Lendsqr",
  description: "Lendsqr frontend test",
  icons: {
    icon: "/icons/Union.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
