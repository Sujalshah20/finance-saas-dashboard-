import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/shared/Sidebar";
import { Topbar } from "@/components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexora Dashboard",
  description: "Universal AI Architect built dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body suppressHydrationWarning className="h-full bg-[#F8FAFC] text-slate-900 overflow-hidden flex">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-8 pb-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
