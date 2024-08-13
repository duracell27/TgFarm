"use client";

import DefaultSeedAndSoil from "@/components/DefaultSeedAndSoil";
import Fields from "@/components/Fields";
import {
  useDefaultStore,
  useLvlStore,
  usePricesStore,
  useUserStore,
} from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  const userData = useUserStore(state=> state.userData)
  const getFieldPrices = usePricesStore((state) => state.getFieldPrices);
  const getSeeds = useDefaultStore((state) => state.getSeeds);
  const getSoils = useDefaultStore((state) => state.getSoils);
  const getExpData = useLvlStore((state) => state.getExpData);

  useEffect(() => {
    getFieldPrices();
    getSeeds();
    getSoils();
  }, []);

  useEffect(()=>{
    if(userData?.userId){
      getExpData(userData.userId);
    }
  },[userData?.userId])
  return (
    <main className="p-2">
      <Fields />
      <DefaultSeedAndSoil />
      <hr className="bg-yellow-500 h-[2px]" />
    </main>
  );
}
