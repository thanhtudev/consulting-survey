import type {Metadata} from "next";
import React from "react";
import {Inter} from "next/font/google";
import "./globals.css";
import "../assets/css/font-awesome-4.7.0/css/font-awesome.min.css"
import Favicon from '../../public/favicon.ico'

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Consulting Survey",
    icons: [
        {
            rel: 'icon',
            url: Favicon.src
        }]
};

export default function RootLayout({ children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="frame">
        {children}
        </div>
        </body>
        </html>
    );
}
