import { ThemeProvider } from "@/components/shared/theme-provider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const space_Grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "NowTalk",
   description: "A  chat app for the modern web",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={space_Grotesk.className}>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               <main className="relative">{children}</main>
               <Toaster position="top-center" />
            </ThemeProvider>
         </body>
      </html>
   );
}
