import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./utils/Provider/authcontext";
import Navbar from "./Components/Shared/Navbar/page";
import Footer from "./Components/Shared/Footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trip Nest",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en"  suppressHydrationWarning={true}>
      <body className={inter.className}>
       <div>
        <Navbar/>
       </div>
       <div>
       {children}
       </div>
       <div>
        <Footer/>
       </div>
        </body>
    </html>
    </AuthProvider>
  );
}
