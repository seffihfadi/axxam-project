import TimeAgo from 'timeago-react'
import Image from '../common/Image.jsx'
export default function NotificationData({props , isNew, onClick}) {

  function noteCount(inputString, count) {
    const regex = /#num#/;
    if (count == 1) {
      return inputString.replace(regex, "a")
    }else{
      return inputString.replace(regex, count)
    }
  }
  
  return (
    <div className=" ">
      
           <div className=" flex gap-3 items-center py-1   " onClick={onClick}> 
             <div className="  pb-9 sm:pb-5 size-12 rounded-full">
                <Image src={props.from?.avatar} userName={props.from?.fullname} />
             </div>
             <div className="  " >
                <div className="flex  ">
                    <span className="font-semibold text-md pt-3 sm:pt-3">{props.from?.fullname}</span>
                    {isNew && <div className="w-2 h-2 bg-red-500 rounded-full ml-4 mt-[21px] sm:mt-[20px]   "></div>}
                </div>
               <div className="text-sm  "> {noteCount(props.note, props.count)}</div> 
               

               <span className="text-xs text-gray-400"><TimeAgo datetime={props.createdAt}></TimeAgo></span>
             </div>
            </div>
            <div className="border-t-[#6D6D6D]/50  border-t-[1px] mt-2"></div> 
    </div>
  )
}