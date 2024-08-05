"use client";
import WebApp from "@twa-dev/sdk";
import { useState, useEffect } from "react";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    } else {
      //faked user
      setUserData({
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
    <main className="p-4">
      {userData ? (
        <>
          <h1 className="text-2xl font-bold mb-4">User Data</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name || "N/A"}</li>
            <li>Username: {userData.username || "N/A"}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Premium Status: {userData.is_premium ? "Yes" : "No"}</li>
          </ul>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </main>
  );
}
