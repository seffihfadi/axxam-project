import React from 'react'

const SectionTwo = ({data}) => {
  return (
    <section className='landing grid grid-cols-12 md:gap-10'>
      <div className='order-2 grid grid-cols-12 gap-4 col-span-12 md:col-span-6 lg:col-span-5'>
        <div className='h-[450px] relative col-span-12'>
          <img className='h-full' src={data.imgUrl1} alt="img" />
          <div className="absolute bg-whitemode dark:bg-darkmode rounded-2xl -right-3 -top-3 w-[calc(40%+5rem)] h-[calc(34%+5rem)]">
            <img className='w-[calc(100%-24px)] h-[calc(100%-24px)] mr-3 mt-3 aspect-16/3 ml-auto'  src={data.imgUrl2} alt="img" />
          </div>
        </div>
      </div>
      <div className='col-span-12 md:order-2 md:col-span-6 lg:col-span-7 flex flex-col gap-4 mb-10 md:mb-0 justify-center'>
        <div className="title">{data.span}</div>
        <h2 className='font-semibold text-3xl'>{data.title}</h2>
        <p className='text-secondary text-lg'>{data.desc}</p>
        <ul>
          {data.points.map((point, i) => 
          <div key={i} className="flex items-center">
            <span className="material-symbols-outlined text-3xl text-primary mr-2">check</span>
            <li className='my-1'>{point}</li>
          </div>
          )}
        </ul>
      </div>
    </section>
  )
}

export default SectionTwo