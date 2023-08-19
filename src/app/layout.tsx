import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import NavBar from "@/components/NavBar";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/lib/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NextJS Blog ",
    description: "A blog made using nextjs",
    icons: "/favicon.ico",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <NavBar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
