"use client";

import DefaultSeedAndSoil from "@/components/DefaultSeedAndSoil";
import Fields from "@/components/Fields";


export default function Home() {
  return (
    <main className="p-2">
      <Fields/>
      <DefaultSeedAndSoil/>
    </main>
  );
}
