import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import Providers from "@/lib/providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className="relative flex flex-col min-h-screen mx-auto w-full overflow-x-hidden">
          <Providers>{children}</Providers>
        </main>
        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}
