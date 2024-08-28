'use client'
import { useAchivesStore, useUserStore } from '@/store/store'
import Image from 'next/image';
import React, { useEffect } from 'react'
import {achiveLvls} from '../../libs/constants'

const getReachLvl =(lvl:number)=>{
    switch(lvl){
        case 1: return (<><Image src={'/images/icons/achievement_bronze.png'} width={16} height={16} alt='achive'/><span>Бронзовий </span></>);
        case 2: return (<><Image src={'/images/icons/achievement_silver.png'} width={16} height={16} alt='achive'/><span>Срібний</span></>);
        case 3: return (<><Image src={'/images/icons/achievement_gold.png'} width={16} height={16} alt='achive'/><span>Золотий</span></>);
        case 4: return (<><Image src={'/images/icons/achievement_platina.png'} width={16} height={16} alt='achive'/><span>Платиновий</span></>);
        case 5: return (<><Image src={'/images/icons/achievement_briliant.png'} width={16} height={16} alt='achive'/><span>Діамантовий</span></>);
        default: return '';
    }
}


export default function Achives() {
    const userData = useUserStore(state=> state.userData)
    const achives = useAchivesStore(store=>store.achives)
    const getAchives = useAchivesStore((state) => state.getAchives);

    useEffect(()=>{
        if(userData?.userId){
          
          getAchives(userData.userId);
        }
      },[userData?.userId])

    if(!achives){
        return null
    }
  return (
    <div className='text-yellow-500 p-2'>
        <div className="border border-green-500 p-2 rounded-md flex items-center gap-2">Всього досягнень <Image src={'/images/icons/achievement_gold.png'} width={16} height={16} alt='achive'/><span className='text-green-500'>{achives.achiveCount}</span></div>
        <div className="">
            <div className="flex items-center gap-2">{achives.sadovid.lvl>0 && (<span className='flex items-center gap-2'>{getReachLvl(achives.sadovid.lvl)}</span>)} Садівник ({achives.sadovid.lvl})</div>
            <div className="text-sm">Зібрано урожаїв: <span className='text-md text-green-500'>{achives.sadovid.count}/{achiveLvls.sadovid[achives.sadovid.lvl+1]}</span></div>
        </div>
        <hr className='border-yellow-200/30 my-2' />

        <div className="">
            <div className="flex items-center gap-2">{achives.vodoliy.lvl>0 && (<span className='flex items-center gap-2'>{getReachLvl(achives.vodoliy.lvl)}</span>)} Водолій ({achives.vodoliy.lvl})</div>
            <div className="text-sm">Полито грядок: <span className='text-md text-green-500'>{achives.vodoliy.count}/{achiveLvls.vodoliy[achives.vodoliy.lvl+1]}</span></div>
        </div>
        <hr className='border-yellow-200/30 my-2' />

        <div className="">
            <div className="flex items-center gap-2">{achives.agronom.lvl>0 && (<span className='flex items-center gap-2'>{getReachLvl(achives.agronom.lvl)}</span>)} Агроном ({achives.agronom.lvl})</div>
            <div className="text-sm">Удобрено грядок: <span className='text-md text-green-500'>{achives.agronom.count}/{achiveLvls.agronom[achives.agronom.lvl+1]}</span></div>
        </div>
        <hr className='border-yellow-200/30 my-2' />

        <div className="">
            <div className="flex items-center gap-2">{achives.mehanizator.lvl>0 && (<span className='flex items-center gap-2'>{getReachLvl(achives.mehanizator.lvl)}</span>)} Механізатор ({achives.mehanizator.lvl})</div>
            <div className="text-sm">Рівнів техніки: <span className='text-md text-green-500'>{achives.mehanizator.count}/{achiveLvls.mehanizator[achives.mehanizator.lvl+1]}</span></div>
        </div>
        <hr className='border-yellow-200/30 my-2' />

        <div className="">
            <div className="flex items-center gap-2">{achives.zemlevlasnyk.lvl>0 && (<span className='flex items-center gap-2'>{getReachLvl(achives.zemlevlasnyk.lvl)}</span>)} Землевласник ({achives.zemlevlasnyk.lvl})</div>
            <div className="text-sm">Грядок куплено: <span className='text-md text-green-500'>{achives.zemlevlasnyk.count}/{achiveLvls.zemlevlasnyk[achives.zemlevlasnyk.lvl+1]}</span></div>
        </div>
        <hr className='border-yellow-200/30 my-2' />
    </div>
  )
}