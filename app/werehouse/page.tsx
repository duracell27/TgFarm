"use client";
import { useLvlStore, useUserStore, useWerehouseStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

const Werehouse = (props: Props) => {
  const userData = useUserStore((state) => state.userData);
  const getExpData = useLvlStore((state) => state.getExpData);
  const werehouse = useWerehouseStore((state) => state.werehouse);
  const getWerehouse = useWerehouseStore((state) => state.getWerehouse);

  useEffect(() => {
    if (userData?.userId) {
      getExpData(userData.userId);
      if (!werehouse) {
        getWerehouse(userData?.userId);
      }
    }
  }, [userData?.userId]);

  if (!werehouse) {
    return null;
  }
  return (
    <div className="text-yellow-500 p-2">
      <h2>Овочі</h2>
      {werehouse.map((werehouseObj, index) => (
        <div className="flex gap-1 items-center" key={index}>
          <Image
            src={`/images/seeds/${werehouseObj.seed.imageUrl}`}
            width={16}
            height={16}
            alt="seedPic"
          />
          <p>
            {werehouseObj.seed.name} <span>({werehouseObj.amount} шт.)</span>
          </p>
          <button>Продати</button>
          <p className="flex gap-1 items-center">
            за <Image
            src={`/images/icons/gold.png`}
            width={16}
            height={16}
            alt="seedPic"
          /><span> {werehouseObj.seed.profit * werehouseObj.amount}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Werehouse;
