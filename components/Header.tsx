import Image from "next/image";
import React from "react";

type HederProps = {
  name: string | undefined;
  gold: number | undefined;
  usd: number | undefined;
  lvl: number | undefined;
};

export const Header: React.FC<HederProps> = ({ name, gold, usd, lvl }) => {
  if (
    name === undefined ||
    gold === undefined ||
    usd === undefined ||
    lvl === undefined
  ) {
    return null;
  }
  return (
    <div className="flex justify-between items-center text-yellow-500">
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
  );
};
