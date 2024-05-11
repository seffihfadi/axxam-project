export default function NotificationData({props , isNew, onClick}) {
  const { user, userImage, action, timestamp } = props;
  return (
    <div className=" ">
      
           <div className=" flex gap-3 items-center py-1   " onClick={onClick}> 
             <div className="  pb-9 sm:pb-5  ">
             <img 
                className=" flex-shrink-0 rounded-full w-9 h-9  flex overflow-hidden"
                src={userImage}
             />
             </div>
             
             <div className="  " >
                <div className="flex  ">
                    <span className="font-semibold text-md pt-3 sm:pt-3">{user}</span>
                    {isNew && <div className="w-2 h-2 bg-red-500 rounded-full ml-4 mt-[21px] sm:mt-[20px]   "></div>}
                </div>
               <div className="text-sm  "> {action} </div> 
               <span className="text-xs text-gray-400">{timestamp.toLocaleString()}</span>
             </div>
            </div>
            <div className="border-t-[#6D6D6D]/50  border-t-[1px] mt-2"></div> 
         
    </div>
  )
}