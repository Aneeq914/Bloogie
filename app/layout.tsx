import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { getCurrentUser, getSession } from "@/lib/dal";
import { SessionProvider } from "@/components/auth/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bloogie",
  description: "Create, share, and explore blogs on Bloogie.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const session = await getSession();
  console.log("🚀 ~ RootLayout ~ session:", session)
  const isLoggedIn = !!session;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionProvider user={user}>
          <Navbar isLoggedIn={isLoggedIn} />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
