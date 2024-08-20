import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Profile = (props: Props) => {
  return (
    <div className='text-yellow-500 p-2'>
<Link className='flex gap-1 items-center' href={'/achives'}><Image src={'/images/icons/ratingAchives.png'} width={16} height={16} alt='plants' /><span>Досягнення</span></Link>
    </div>
  )
}

export default Profile