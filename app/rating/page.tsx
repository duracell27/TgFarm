"use client";
import { useLvlStore, useRatingStore, useUserStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

const Rating = (props: Props) => {
  const userData = useUserStore((state) => state.userData);
  const getRatingList = useRatingStore((state) => state.getRatingList);
  const ratingList = useRatingStore((state) => state.ratingList);

  const getExpData = useLvlStore((state) => state.getExpData);
  const percent = useLvlStore((state) => state.percent);

  useEffect(() => {
    if (userData?.userId) {
      if (percent === null) {
        getExpData(userData.userId);
      }
    }
  }, [userData?.userId]);

  useEffect(() => {
    getRatingList();
  }, []);
  if (!ratingList) {
    return null;
  }
  return (
    <div className="text-yellow-500 p-2">
      {ratingList.map((user, index) => (
        <div className="flex items-center gap-1" key={index}>
          <span>{index + 1}.</span>
          <Image
            src={`/images/icons/user1lvl.png`}
            width={16}
            height={16}
            alt="user"
          />
          {userData?.userName === user.userName ||
          userData?.firstName === user.firstName ? (
            <>
              <span className="font-bold text-green-400">
                @{user.userName || user.firstName}
              </span>
              <span className="font-bold text-green-400">{user.lvl}</span>
            </>
          ) : (
            <>
              <span>@{user.userName || user.firstName}</span>
              <span>{user.lvl}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Rating;
