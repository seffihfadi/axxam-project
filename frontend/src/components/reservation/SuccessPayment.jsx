import { FaCheckCircle } from "react-icons/fa";
const SuccessPayment = () => {
  return (
        <div className=' pt-32 pb-72'>
            <div className='flex items-center justify-center gap-3 pt-52 pb-20'>
                <FaCheckCircle  className=' text-lime-500 h-7 w-7  sm:h-9 sm:w-9'/> 
                <p className='font-semibold text-sm  sm:text-lg md:text-xl lg:text-2xl '> Congratulations! Your payment has been successfully processed. </p>
            </div>   
        </div>
  )
}
 export default SuccessPayment 