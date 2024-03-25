import React from 'react'
import Review from './Review'
export default function Reviews() {
  const users=[
    {
      comment:'Spacious and charming house, conveniently located near the beach and the center of Staoueli.    ',
      user:'B. MenEschouaker',
      location:'Tiaret, Algeria',
      rate:'5',
      picture:'../../../public/bg4.jpg'

    },
    {
      comment:'Spacious and charming house, conveniently located near the beach and the center of Staoueli. ',
      user:'D. Mustapha',
      location:'Djelfa, Algeria',
      rate:'4.5',
      picture:'../../../public/bg4.jpg'
    },
    {
      comment:'Ahmed was exceptionally king, friendly, professional and very responsive. His place is breathtaking. ',
      user:'B. Ali',
      location:'Annaba, Algeria',
      rate:'4',
      picture:'../../../public/bg4.jpg'
    },

  ]
  return (
  <div className='container'>
    <div className='border-t border-t-gray-300 py-10 my-5'>
      <div className='flex  justify-between'>
       <h1 className='font-bold text-xl my-4'>Reviews</h1>
       <button className='border border-gray-300 rounded-3xl shadow-md bg-whitemode  h-[35px] px-5'>Show All </button>
      </div>
      <Review users={users}/>
   </div>
  </div>
  )
}