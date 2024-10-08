import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProgressBar from "./ProgressBar";

type HederProps = {
  name: string | undefined;
  gold: number | undefined;
  usd: number | undefined;
  lvl: number | undefined;
  percent: number | null;
};

export const Header: React.FC<HederProps> = ({ name, gold, usd, lvl, percent }) => {
  if (
    name === undefined ||
    gold === undefined ||
    usd === undefined ||
    lvl === undefined ||
    percent === null
  ) {
    return null;
  }
  return (
    <Link href={"/"} className="">
      <div className="text-yellow-500 text-[8px]">beta ver. 0.004</div>
      <ProgressBar progress={percent} />
      <div className="flex justify-between items-center text-yellow-500 p-2 pb-0">
        <div className="flex-shrink overflow-hidden max-w-full">
          <p className="truncate font-bold">@{name}</p>
        </div>
        <div className="flex ml-2 gap-2 items-center flex-shrink-0">
          <div className="flex gap-1 items-center">
            <Image
              src={"/images/icons/gold.png"}
              className="block"
              width={16}
              height={16}
              alt="gold"
            />{" "}
            <p className="block">{gold}</p>
          </div>
          <div className="flex gap-1 items-center">
            <Image
              src={"/images/icons/usd.png"}
              className="block"
              width={16}
              height={16}
              alt="usd"
            />
            <p className="block">{usd}</p>
          </div>
          <div className="flex gap-1 items-center">
            <Image
              src={
                lvl < 30
                  ? "/images/icons/user1lvl.png"
                  : "/images/icons/user30lvl.png"
              }
              width={16}
              height={16}
              className=" block"
              alt="gold"
            />{" "}
            <p className="block">{lvl}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
