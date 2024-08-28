"use client";

import { formatTime } from "@/libs/workWithTime";
import { useDefaultStore, useUserStore } from "@/store/store";
import { ObjectId } from "bson";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const ChooseDefaultSeed = (props: Props) => {
  const userData = useUserStore((state) => state.userData);
  const seeds = useDefaultStore((state) => state.seeds);
  const setDefaultSeed = useUserStore((state) => state.setDefaultSeed);

  const router = useRouter();

  const handleSetDefaultSeed = async (id: ObjectId) => {
   setDefaultSeed(id);
   router.push('/');
  };

  if (!seeds || !userData) {
    return null;
  }
  return (
    <div className="text-yellow-500 p-2 pt-0">
      {seeds.map((seed, index) => {
        if (seed.name === "Пусто") {
          return null;
        } else {
          return (
            <div
              key={index}
              onClick={() => handleSetDefaultSeed(seed._id)}
              className={
                (userData.lvl < seed.lvl ? "bg-slate-700 pointer-events-none" : "bg-slate-900 ") +
                " flex gap-2 py-1 my-2 rounded-md cursor-pointer"
              }
            >
              <div className="grow min-w-12 ml-1">
                <Image
                  src={`/images/seeds/${seed.imageUrl}`}
                  width={48}
                  height={48}
                  alt="soilIcon"
                />
              </div>
              <div className="">
                <p className="flex items-center gap-2 flex-wrap">
                  <span>
                    <strong>{seed.name} : </strong>
                  </span>
                  {userData.lvl < seed.lvl ? (
                    <span>Доступно з {seed.lvl} рівня</span>
                  ) : (
                    <span className="flex items-center gap-1">
                      Ціна:{" "}
                      <Image
                        src={"/images/icons/gold.png"}
                        width={16}
                        height={16}
                        alt="gold"
                      />{" "}
                      {seed.price }
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <p>
                    Час до сходу: {formatTime(seed.timeToHarvest)}, Час до
                    добрива: {formatTime(seed.timeToFertilize)}{" "}
                  </p>
                  <p className="flex items-center gap-1">
                    <span className="flex items-center gap-1">
                      Дохід:{" "}
                      <Image
                        src={"/images/icons/gold.png"}
                        width={16}
                        height={16}
                        alt="exp"
                      />
                      {seed.profit * seed.quantity}
                      {", "}
                    </span>
                    <span className="flex items-center gap-1">
                      Досвід:{" "}
                      <Image
                        src={"/images/icons/experience.png"}
                        width={16}
                        height={16}
                        alt="exp"
                      />
                      {seed.exp}
                      {", "}
                    </span>
                    <span className="flex items-center gap-1">
                      Урожай:{" "}
                      <Image
                        src={"/images/icons/seed.png"}
                        width={16}
                        height={16}
                        alt="exp"
                      />{" "}
                      {seed.quantity} шт.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ChooseDefaultSeed;
