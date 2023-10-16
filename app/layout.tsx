import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClientProvider } from "../state-managemnt/client";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <div className="bg-[#FFF] shadow-[0_3px_15px_-3px_rgba(34,34,34,0.10)] text-right  " >
        <h1 className="p-[14px]">
          تکمیل اطلاعات
        </h1>
      </div>
        <ClientProvider> {children} </ClientProvider>
      </body>
    </html>
  );
}
