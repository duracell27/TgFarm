"use client";
import { Header } from "@/components/Header";
import useUserStore from "@/store/store";
import WebApp from "@twa-dev/sdk";
import { useState, useEffect } from "react";

export default function Home() {
  const userData = useUserStore(state=>state.userData)
  const getUserData = useUserStore(state=>state.getUserData)

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      getUserData(WebApp.initDataUnsafe.user)

      // setUserData(WebApp.initDataUnsafe.user as UserData);
    } else {
      getUserData({
        id: 46412059,
        first_name: "Володимир",
        last_name: "Шмідт",
        username: "volodymyr_shmidt",
        language_code: "en",
        is_premium: false,
      })
      //faked user
    }
  }, []);

  return (
    <main className="p-2 h-screen">
      <Header name={userData?.userName || userData?.firstName} gold={userData?.gold} usd={userData?.usd} lvl={userData?.lvl} />
    </main>
  );
}
