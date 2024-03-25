import { MdOutlineHomeWork } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Select from "react-select";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";

function SearchBar() {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const option = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "condo", label: "Condo" },
  ];
  const prix = [
    { value: "0da-50000da", label: "0da-50000da" },
    { value: "50000da-10000da", label: "50000da-10000da" },
    { value: "+10000da ", label: "+10000da" },
  ];
  const lieu = [
    { value: "Alger", label: "Alger" },
    { value: "Annaba", label: "Annaba" },
    { value: "Ouran", label: "Ouran" },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none", // Supprime la bordure
    }),
    indicatorSeparator: () => ({
      display: "none", // Masque le séparateur d'indicateur (|)
    }),
    dropdownIndicator: () => ({
      display: "none", // Masque l'indicateur de menu déroulant (^)
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#6D6D6D",
    }),
  };
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/hotels", { state: { date } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 border rounded-xl lg:rounded-full w-full sm:w-[unset] max-w-[25rem] sm:max-w-full bg-white p-3 sm:p-5 sm:py-3 lg:px-8 mt-10 -mx-20 -px-20">
      <div className="">
        <div className=" iconDiv flex gap-3">
          <div className="pd">
            <HiOutlineLocationMarker className=" " />
          </div>
          <h4 className="font-semibold titre arrow flex items-center gap-2">
            Location <IoIosArrowDown />
          </h4>
        </div>

        <div className=" flex gap-3">
          <Select
            options={lieu}
            placeholder="Select location"
            styles={customStyles}
            className="text-sm text-[#6D6D6D] select-slc"
          />
        </div>
      </div>
      <div className="">
        <div className=" flex iconDiv gap-3">
          <div className="pd">
            {" "}
            <MdOutlineHomeWork  />
          </div>
          <h4 className="font-semibold arrow flex titre items-center gap-2">
            Proprety Type <IoIosArrowDown />
          </h4>
        </div>
        <div className="flex gap-3">
          <Select
            options={option}
            placeholder="Select Property"
            styles={customStyles}
            className="text-sm text-[#6D6D6D] select-slc"
          />
        </div>
      </div>

      <div >
        <div className="flex iconDiv gap-3">
          <div className="pd ">
            <FiDollarSign  />
          </div>
          <h4 className="font-semibold  titre arrow flex items-center gap-2">
            Price Range <IoIosArrowDown  />{" "}
          </h4>
        </div>
        <div >
          <div >
            {" "}
            <Select
              options={prix}
              placeholder="Select price"
              styles={customStyles}
              className="text-sm text-[#6D6D6D] select-slc"
            />
          </div>
        </div>
      </div>

      <div >
        <div className=" flex  iconDiv gap-3">
          <div className="pd">
            {" "}
            <SlCalender className="" />
          </div>
          <h4 className="font-semibold arrow titre flex items-center gap-2">
            Date Range <IoIosArrowDown />
          </h4>
        </div>
        <div className=" flex gap-3">
          <div className="mt-1 p-2 h-[2.45rem] rounded-md relative">
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText  text-sm select-slc"
              style={{ color: "#6D6D6D" }}
            >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>

            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date mt-32 absolute -top-[5.5rem] md:top-[-5.5rem] left-0 z-50"
                minDate={new Date()}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center sm:col-span-2">
        <a
          className=" text-white h-[50px] w-[50px] bg-[#0051CB]  rounded-full flex justify-center items-center "
          href=""
        >
          <FaSearch />
        </a>
      </div>
    </div>
  );
}

export default SearchBar;





