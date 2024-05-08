import type { Metadata } from "next";
import { Inter } from "next/font/google";

import FollowBar from "@/components/atoms/FollowBar";
import ModalLogin from "@/components/molecules/ModalLogin";
import Sidebar from "@/components/organisms/Sidebar";

import ModalRegister from "@/components/molecules/ModalRegister";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Suspense } from "react";
import "./globals.css";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ReactQueryProvider>
          <main className="h-screen bg-black">
            <div className="container h-full mx-auto lx:px-30 max-w-6xl">
              <div className="grid grid-cols-4 h-full">
                <Sidebar />

                <div
                  className="
                    col-span-3 
                    lg:col-span-2 
                    h-full 
                    border-x 
                    border-neutral-800
                  "
                >
                  {children}
                </div>

                <FollowBar />
              </div>
            </div>
          </main>

          <Suspense fallback={<div></div>}>
            <ModalLogin />
          </Suspense>

          <Suspense fallback={<div></div>}>
            <ModalRegister />
          </Suspense>
        </ReactQueryProvider>

        <ToastContainer />
      </body>
    </html>
  );
}
