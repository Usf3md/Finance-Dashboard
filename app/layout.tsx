import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providors from "./providors";
import AuthenticationLayout from "./components/AuthenticationLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providors>
        <body className={inter.className}>
          <AuthenticationLayout>{children}</AuthenticationLayout>
        </body>
      </Providors>
    </html>
  );
}
