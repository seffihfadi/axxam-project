import React from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa6";

import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef, useState, useEffect } from "react"
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'


function PropertyCard({ announcement }) {

  const swiperRef = useRef()
  const [autoplayInitiallyActive] = useState(false)

  useEffect(() => {
    if (swiperRef.current && !autoplayInitiallyActive) {
      swiperRef.current.swiper.autoplay.stop()
    }
  }, [autoplayInitiallyActive])

  const handleMouseEnter = () => {
    if (swiperRef.current && !swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.start()
    }
  }

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }


  return (
    <div className="flex flex-wrap cursor-pointer mb-3">
      <div 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}  
        className="w-full relative"
      >
        <div className="overflow-hidden rounded-2xl">
          <Swiper
            ref={swiperRef}
            modules={[Pagination, EffectFade, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={0}
            autoHeight="false"
            effect="fade"
            autoplay={{
              delay: 2000,
              disableOnInteraction: false
            }}
          >
          {announcement.images.slice(1).map((img, i) => 
            <SwiperSlide key={i}>
              <img
                src={img.secure_url}
                className="hover:scale-[1.05] h-[300px] w-full lg:h-[220px] duration-[400ms] object-cover"
              />
            </SwiperSlide>
          )}
          </Swiper>
          
        </div>
        <button>
          <FaHeart className="absolute top-3 right-3 text-xl" />
        </button>
      </div>
      <div className="flex justify-between w-full">
        <Link to={`/property/${announcement._id}`}>
          <div className="font-semibold flex justify-between dark:text-gray-200">
            {announcement.location.name}
            <div className="flex justify-center items-center gap-1">
              <FaRegStar className="text-lg" />
              {4.3}
            </div>
          </div>
          <br />
          <span className="text-secondary dark:text-gray-200 text-[14px] font-light block mb-2 leading-6">
            {announcement.title} <br /> {announcement.desc}
          </span>
          <span>{announcement.price / 100},00 DZD/night</span>
        </Link>
        
      </div>
    </div>
  );
}

export default PropertyCard;
