import React, { useState } from "react";
import Popup from "../Popup";

function Signup1({
  isOpen,
  setIsOpen,
  handleClose,
  openPopup2,
  inputValue,
  setInputValue,
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
            <div className="window">
              <div className="w-[65%] mx-auto h-[60vh]">
                <button
                  onClick={handleClose}
                  className="absolute left-4 top-6 text-lg"
                >
                  X
                </button>
                <div
                  className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 before:top-16 
                                before:left-0 font-semibold"
                >
                  Signup
                </div>
                <h1 className="text-center font-semibold text-2xl mt-14">
                  Welcome To AXXAM
                </h1>
                <form className="pt-14">
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
                <p className="text-center">
                  <span className="font-semibold">Note:</span> We will send an OTP
                  Code to the provided number for verification perposes
                </p>
                <div className="flex justify-center items-center mt-12 ">
                  <button
                    className="rounded-lg bg-primary text-white font-semibold w-fit px-10 py-4"
                    onClick={inputValue != "" && openPopup2}
                  >
                    Send Code
                  </button>
                </div>
              </div>
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
