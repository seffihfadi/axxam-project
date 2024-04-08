import React from "react";
import Popup from "../common/Popup";

function Comments({handleClose}) {
  return (
    <>
      <Popup
        children={
          <div className="w-[80%] bg-white rounded-xl max-h-[75%] overflow-y-auto shadow-xl py-6 px-0 relative">
            <div className="w-full mx-auto h-[60vh]">
            <button onClick={handleClose} className="absolute left-4 top-6 text-lg">X</button>
            <div
              className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 before:top-16 
                        before:left-0 font-semibold"
            >
              Guests Reviews
            </div>
          </div>
          </div>
        }
      />
    </>
  );
}

export default Comments;
