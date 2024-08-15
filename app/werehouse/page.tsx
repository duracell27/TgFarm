"use client";
import { useLvlStore, useUserStore, useWerehouseStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { ObjectId } from "bson";

type Props = {};

const Werehouse = (props: Props) => {
  const userData = useUserStore((state) => state.userData);
  const getExpData = useLvlStore((state) => state.getExpData);
  const werehouse = useWerehouseStore((state) => state.werehouse);
  const getWerehouse = useWerehouseStore((state) => state.getWerehouse);
  const sellWerehouseItem = useWerehouseStore(
    (state) => state.sellWerehouseItem
  );
  const updateUserStats = useUserStore((state) => state.updateUserStats);
  const percent = useLvlStore((state) => state.percent);

  const sellItemHandler = async (
    werehouseId: ObjectId,
    userId: number,
    price: number
  ) => {
    const moneyCheck = await updateUserStats(0, price, 0, "gold+");
    if (moneyCheck) {
      sellWerehouseItem(werehouseId, userId);
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      if (percent === null) {
        getExpData(userData.userId);
      }
      if (!werehouse) {
        getWerehouse(userData?.userId);
      }
    }
  }, [userData?.userId]);

  if (!werehouse || !userData) {
    return null;
  }
  return (
    <div className="text-yellow-500 p-2">
      <h2 className="font-bold">Овочі</h2>
      {werehouse.length === 0 && <p>У вас немає овочів.</p>}
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
          <button
            onClick={() =>
              sellItemHandler(
                werehouseObj._id,
                userData?.userId,
                werehouseObj.seed.profit * werehouseObj.amount
              )
            }
          >
            Продати
          </button>
          <p className="flex gap-1 items-center">
            за{" "}
            <Image
              src={`/images/icons/gold.png`}
              width={16}
              height={16}
              alt="seedPic"
            />
            <span> {werehouseObj.seed.profit * werehouseObj.amount}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Werehouse;
