'use client'
import { useLvlStore, useUserStore } from '@/store/store';
import React, { useEffect } from 'react'

type Props = {}

const Convert = (props: Props) => {
    const userData = useUserStore((state) => state.userData);
    const getExpData = useLvlStore((state) => state.getExpData);
    const percent = useLvlStore((state) => state.percent);

    useEffect(() => {
        if (userData?.userId) {
            if(percent === null){
                getExpData(userData.userId);
            }
        }
      }, [userData?.userId]);
  return (
    <div>Convert</div>
  )
}

export default Convert