import "./globals.css";
import type { Metadata } from "next";

import NavBar from "@/components/NavBar";
import AuthProvider from "@/lib/AuthProvider";


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
            <body >
                <AuthProvider>
                    <NavBar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
