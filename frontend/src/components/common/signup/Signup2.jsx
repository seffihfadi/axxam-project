import React, { useState } from "react";
import Popup from "../Popup";
import { MuiOtpInput } from "mui-one-time-password-input";
import { IoChevronBackOutline } from "react-icons/io5";

function Signup2({ isOpen, setIsOpen, handleBack, number }) {
  const [otp, setOtp] = useState("");

  function handleClose() {
    setIsOpen(false);
    document.body.classList.remove("popup-open");
  }

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <>
      {isOpen && (
        <Popup
          children={
            <div className="w-[80%] mx-auto h-[60vh]">
              <button onClick={handleBack} className="absolute left-4 top-6 text-lg">
                <IoChevronBackOutline/>
              </button>
              <div
                className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 before:top-16 
                              before:left-0 font-semibold"
              >
                Signup
              </div>
              <h1 className="text-center font-semibold text-2xl mt-14">
                Phone Checking
              </h1>
              <form className="py-14">
                <div>
                  <MuiOtpInput value={otp} onChange={handleChange} />
                </div>
              </form>
              <p className="text-center">
                <span className="font-semibold">Note:</span> We have sent an OTP
                Code to <span className="font-semibold">+213 {number}</span> check your phone, the code will be expired
                in <span className="font-semibold">2 minutes</span>
              </p>
              <div className="flex justify-center items-center mt-12 ">
                <button
                  className="rounded-lg bg-primary text-white font-semibold w-fit px-10 py-4"
                >
                  Next
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
}

export default Signup2;
