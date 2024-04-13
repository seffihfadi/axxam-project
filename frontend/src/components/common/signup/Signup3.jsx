import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoChevronBackOutline } from "react-icons/io5";
import Popup from "../Popup";
import { IoCameraOutline } from "react-icons/io5";

function Signup3({ isOpen, handleBack }) {
  return (
    <>
      {isOpen && (
        <Popup
          children={
            <div className="window">
              <div className="w-[85%] mx-auto h-[60vh]">
                <button
                  onClick={handleBack}
                  className="absolute left-4 top-6 text-lg"
                >
                  <IoChevronBackOutline />
                </button>
                <div
                  className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 before:top-16 
                                before:left-0 font-semibold"
                >
                  Signup
                </div>
                <h1 className="text-center font-semibold text-2xl mt-14">
                  Sign up to AXXAM
                </h1>
                <div className="flex justify-between items-center py-14 gap-5">
                  <form className="flex-1">
                    <div className="group">
                      <input id="fullname" name="fullname" type="text" required />
                      <label htmlFor="fullname">Full name</label>
                    </div>
                    <div className="group signup">
                      <input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        required
                      />
                      <label htmlFor="birthdate">BirthDate</label>
                    </div>
                  </form>
                  <div className="w-[200px] h-[200px] rounded-full flex justify-center items-center text-3xl border-[1px] border-gray-300">
                    <IoCameraOutline />
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button className="rounded-lg bg-primary text-white font-semibold w-fit px-10 py-4">
                    Next
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

export default Signup3;

// const [files, setFiles] = useState([]);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: 'image/*', // Only accept image files
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, { preview: URL.createObjectURL(file) })
//         )
//       );
//     },
//   });

//   const thumbs = files.map((file) => (
//     <div key={file.name}>
//       <img src={file.preview} alt={file.name} />
//     </div>
//   ));

//   return (
//     <section className="container">
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()} />
//         <p>Drag & drop some images here, or click to select files</p>
//       </div>
//       <aside>{thumbs}</aside>
//     </section>
//   );
