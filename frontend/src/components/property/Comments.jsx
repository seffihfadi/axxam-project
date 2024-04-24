import React from "react";
import Popup from "../common/Popup";
import { FaRegMessage } from 'react-icons/fa6';
import { TbLocation } from 'react-icons/tb';
import { GoPeople } from 'react-icons/go';
import { MdOutlineCleaningServices } from 'react-icons/md';
import Comment from "./Comment";

function Comments({handleClose,owner,comments}) {

  return (
    <>
      <Popup
        children={
          <div className="w-[80%]  bg-white rounded-xl lg:h-[90%]  h-[50%] overflow-hidden shadow-xl py-6 px-0 relative">
            <div className="w-full mx-auto h-[86vh] overflow-y-auto ">
              <div className="px-4 border-b pb-4 sticky top-0 bg-white z-50 font-semibold">
              <button onClick={handleClose}  className="absolute left-6">X</button>
              <div className="flex justify-center ">
              Guests Reviews
              </div>
              </div>
              <div className=" px-6 py-4  lg:grid lg:grid-cols-[2fr,1fr] flex flex-col-reverse items-center lg:items-start  ">
                <div>
                  <h1 className="font-bold text-xl lg:pt-1 pt-12 ">{comments.length} review{comments.length>1 && <span>s</span>}</h1>
                  <div >
                    <Comment comments={comments}/>
                  </div>
                 </div>
                <div className=" lg:sticky lg:top-20 p-6  h-[430px] border rounded-2xl  shadow-md  flex flex-col  gap-2  md:w-[80%] lg:w-full w-full ">
                  <div className="user  ">
                    <img src={owner.picture} alt="owner" className="img" />
                    <div >
                      <span className='text-base font-bold'>Hosted by {owner.name} </span>
                      <p className="flex items-center gap-2 text-sm font-semibold">
                      <img src="../../../public/star.svg" alt="star" />
                     {owner.rate}
                      </p>
                   </div>
                  </div>
                  <div >
                  <div className="flex justify-between border-b-2  border-b-gray-200 py-8   ">
                    <span className="flex items-center gap-4 text-black">
                     <MdOutlineCleaningServices size={20}/> Cleanliness
                    </span>
                    <span className="font-semibold">
                     {owner.cleanliness_rate}
                    </span>
                  </div>
                  <div className="flex justify-between border-b-2 border-b-gray-200 py-8 ">
                  <span className="flex items-center gap-4 text-black">
                     <FaRegMessage size={20}/>
                     Communication
                    </span>
                    <span className="font-semibold">
                     {owner.communication_rate}
                    </span>
                  </div>
                  <div className="flex justify-between border-b-2 border-b-gray-200 py-8">
                  <span className="flex items-center gap-4 text-black">
                     <TbLocation size={20}/>
                      Location
                    </span>
                    <span className="font-semibold">
                     {owner.location_rate}
                    </span>
                  </div>
                  <div className="flex justify-between  pt-8 pb-4">
                  <span className="flex items-center gap-4 text-black">
                     <GoPeople size={20}/>
                     Neighbours
                    </span>
                    <span className="font-semibold">
                     {owner.neighbours_rate}
                    </span>
                  </div>
                 </div>
                 </div>
              </div>
              </div>
              
          </div>
          
        }
      />
    </>
  );
}

export default Comments;
