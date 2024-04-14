import React, { useState, useEffect } from "react";
import Popup from "../../common/Popup";
import { IoChevronBackOutline } from "react-icons/io5";

function ResizeAwareTextarea({ children }) {
  const [rows, setRows] = useState(4);

  function calculateRows() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
          setRows(2);
      } else if (screenWidth <= 1024) {
          setRows(3);
      } else {
          setRows(4);
      }
  }

  useEffect(() => {
      calculateRows();
      window.addEventListener('resize', calculateRows);
      return () => window.removeEventListener('resize', calculateRows);
  }, []);

  return children(rows);
}


function Signup4({ isOpen, handleBack }) {

  return (
    <>
      {isOpen && (
        <Popup
          children={
            <div className="window">
              <div className="w-[85%] mx-auto h-[400px] md:h-[450px] lg:h-[480px]">
                <button
                  onClick={handleBack}
                  className="absolute left-5 top-6 md:text-lg"
                >
                  <IoChevronBackOutline/>
                </button>
                <div
                  className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 dark:before:bg-gray-600 before:top-16 
                                before:left-0 font-semibold"
                >
                  Signup
                </div>
                <h1 className="text-center font-semibold text-xl md:text-2xl mt-14">
                  Additional Informations
                </h1>
                <div className="pt-8 lg:pt-10">
                  <div className="flex justify-between items-center gap-3">
                    <form className="flex-1">
                      <div className="group flex-1">
                        <select name="gender" id="sdf">
                          <option value="">Male</option>
                          <option value="">Female</option>
                        </select>
                        <label htmlFor="sdf">Gender</label>
                      </div>
                    </form>
                    <form className="flex-1">
                      <div className="group flex-1">
                        <input
                          id="location"
                          name="location"
                          type="location"
                          required
                        />
                        <label htmlFor="location">Lives in</label>
                      </div>
                    </form>
                  </div>
                  <ResizeAwareTextarea>
                    {(rows) => (
                      <form>
                        <div className="group">
                          <textarea
                            name="desc"
                            id="desc"
                            rows={rows}
                            maxLength={250}
                            required
                          ></textarea>
                          <label htmlFor="desc">Tell us more about yourself</label>
                        </div>
                      </form>
                    )}
                  </ResizeAwareTextarea>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-gray-500 text-sm md:text-base">Skip for now</button>
                  <button className="rounded-lg bg-primary text-white font-semibold w-fit px-8 md:px-10 py-3 md:py-4">
                    Save
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

export default Signup4;
