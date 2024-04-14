import React, { useState } from "react";
import Popup from "../../common/Popup";
import { IoClose } from "react-icons/io5";

function Signup1({
  isOpen,
  handleClose,
  openPopup2,
  openPopup1Signin,
  inputValue,
  setInputValue,
  title,
}) {
  const [hasInput, setHasInput] = useState(false);

  function handleEnter(event) {
    event.key === "Enter" &&
      (event.preventDefault(),
      setInputValue(event.target.value),
      inputValue != "" && openPopup2());
  }
  return (
    <>
      {isOpen && (
        <Popup
          children={
            <div className="window signup-1">
              <div className="w-[80%] md:w-[65%] mx-auto h-[400px] md:h-[450px] lg:h-[480px]">
                <button
                  onClick={handleClose}
                  className="absolute left-5 top-7 md:text-xl"
                >
                  <IoClose/>
                </button>
                <div
                  className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 dark:before:bg-gray-600 before:top-16 
                                before:left-0 font-semibold"
                >
                  {title}
                </div>
                <h1 className="text-center font-semibold text-xl md:text-2xl mt-14">
                  Welcome To AXXAM
                </h1>
                <form className="pt-10 md:pt-14 text-sm md:text-base">
                  <div className={`group phone ${hasInput && "has-input"}`}>
                    <input
                      id="phonenumber"
                      name="phonenumber"
                      type="text"
                      required
                      onKeyDown={(event) => handleEnter(event)}
                      onChange={(event) => {
                        setHasInput(event.target.value !== "");
                        setInputValue(event.target.value);
                      }}
                    />
                    <label htmlFor="phonenumber">Phone Number</label>
                  </div>
                </form>
                <p className="text-center text-sm md:text-base">
                  <span className="font-semibold">Note:</span> We will send an
                  OTP Code to the provided number for verification perposes
                </p>
                <div className="flex justify-center items-center mt-8 md:mt-12 ">
                  <button
                    className="rounded-md md:rounded-lg bg-primary text-white font-semibold w-fit px-6 md:px-10 py-4 text-sm md:text-base"
                    onClick={inputValue != "" && openPopup2}
                  >
                    Send Code
                  </button>
                </div>
              </div>
              { title === 'Signup' &&
              <button
                  className="text-gray-500 text-xs md:text-sm relative bottom-4 left-8 underline underline-offset-2"
                  onClick={openPopup1Signin}
                  >
                    Already signed up?
              </button>}
            </div>
          }
        />
      )}
    </>
  );
}

export default Signup1;

{
  /* <form>
                <div className="group">
                  <textarea name="desc" id="desc" rows="2" maxLength={250} required></textarea>
                  <label htmlFor="desc">post description</label>
                </div>
                <div className="group">
                  <input id="fullname" name="fullname" type="text" required />
                  <label htmlFor="fullname">Full name</label>
                </div>
                <div className="group">
                  <select name="" id="sdf">
                    <option value="">op 2</option>
                    <option value="">op one</option>
                  </select>
                  <label htmlFor="sdf">select one</label>
                </div>
              </form> */
}
