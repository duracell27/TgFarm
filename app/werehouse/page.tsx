'use client'
import { useLvlStore, useUserStore } from '@/store/store'
import React, { useEffect } from 'react'

type Props = {}

const Werehouse = (props: Props) => {
    const userData = useUserStore(state=> state.userData)
    const getExpData = useLvlStore((state) => state.getExpData);
    useEffect(()=>{
        if(userData?.userId){
          getExpData(userData.userId);
        }
      },[userData?.userId])
  return (
    <div className='text-yellow-500'>page</div>
  )
}

export default Werehouse