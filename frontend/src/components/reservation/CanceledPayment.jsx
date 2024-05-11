import { VscError } from "react-icons/vsc";
const CanceledPayment = () => {
  return (
    <div className=' pt-32 pb-72'>
    <div className='flex items-center justify-center gap-3 pt-52 pb-20'>
        <VscError  className=' text-red-700 h-7 w-7  sm:h-9 sm:w-9'/> 
        <p className='font-semibold text-sm  sm:text-lg md:text-xl lg:text-2xl '> We're sorry, but we encountered an issue processing your payment.  </p>
    </div>   
  </div>
  )
}

export default CanceledPayment