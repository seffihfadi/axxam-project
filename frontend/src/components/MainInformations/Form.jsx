import React, { useState } from "react";
import Image from "../../../public/bg4.jpg";
import { HiOutlineCamera } from "react-icons/hi2";
import { useDropzone } from "react-dropzone";
function Form() {
  const userinfo = {
    FullName: "Bouzidi Ahmad",
    PhoneNumber: "+213 559 65 21 95",
    Birthdate: "22/05/2001",
    Gender: "Male",
    Biography: "Not provided",
    Address: "Not provided",
    image: Image,
  };
  const birthdateParts = userinfo.Birthdate.split("/");
  const formattedBirthdate = `${birthdateParts[2]}-${birthdateParts[1]}-${birthdateParts[0]}`;
  const [image, setImage] = useState(userinfo.image); // State for the image

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Only accept image files
    onDrop: (acceptedFiles) => {
      const newImage = acceptedFiles[0]; // Get the first dropped file
      setImage(URL.createObjectURL(newImage)); // Update image state with preview URL
    },
  });
  return (
    <div className=" container  my-24">
      <div className="md:grid md:grid-cols-[3fr,1fr] flex flex-col-reverse ">
        <div>
          <div className="pb-32">
            <h1 className=" md:pt-9 md:pb-20 pb-12 mx-auto md:mx-0 flex justify-center md:justify-start font-bold text-xl ">
              Main Informations
            </h1>
            <form>
              <div className="main">
                <input
                  id="Fullname"
                  name="Fullname"
                  type="text"
                  placeholder={userinfo.FullName}
                  required
                />
                <label htmlFor="Fullname">Full name</label>
              </div>
              <div className="main">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="tel"
                  placeholder={userinfo.PhoneNumber}
                  required
                />
                <label htmlFor="Fullname">Phone number</label>
              </div>
              <div className="main ">
                <input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  placeholder={formattedBirthdate}
                  required
                />
                <label htmlFor="birthdate">Birthdate</label>
              </div>
            </form>
            <button className="primary info">Save</button>
          </div>
          <div className="pb-32">
            <h1 className="pb-10 pt-3 md:pb-20 mx-auto md:mx-0 flex justify-center md:justify-start font-bold text-xl ">
              Additional informations
            </h1>
            <form>
              <div className="main ">
                <select name="" id="sdf">
                  <option
                    value="Male"
                    className="darktxt dark:bg-darkmode"
                    placeholder={userinfo.Gender === "Male"}
                  >
                    Male
                  </option>
                  <option
                    value="Female"
                    className="darktxt dark:bg-darkmode"
                    placeholder={userinfo.Gender === "Female"}
                  >
                    Female
                  </option>
                </select>
                <label htmlFor="sdf">Gender</label>
              </div>
              <div className="main">
                <input
                  id="Biography"
                  name="Biography"
                  type="text"
                  placeholder={userinfo.Biography}
                  required
                />
                <label htmlFor="Biography">Biography</label>
              </div>
              <div className="main">
                <input
                  id="Address"
                  name="Address"
                  type="text"
                  placeholder={userinfo.Biography}
                  required
                />
                <label htmlFor="Address">Address</label>
              </div>
            </form>
            <button className="primary info">Save</button>
          </div>
        </div>
        <div className=" w-full pb-14 md:mt-36 mt-12 flex justify-center relative">
          <div
            {...getRootProps({
              className:
                "lg:w-44 lg:h-44 md:w-36 md:h-36 w-28 h-28 flex sticky",
            })}
          >
            <img
              src={image}
              className="rounded-full object-cover"
              alt="Profile Picture"
            />
            <input {...getInputProps()} />
            <button className="flex gap-3 items-center justify-center lg:px-7 px-4 py-2 rounded-3xl shadow-md font-semibold md:text-sm text-xs w-fit bg-whitemode dark:bg-gray-600 absolute bottom-0 left-1/2 transform -translate-x-1/2 ">
              <span>
                <HiOutlineCamera />
              </span>
              <span className="darktxt">Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
