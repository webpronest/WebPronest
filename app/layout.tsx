import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "./providers/AuthProvider";

export const metadata: Metadata = {
  title: "WebProNest | Live Web Development Classes in India",
  description:
    "Join WebProNest and learn HTML, CSS, JavaScript, React & GSAP through interactive LIVE online classes.",
  keywords: [
    "WebProNest",
    "Live Web Classes",
    "Learn Web Development",
    "HTML CSS JS",
    "Frontend Bootcamp",
    "GSAP Animation",
  ],
  openGraph: {
    title: "WebProNest | Live Web Classes in India",
    description:
      "Join WebProNest to learn modern web technologies through LIVE classes and projects.",
    url: "https://webpronest.vercel.app",
    siteName: "WebProNest",
  },
};

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 container mx-auto p-6">{children}</main>
          <Footer />
          <script src="https://accounts.google.com/gsi/client" async defer></script>
        </AuthProvider>
      </body>
    </html>
  );
}
