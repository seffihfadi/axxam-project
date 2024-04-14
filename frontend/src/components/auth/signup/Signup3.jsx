import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoChevronBackOutline } from "react-icons/io5";
import Popup from "../../common/Popup";
import { IoCameraOutline } from "react-icons/io5";

function Signup3({ isOpen, handleBack, openPopup4 }) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Only accept image files
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
        className="rounded-full w-[200px] h-[200px]"
      />
    </div>
  ));

  return (
    <>
      {isOpen && (
        <Popup
          children={
            <div className="window">
              <div className="w-[85%] mx-auto h-[400px] md:h-[450px] lg:h-[480px]">
                <button
                  onClick={handleBack}
                  className="absolute left-5 top-6 text-lg"
                >
                  <IoChevronBackOutline />
                </button>
                <div
                  className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 dark:before:bg-gray-600 before:top-16 
                                before:left-0 font-semibold"
                >
                  Signup
                </div>
                <h1 className="text-center font-semibold text-xl md:text-2xl mt-14">
                  Sign up to AXXAM
                </h1>
                <div className="flex justify-between items-center flex-row-reverse md:flex-row py-10 lg:py-14 gap-3 md:gap-5 text-sm md:text-base">
                  <form className="flex-1">
                    <div className="group">
                      <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        required
                      />
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
                  {/* Dropzone with camera icon */}
                  <div
                    {...getRootProps({ className: "dropzone rounded-full" })}
                    className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full flex justify-center items-center text-3xl border-[1px] border-gray-300 dark:border-gray-600"
                  >
                    <input {...getInputProps()} />
                    {files.length > 0 ? (
                      thumbs[0] // Display the first dropped image
                    ) : (
                      <div className="flex justify-center items-center text-3xl">
                        <IoCameraOutline />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="rounded-md md:rounded-lg bg-primary text-white font-semibold w-fit px-8 md:px-10 py-4 text-sm md:text-base"
                    onClick={openPopup4}
                  >
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
