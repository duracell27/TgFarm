import { useUserStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const DefaultSeedAndSoil = (props: Props) => {
  const userData = useUserStore((state) => state.userData);
  return (
    <div className="text-yellow-500">
      {(userData?.defaultSeed && userData.defaultSeed.name !== 'Пусто') ? (
        <div className="flex items-center gap-2">
          <Image
            src={"/images/icons/seed.png"}
            width={16}
            height={16}
            alt="seed"
          /> <Link href={'/chooseDefaultSeed'}> <span>Змінити рослину: </span> <span>{userData.defaultSeed.name}</span></Link>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Image
            src={"/images/icons/seed.png"}
            width={16}
            height={16}
            alt="seed"
          /> <Link href={'/chooseDefaultSeed'}> <span>Вибрати рослину </span></Link>
        </div>
      )}

      {(userData?.defaultSoil && userData.defaultSoil.name !== 'Пусто') ? (
        <div className="flex items-center gap-2">
          <Image
            src={"/images/icons/soil.png"}
            width={16}
            height={16}
            alt="soil"
          />  <Link href={'/chooseDefaultSoil'}> <span>Змінити добриво: </span> <span>{userData.defaultSoil.name}</span></Link>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Image
            src={"/images/icons/soil.png"}
            width={16}
            height={16}
            alt="soil"
          /> <Link href={'/chooseDefaultSoil'}>  <span>Вибрати добриво </span></Link>
        </div>
      )}
    </div>
  );
};

export default DefaultSeedAndSoil;
