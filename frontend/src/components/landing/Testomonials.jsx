import RatingDisplay from "../common/RaitingDisplay"
import { Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import Testomonial from "./Testomonial"

const Testomonials = () => {
  return (
    <section className='landing grid grid-cols-12 gap-10'>
      <div className='order-2 grid grid-cols-12 gap-4 col-span-12 md:col-span-6'>
        <div className='relative col-span-12'>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, dynamicBullets: true}}
          spaceBetween={0}
          autoHeight
          autoplay={{
            delay: 5000,
          }}
        >
        {[1, 2, 3].map((i) => 
          <SwiperSlide key={i}>
            <Testomonial key={i} />
          </SwiperSlide>
        )}
        </Swiper>
          

        </div>
      </div>
      <div className='col-span-12 md:col-span-6 flex flex-col gap-4 justify-center'>
        <div className="title">Clients Feedback</div>
        <h2 className='font-semibold text-3xl'>Look What Our Customers Say !</h2>
        <p className='text-secondary text-lg'>Check out our customer’s reviews and go to live an amazing renting  experience.</p>
        <div className="flex gap-5 mt-5">
          <button className="rounded-full p-5 border-[1px] border-primary w-10 h-10 flex justify-center items-center"><span className="material-symbols-outlined text-[30px] text-primary">arrow_back</span></button>
          <button className="rounded-full p-5 border-[1px] border-primary w-10 h-10 flex justify-center items-center"><span className="material-symbols-outlined text-[30px] text-primary">arrow_forward</span></button>
        </div>
      </div>
    </section>
  )
}

export default Testomonials