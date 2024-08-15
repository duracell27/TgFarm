"use client";
import { useFieldtStore, usePricesStore, useUserStore, useWerehouseStore } from "@/store/store";
import Image from "next/image";
import { ObjectId } from "bson";
import Link from "next/link";
import React, { useEffect } from "react";
import { formatTime, isTimePositive, remainingTime } from "@/libs/workWithTime";
import toast from "react-hot-toast";

type Props = {};

const Fields = (props: Props) => {
  const userData = useUserStore((store) => store.userData);
  const fields = useFieldtStore((state) => state.fields);
  const fieldPrices = usePricesStore((store) => store.fieldPrices);
  const getFields = useFieldtStore((state) => state.getFields);
  const updateField = useFieldtStore((state) => state.updateField);
  const updateUserStats = useUserStore((state) => state.updateUserStats);
  const buyField = useFieldtStore((state) => state.buyField);
  const updateWerehouse = useWerehouseStore(state => state.updateWerehouse)

  const handlePlantField = async (
    fieldId: ObjectId,
    seedId: ObjectId,
    fieldUpdateType: "plant",
    soilId: ObjectId,
    baseCost: number,
    baseExp: number
  ) => {
    const gold = baseCost;
    const exp = baseExp;
    const moneyCheck = await updateUserStats(exp, gold, 0, "gold-");
    if (!moneyCheck) {
      toast.error("");
    } else if (moneyCheck) {
      updateField(fieldId, seedId, fieldUpdateType, soilId);
    }
  };

  const handleWaterField = async (
    fieldId: ObjectId,
    seedId: ObjectId,
    fieldUpdateType: "water",
    soilId: ObjectId
  ) => {
    const baseExp = 5;
    const exp = baseExp;
    const moneyCheck = await updateUserStats(exp, 0, 0, "exp+");
    if (!moneyCheck) {
      toast.error("");
    } else if (moneyCheck) {
      updateField(fieldId, seedId, fieldUpdateType, soilId);
    }
  };

  const handleFertilizeField = async (
    fieldId: ObjectId,
    seedId: ObjectId,
    fieldUpdateType: "fertilize",
    soilId: ObjectId,
    baseCost: number,
    baseExp: number,
    moneyType: "gold" | "usd"
  ) => {
    const gold = baseCost;
    const exp = baseExp;
    let moneyCheck;
    if (moneyType === "gold") {
      moneyCheck = await updateUserStats(exp, gold, 0, "gold-");
    } else if (moneyType === "usd") {
      moneyCheck = await updateUserStats(exp, 0, baseCost, "usd-");
    }
    if (!moneyCheck) {
      toast.error("");
    } else if (moneyCheck) {
      updateField(fieldId, seedId, fieldUpdateType, soilId);
    }
  };

  const handleHarvestField = (
    fieldId: ObjectId,
    seedId: ObjectId,
    fieldUpdateType: "harvest",
    soilId: ObjectId,
    quantity: number
  ) => {
    updateField(fieldId, seedId, fieldUpdateType, soilId);
    if (userData?.userId){
      updateWerehouse(userData.userId, seedId, quantity)
    }
  };

  const handleDigField = async (
    fieldId: ObjectId,
    seedId: ObjectId,
    fieldUpdateType: "dig",
    soilId: ObjectId,
    userLvl: number
  ) => {
    const baseExp = 1;
    const exp = baseExp * userLvl;
    const moneyCheck = await updateUserStats(exp, 0, 0, "exp+");
    if (!moneyCheck) {
      toast.error("");
    } else if (moneyCheck) {
      updateField(fieldId, seedId, fieldUpdateType, soilId);
    }
  };

  const buyFieldHandler = async (
    userId: number,
    ordinal: number,
    price: number | null
  ) => {
    if (price === null) return toast.error("Помилка при покупці");
    const moneyCheck = await updateUserStats(0, 0, price, "usd-");
    if (!moneyCheck) {
      toast.error("Не достатньо коштів для покупки нового поля");
    } else if (moneyCheck) {
      buyField(userId, ordinal);
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      getFields(userData.userId);
    }
  }, [userData?.userId]);

  if (!fields || !userData || !fieldPrices) {
    return null;
  }
  const nextFieldPrice:number | null = fieldPrices.find((item) => item.ordinal === fields.length + 1)?.costUsd ?? null;

  return (
    <div className="text-yellow-500">
      {fields.map((field, index) => (
        <div key={index} className="flex my-2">
          <div className="min-w-14">
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
              field.status === "waitForHarvest") && (
              <p>
                {field.seed?.name}{" "}
                <span className="text-sm text-yellow-500/45">
                  {field.timeToHarvest &&
                    isTimePositive(remainingTime(field.timeToHarvest)) && (
                      <>Урожай через {remainingTime(field.timeToHarvest)}</>
                    )}
                </span>
              </p>
            )}
            {/* встановлення опису заголовку відностно статусу кінець */}

            {/* посадити */}
            {field.status === "waitForPlant" &&
              userData.defaultSeed.name === "Пусто" && (
                <Link
                  className="flex items-center gap-1"
                  href={"/chooseDefaultSeed"}
                >
                  <Image
                    src={"/images/icons/seed.png"}
                    width={16}
                    height={16}
                    alt="seed"
                  />
                  Посадити
                </Link>
              )}
            {field.status === "waitForPlant" &&
              userData.defaultSeed.name !== "Пусто" && (
                <button
                  onClick={() =>
                    handlePlantField(
                      field._id,
                      userData.defaultSeed._id,
                      "plant",
                      userData.defaultSoil._id,
                      userData.defaultSeed.price,
                      userData.defaultSeed.exp
                    )
                  }
                  className="flex items-center gap-1"
                >
                  <Image
                    src={"/images/icons/seed.png"}
                    width={16}
                    height={16}
                    alt="seed"
                  />{" "}
                  Посадити {userData?.defaultSeed?.name}
                </button>
              )}

            {/* полити  */}
            {/* {field.status === 'waitForWater' && !isTimePositive(remainingTime(field.timeToWater)) && } */}
            {field.status === "waitForWater" ? (
              isTimePositive(remainingTime(field.timeToWater)) ? (
                <p className="text-sm text-yellow-500/45">
                  Час до поливу {remainingTime(field.timeToWater)}
                </p>
              ) : (
                <button
                  onClick={() =>
                    handleWaterField(
                      field._id,
                      userData.defaultSeed._id,
                      "water",
                      userData.defaultSoil._id
                    )
                  }
                  className="flex items-center gap-1"
                >
                  <Image
                    src={"/images/icons/water.png"}
                    width={16}
                    height={16}
                    alt="soil"
                  />{" "}
                  Полити
                </button>
              )
            ) : (
              ""
            )}

            {/* фертулізувати */}
            {field.status === "waitForFertilize" ? (
              isTimePositive(remainingTime(field.timeToFertilize)) ? (
                <p className="text-sm text-yellow-500/45">
                  Час до добрива {remainingTime(field.timeToFertilize)}
                </p>
              ) : (
                <button
                  onClick={() =>
                    handleFertilizeField(
                      field._id,
                      userData.defaultSeed._id,
                      "fertilize",
                      userData.defaultSoil._id,
                      userData.defaultSoil.price,
                      userData.defaultSoil.exp,
                      userData.defaultSoil.priceType
                    )
                  }
                  className="flex items-center gap-1"
                >
                  <Image
                    src={"/images/icons/soil.png"}
                    width={16}
                    height={16}
                    alt="soil"
                  />
                  Удобрити {userData.defaultSoil.name}
                </button>
              )
            ) : (
              ""
            )}

            {/* зібрати урожай */}
            {field.status === "waitForHarvest" ? (
              isTimePositive(remainingTime(field.timeToHarvest)) ? (
                ""
              ) : (
                <button
                  onClick={() =>
                    handleHarvestField(
                      field._id,
                      field.seed._id,
                      "harvest",
                      userData.defaultSoil._id,
                      field.seed.quantity
                    )
                  }
                  className="flex items-center gap-1"
                >
                  <Image
                    src={"/images/icons/harvest.png"}
                    width={16}
                    height={16}
                    alt="harvest"
                  />
                  Зібрати урожай
                </button>
              )
            ) : (
              ""
            )}

            {/* зібрати урожай */}
            {field.status === "waitForDig" && (
              <button
                onClick={() =>
                  handleDigField(
                    field._id,
                    userData.defaultSeed._id,
                    "dig",
                    userData.defaultSoil._id,
                    userData.lvl
                  )
                }
                className="flex items-center gap-1"
              >
                <Image
                  src={"/images/icons/dig.png"}
                  width={16}
                  height={16}
                  alt="dig"
                />
                Скопати
              </button>
            )}
          </div>
        </div>
      ))}

      {/* заголовок */}
      <div className="flex  my-2">
        <div className="min-w-14">
          <Image
            src={`/images/fields/ground.jpg`}
            width={48}
            height={48}
            alt="ground"
          />
        </div>
        <div className="">
          <p>Нова земля</p>
          <p className="">
            <button className="flex items-center gap-1">
              <Image
                src={`/images/icons/cart.png`}
                width={16}
                height={16}
                alt="cart"
              />
              <button
              className="flex items-center gap-1"
                onClick={() =>
                  buyFieldHandler(
                    userData.userId,
                    fields.length + 1,
                    nextFieldPrice
                  )
                }
              >
                Купити за{" "}
                <Image
                  src={`/images/icons/usd.png`}
                  width={16}
                  height={16}
                  alt="cart"
                />
                {nextFieldPrice}{" "}
              </button>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fields;
