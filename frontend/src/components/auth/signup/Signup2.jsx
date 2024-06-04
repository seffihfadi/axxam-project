import React, { useState } from "react";
import Popup from "../../common/Popup";
import { MuiOtpInput } from "mui-one-time-password-input";
import { IoChevronBackOutline } from "react-icons/io5";
import { useVerifyOtpMutation } from "../../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../app/slices/alertSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../app/slices/authSlice";

function Signup2({ isOpen, number, openPopup3, title, handleClose }) {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const user = useSelector(selectCurrentUser)

  // console.log('title', title)
  const verifyOTP = async (e) => {
    e.preventDefault()
    // console.log('hsi', otp, number)
    if(otp.length < 6 || !number) return 

    await verifyOtp({phone: number, otp})
      .unwrap()
      .then((payload) => {
        dispatch(setAlert([payload.message, 'success']))
        if (title === 'Signup') {
          openPopup3()
        } else {
          handleClose()
          window.location.href = '/sl'
        }
      })
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))

  }



  return (
    <>
      {isOpen && (
        <Popup
          children={
            <div className="window">
              <div className="w-[80%] md:w-[65%] mx-auto h-[400px] md:h-[450px] lg:h-[480px]">
                <button
                  className="absolute left-5 top-6 md:text-lg"
                >
                  <IoChevronBackOutline />
                </button>
                <div
                  className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 dark:before:bg-gray-600 before:top-16 
                                before:left-0 font-semibold"
                >
                  {title}
                </div>
                <h1 className="text-center font-semibold text-xl md:text-2xl mt-14">
                  Phone Checking
                </h1>
                <form onSubmit={verifyOTP} className="py-12 lg:py-14">
                  <div>
                    <MuiOtpInput length={6} value={otp} onChange={(v) => setOtp(v)}  />
                  </div>
                  <p className="text-center text-sm mt-4 md:text-base">
                    <span className="font-semibold">Note:</span> We have sent an
                    OTP Code to{" "}
                    <span className="font-semibold">+213 {number}</span> check
                    your phone, the code will be expired in{" "}
                    <span className="font-semibold">2 minutes</span>
                  </p>
                  <div className="flex justify-center items-center mt-8 md:mt-12 ">
                    {title === 'Signup' ? 
                    <button
                    className="rounded-md md:rounded-lg bg-primary text-white font-semibold w-fit px-8 md:px-10 py-4 text-sm md:text-base"
                    type="submit"
                    >
                      Next
                    </button> 
                    : 
                    <button
                    className="rounded-md md:rounded-lg bg-primary text-white font-semibold w-fit px-8 md:px-10 py-4 text-sm md:text-base"
                    type="submit"
                    disabled={isLoading}
                    >
                      Signin
                    </button> }
                  </div>
                </form>
              </div>
            </div>
          }
        />
      )}
    </>
  );
}

export default Signup2;
