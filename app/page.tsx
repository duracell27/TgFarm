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
      console.log('WebApp', WebApp);
    }
  }, []);

  const getUserProfilePicture = (userId: number) => {
    return `https://t.me/i/userpic/320/${userId}.jpg`;
  };

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
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Profile Picture</h2>
            <img
              src={getUserProfilePicture(userData.id)}
              alt="User Profile"
              className="mt-2 w-32 h-32 rounded-full"
            />
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </main>
  );
}
