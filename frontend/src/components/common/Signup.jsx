import React, { useState } from "react";
import Popup from "./Popup";

function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpen() {
    setIsOpen(true);
    document.body.classList.add("popup-open");
  }
  function handleClose() {
    setIsOpen(false);
    document.body.classList.remove("popup-open");
  }
  return (
    <>
      <button onClick={handleOpen} className="button primary">
        click me
      </button>
      {isOpen && (
        <Popup
          children={
            <div className="w-[80%] mx-auto">
              <button onClick={handleClose} className="absolute left-4 top-6">
                X
              </button>
              <div
                className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 before:top-16 
                              before:left-0 font-semibold"
              >
                Signup
              </div>
              <h1 className="text-center font-bold text-xl mt-14">
                Welcome To AXXAM
              </h1>
              <form className="pt-14">
                <div className="group">
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="text"
                    required
                  />
                  <label htmlFor="phonenumber">Phone Number</label>
                </div>
              </form>
              <p className="text-center">
                <span className="font-bold">Note:</span> We will send an OTP
                Code to the provided number for verification perposes
              </p>
              <div className="flex justify-center items-center mt-8 mb-20">
                <button className="rounded-lg bg-primary text-white font-semibold w-fit px-10 py-4">
                  Send Code
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
}

export default Signup;

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
