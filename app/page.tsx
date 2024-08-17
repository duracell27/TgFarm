"use client";

import DefaultSeedAndSoil from "@/components/DefaultSeedAndSoil";
import Fields from "@/components/Fields";
import {
  useConverStore,
  useDefaultStore,
  useLvlStore,
  usePricesStore,
  useUserStore,
  useWerehouseStore,
} from "@/store/store";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const userData = useUserStore(state=> state.userData)
  const getFieldPrices = usePricesStore((state) => state.getFieldPrices);
  const getSeeds = useDefaultStore((state) => state.getSeeds);
  const getSoils = useDefaultStore((state) => state.getSoils);
  const getExpData = useLvlStore((state) => state.getExpData);
  const getWerehouse = useWerehouseStore((state) => state.getWerehouse)
  const getConvertData = useConverStore((state) => state.getConvertData);

  useEffect(() => {
    getFieldPrices();
    getSeeds();
    getSoils();
  }, []);

  useEffect(()=>{
    if(userData?.userId){
      getExpData(userData.userId);
      getWerehouse(userData.userId);
      getConvertData(userData.userId);
    }
  },[userData?.userId])
  return (
    <main className="p-2">
      <Fields />
      <DefaultSeedAndSoil />
      <hr className="border-yellow-500 border my-1" />
    </main>
  );
}
