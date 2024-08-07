"use client";
import { useFieldtStore, useUserStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

const Fields = (props: Props) => {
  const userData = useUserStore((store) => store.userData);
  const fields = useFieldtStore((state) => state.fields);
  const getFields = useFieldtStore((state) => state.getFields);

  useEffect(() => {
    if (userData?.userId) {
      getFields(userData.userId);
    }
  }, [userData?.userId]);

  if (!fields) {
    return null;
  }
  return (
    <div className="text-yellow-500">
      {fields.map((field, index) => (
        <div key={index} className="flex  my-2">
          <div className="min-w-14 pl-1">
            {/* встановлення картинки відностно статусу початок */}
            {field.status === "waitForPlant" && (
              <Image
                src={`/images/fields/ground.jpg`}
                width={48}
                height={48}
                alt="ground"
              />
            )}
            {field.status === "waitForDig" && (
              <Image
                src={`/images/fields/dirt.jpg`}
                width={48}
                height={48}
                alt="dirt"
              />
            )}
            {(field.status === "waitForWater" ||
              field.status === "waitForFertilize" ||
              field.status === "waitForHarvest") && (
              <Image
                src={`/images/seeds/${field.seed?.imageUrl}`}
                width={48}
                height={48}
                alt="dirt"
              />
            )}
            {/* встановлення картинки відностно статусу кінець */}
          </div>
          <div className="">
            {/* встановлення опису заголовку відностно статусу початок */}
            {field.status === "waitForPlant" && <p>Земля готова до посіву</p>}
            {field.status === "waitForDig" && <p>Не оброблена земля</p>}
            {(field.status === "waitForWater" ||
              field.status === "waitForFertilize" ||
              field.status === "waitForHarvest") && <p>{field.seed?.name}</p>}
            {/* встановлення опису заголовку відностно статусу кінець */}

            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fields;
