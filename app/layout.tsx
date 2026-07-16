import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { getCurrentUser, getSession } from "@/lib/dal";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { Toaster } from "sonner";

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
          <Toaster
            position="top-center"
            toastOptions={{
              unstyled: true,
              classNames: {
                toast: "card flex w-full items-center gap-3 p-4 shadow-lg",
                content: "flex-1",
                title: "text-sm font-medium text-gray-900",
                description: "mt-0.5 text-xs text-gray-500",
                icon: "flex shrink-0 items-center [&>svg]:size-5",
                success: "border-l-4 border-l-green-600 text-green-600",
                error: "border-l-4 border-l-red-600 text-red-600",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
