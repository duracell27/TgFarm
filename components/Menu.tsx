import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Menu = (props: Props) => {
  return (
    <div className='text-yellow-500 p-2'>
        <ul>
          <li ><Link className='flex gap-1 items-center' href={'/'}><Image src={'/images/icons/plants.png'} width={16} height={16} alt='plants' /><span>Грядки</span></Link></li>
          <li ><Link className='flex gap-1 items-center' href={'/werehouse'}><Image src={'/images/icons/warehouse.png'} width={16} height={16} alt='plants' /><span>Амбар</span></Link></li>
          <li ><Link className='flex gap-1 items-center' href={'/rating'}><Image src={'/images/icons/rating.png'} width={16} height={16} alt='plants' /><span>Рейтинг</span></Link></li>
        </ul>
    </div>
  )
}

export default Menu