import { ThemeProvider } from "@/components/shared/theme-provider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const space_Grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "NowTalk",
   description: "A chat app for the modern web",
   openGraph: {
      title: "NowTalk - Chat Application",
      description: "NowTalk is a chat application for the modern web.",
      url: "https://nowtalk.example.com",
      siteName: "NowTalk",
      images: [
         {
            url: "/images/nowtalk.png",
            width: 800,
            height: 600,
            alt: "NowTalk Preview Image",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "NowTalk - Chat Application",
      description: "NowTalk is a chat application for the modern web.",
      images: ["/images/nowtalk.png"],
   },
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
               <main className="relative">
                  {children}
                  <Analytics />
               </main>
               <Toaster position="top-center" />
            </ThemeProvider>
         </body>
      </html>
   );
}
