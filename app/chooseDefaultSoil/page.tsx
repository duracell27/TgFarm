"use client";
import { formatTime } from "@/libs/workWithTime";
import { useDefaultStore, useUserStore } from "@/store/store";
import { ObjectId } from "bson";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const ChooseDefaultSoil = (props: Props) => {
  const userData = useUserStore((state) => state.userData);
  const setDefaultSoil = useUserStore(state=>state.setDefaultSoil)
  const soils = useDefaultStore((state) => state.soils);

  const router = useRouter();

  const handleSetDefaultSeed = async (id: ObjectId) => {
    setDefaultSoil(id);
   router.push('/');
  };

  if (!soils || !userData) {
    return null;
  }

  return (
    <div className="text-yellow-500 p-2 pt-0">
      {soils.map((soil, index) => {
        if(soil.name === 'Пусто'){
          return null;
        }else{
          return (
            <div
          key={index}
          
          onClick={()=>handleSetDefaultSeed(soil._id)}
          className={
            (userData.lvl < soil.lvl ? "bg-slate-700 pointer-events-none" : "bg-slate-900 ") +
            " flex gap-2 py-1 my-2 rounded-md cursor-pointer"
          }
        >
          <div className="">
            <Image
              src={`/images/soils/${soil.imageUrl}`}
              width={48}
              height={48}
              alt="soilIcon"
            />
          </div>
          <div className="">
            <p className="flex items-center gap-2 flex-wrap">
              <span>
                <strong>{soil.name} : </strong>
              </span>
              {userData.lvl < soil.lvl ? (
                <span>Доступно з {soil.lvl} рівня</span>
              ) : (
                <span className="flex items-center gap-1">
                  Ціна:{" "}
                  {soil.priceType === "gold" ? (
                    <Image
                      src={"/images/icons/gold.png"}
                      width={16}
                      height={16}
                      alt="gold"
                    />
                  ) : (
                    <Image
                      src={"/images/icons/usd.png"}
                      width={16}
                      height={16}
                      alt="usd"
                    />
                  )}{" "}
                  {soil.price}
                </span>
              )}
            </p>
            <p className="flex items-center gap-2 flex-wrap text-sm">
              <span>Пришвидшує ріст на: {formatTime(soil.reduceTime)}</span>
              <span className="flex items-center gap-1">
                Досвід:{" "}
                <Image
                  src={"/images/icons/experience.png"}
                  width={16}
                  height={16}
                  alt="exp"
                />{" "}
                {soil.exp}
              </span>
            </p>
          </div>
        </div>
          )
        }
        
})}
      <div className="text-sm">
        <p className="">
          <Image 
          className="inline"
            src={`/images/icons/advice.png`}
            width={16}
            height={16}
            alt="advice"
          />{" "}
          <span>
            Використання гідропоніки може підвищити ефективність добрив та
            кількість отриманого досвіду в декілька разів.
          </span>
        </p>
        <p className="">
          <Image 
          className="inline"
            src={`/images/icons/advice.png`}
            width={16}
            height={16}
            alt="advice"
          />{" "}
          <span>
            Якщо ви використовуєте добриво Компост з гідропонікою 300%, то час
            зростання врожаю буде скорочено не на 2 години, а на 8 годин! А
            також ви отримаєте 8 досвіду замість 2.
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default ChooseDefaultSoil;
