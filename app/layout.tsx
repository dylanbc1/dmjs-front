import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Provider } from "react-redux";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme"; 
import { ToastProvider } from "@/components/cart/toast-provider";
import { Exo_2 } from "next/font/google";
import { ModalProvider } from "@/components/productDetail/modal-provider";

const exo_2 = Exo_2({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo-no-slogan.png" />
      </head>
      <body className={exo_2.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastProvider />
          <ModalProvider />
          <div className="min-h-[90vh]">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
