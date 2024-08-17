"use client";
import { useConverStore, useLvlStore, useUserStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {};

const Convert = (props: Props) => {
  const userData = useUserStore((state) => state.userData);
  const getExpData = useLvlStore((state) => state.getExpData);
  const percent = useLvlStore((state) => state.percent);
  const convertData = useConverStore((state) => state.convertData);
  const getConvertData = useConverStore((state) => state.getConvertData);
  const updateConvertData = useConverStore((state) =>state.updateConvertData)
  const updateUserStats = useUserStore((state) => state.updateUserStats);


  useEffect(() => {
    if (userData?.userId) {
      if (percent === null) {
        getExpData(userData.userId);
      }
      if (!convertData) {
        getConvertData(userData.userId);
      }
    }
  }, [userData?.userId]);
  if(!convertData || !userData){
    return null;
  }

  const updateUsdHandler = async(type: 'usd-1' | 'usd-10')=>{
    if(type === 'usd-1'){
      const moneyCheck = await updateUserStats(0, 0, 1, "usd-");
      if (moneyCheck) {
        updateConvertData(userData.userId, 1, 'usd-1');
      } else{
        toast.error("Не достатньо доларів для обміну");
      }
    } else if(type === 'usd-10'){
      const moneyCheck = await updateUserStats(0, 0, 10, "usd-");
      if (moneyCheck) {
        updateConvertData(userData.userId, 10, 'usd-10');
      } else{
        toast.error("Не достатньо доларів для обміну");
      }
    }
    
  }

  const updateGoldHandler = async(type: 'gold', amount:number)=>{
    if(type === 'gold'){
      const moneyCheck = await updateUserStats(0, amount, 0, "gold-");
      if (moneyCheck) {
        updateConvertData(userData.userId, amount, 'gold');
      } else{
        toast.error("Не достатньо монет для обміну");
      }
    }
  }
  return (
    <div className="p-2 text-yellow-500">
      <div className="">
        <h2 className="font-bold text-md">Обміняти на монети</h2>
        <div className=" flex items-center gap-1">
          <Image
            src={`/images/icons/convert.png`}
            width={16}
            height={16}
            alt="user"
          />
          <button onClick={()=>updateUsdHandler('usd-1')}>Обміняти</button>
          <Image
            src={`/images/icons/usd.png`}
            width={16}
            height={16}
            alt="user"
          />
          <p>1 долар на </p>
          <Image
            src={`/images/icons/gold.png`}
            width={16}
            height={16}
            alt="user"
          />
          <p>2000 монет</p>
        </div>
        <div className=" flex items-center gap-1">
          <Image
            src={`/images/icons/convert.png`}
            width={16}
            height={16}
            alt="user"
          />
          <button onClick={()=>updateUsdHandler('usd-10')}>Обміняти</button>
          <Image
            src={`/images/icons/usd.png`}
            width={16}
            height={16}
            alt="user"
          />
          <p>10 долар на </p>
          <Image
            src={`/images/icons/gold.png`}
            width={16}
            height={16}
            alt="user"
          />
          <p>20000 монет</p>
        </div>
      </div>

      <div className="">
        <h2 className="font-bold text-md">Обміняти на долари</h2>
        {convertData.convertAvaliable - convertData.converted === 0 && (<p>Ви обміняли всі доступні долари на сьогодні <span className="text-yellow-600">{convertData.converted}/{convertData.convertAvaliable}</span> </p>)}
        {convertData.convertAvaliable - convertData.converted >0 && (<><div className=" flex items-center gap-1">
          <Image
            src={`/images/icons/convert.png`}
            width={16}
            height={16}
            alt="user"
          />
          <button onClick={()=>updateGoldHandler('gold', 1000)}>Обміняти</button>
          <Image
            src={`/images/icons/gold.png`}
            width={16}
            height={16}
            alt="user"
          />
          <p>1000 монет на </p>
          <Image
            src={`/images/icons/usd.png`}
            width={16}
            height={16}
            alt="user"
          />
          <p>1 долар</p>
        </div>
        <div className=" flex items-center gap-1">
          <Image
            src={`/images/icons/convert.png`}
            width={16}
            height={16}
            alt="user"
          />
          <button onClick={()=>updateGoldHandler('gold', (convertData.convertAvaliable - convertData.converted)*1000)}>Обміняти</button>
          <Image
            src={`/images/icons/gold.png`}
            width={16}
            height={16}
            alt="user"
          />
          <p>{convertData.convertAvaliable - convertData.converted}000 монет на </p>
          <Image
            src={`/images/icons/usd.png`}
            width={16}
            height={16}
            alt="user"
          />
          <p>{convertData.convertAvaliable - convertData.converted} доларів</p>
        </div>
        <p className="flex items-center gap-1">Ви обміняли <span className="text-yellow-600 flex items-center gap-1">{convertData.converted}/{convertData.convertAvaliable} <Image
            src={`/images/icons/usd.png`}
            width={16}
            height={16}
            alt="user"
          /> сьогодні</span> </p></>) }
        
      </div>
    </div>
  );
};

export default Convert;
