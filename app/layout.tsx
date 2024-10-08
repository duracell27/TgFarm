"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Header } from "@/components/Header";
import { useLvlStore, useUserStore } from "@/store/store";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Menu from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Telegram mini app",
//   description: "Simple clicker in Telegram with Next Js",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = useUserStore((state) => state.userData);
  const getUserData = useUserStore((state) => state.getUserData);
  const percent = useLvlStore(state=> state.percent)

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      getUserData(WebApp.initDataUnsafe.user);

      // setUserData(WebApp.initDataUnsafe.user as UserData);
    } else {
      getUserData({
        id: 46412059,
        first_name: "Володимир",
        last_name: "Шмідт",
        username: "volodymyr_shmidt",
        language_code: "en",
        is_premium: false,
      });
      //faked user
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className + " bg-black"}>
        <Toaster />
        <Header
          name={userData?.userName || userData?.firstName}
          gold={userData?.gold}
          usd={userData?.usd}
          lvl={userData?.lvl}
          percent={percent}
        />
        {children}
        <Menu/>
      </body>
    </html>
  );
}
