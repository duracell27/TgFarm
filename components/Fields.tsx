"use client";
import { useFieldtStore, useUserStore } from "@/store/store";
import Image from "next/image";
import { ObjectId } from "bson";
import Link from "next/link";
import React, { useEffect } from "react";
import { formatTime, remainingTime } from "@/libs/workWithTime";

type Props = {};

const Fields = (props: Props) => {
  const userData = useUserStore((store) => store.userData);
  const fields = useFieldtStore((state) => state.fields);
  const getFields = useFieldtStore((state) => state.getFields);
  const updateField = useFieldtStore(state=>state.updateField)

  const handlePlantField = (fieldId: ObjectId, seedId: ObjectId, fieldUpdateType:'plant', soilId:ObjectId) =>{
    updateField(fieldId, seedId, fieldUpdateType, soilId)
  }

  const handleWaterField = (fieldId: ObjectId, seedId: ObjectId, fieldUpdateType:'water', soilId:ObjectId) =>{
    updateField(fieldId, seedId, fieldUpdateType, soilId)
  }

  const handleFertilizeField = (fieldId: ObjectId, seedId: ObjectId, fieldUpdateType:'fertilize', soilId:ObjectId) =>{
    updateField(fieldId, seedId, fieldUpdateType, soilId)
  }

  const handleHarvestField = (fieldId: ObjectId, seedId: ObjectId, fieldUpdateType:'harvest', soilId:ObjectId) =>{
    updateField(fieldId, seedId, fieldUpdateType, soilId)
  }

  const handleDigField = (fieldId: ObjectId, seedId: ObjectId, fieldUpdateType:'dig', soilId:ObjectId) =>{
    updateField(fieldId, seedId, fieldUpdateType, soilId)
  }

  useEffect(() => {
    if (userData?.userId) {
      getFields(userData.userId);
    }
  }, [userData?.userId]);

  if (!fields || !userData) {
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
              field.status === "waitForHarvest") && <p>{field.seed?.name} <span className="text-sm text-yellow-500/45">(Урожай через {field.timeToHarvest && remainingTime(field.timeToHarvest)})</span></p>}
            {/* встановлення опису заголовку відностно статусу кінець */}

              {/* посадити */}
              {field.status === 'waitForPlant' && userData.defaultSeed.name === "Пусто" && (<Link className="flex items-center gap-1" href={'/chooseDefaultSeed'}><Image src={'/images/icons/seed.png'} width={16} height={16} alt="seed"/>Посадити</Link>)}
              {field.status === 'waitForPlant' && userData.defaultSeed.name !== "Пусто" && (<button onClick={()=>handlePlantField(field._id, userData.defaultSeed._id, 'plant', userData.defaultSoil._id)} className="flex items-center gap-1"><Image src={'/images/icons/seed.png'} width={16} height={16} alt="seed"/> Посадити {userData?.defaultSeed?.name}</button>)}

              {/* полити  */}
              {field.status === 'waitForWater' && (<button onClick={()=>handleWaterField(field._id, userData.defaultSeed._id, 'water', userData.defaultSoil._id)} className="flex items-center gap-1"><Image src={'/images/icons/water.png'} width={16} height={16} alt="soil"/> Полити</button>)}

              {/* фертулізувати */}
              {field.status === 'waitForFertilize' && (<button onClick={()=>handleFertilizeField(field._id, userData.defaultSeed._id, 'fertilize', userData.defaultSoil._id)} className="flex items-center gap-1"><Image src={'/images/icons/soil.png'} width={16} height={16} alt="soil"/>Удобрити {userData.defaultSoil.name}</button>)}

              {/* зібрати урожай */}
              {field.status === 'waitForHarvest' && (<button onClick={()=>handleHarvestField(field._id, userData.defaultSeed._id, 'harvest', userData.defaultSoil._id)} className="flex items-center gap-1"><Image src={'/images/icons/harvest.png'} width={16} height={16} alt="harvest"/>Зібрати урожай</button>)}

              {/* зібрати урожай */}
              {field.status === 'waitForDig' && (<button onClick={()=>handleDigField(field._id, userData.defaultSeed._id, 'dig', userData.defaultSoil._id)} className="flex items-center gap-1"><Image src={'/images/icons/dig.png'} width={16} height={16} alt="dig"/>Скопати</button>)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fields;
