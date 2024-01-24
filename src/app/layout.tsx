import type {Metadata} from "next";
import React from "react";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from '../layouts/Header'
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
        {children}
        </body>
        </html>
    );
}
