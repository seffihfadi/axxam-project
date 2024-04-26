import React from "react";
import Select from "react-select";
import { useState } from "react";
import ReactSlider from "react-slider";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { IoSearchOutline, IoLocationOutline, IoCalendarOutline  } from "react-icons/io5";
import { PiBuildingsLight, PiCurrencyDollarLight } from "react-icons/pi";

function AdvancedSearch() {
  const minPrice = 5000;
  const maxPrice = 50000;
  const [isShown, setIsShown] = useState(false);

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const wilayas = [
    "Adrar",
    "Ain Defla",
    "Aïn Témouchent",
    "Alger",
    "Batna",
    "Béchar",
    "Béjaïa",
    "Biskra",
    "Blida",
    "Bordj Badji Mokhtar",
    "Bordj Bou Arréridj",
    "Bouira",
    "Djanet",
    "Djelfa",
    "El Bayadh",
    "El Menia",
    "El Oued",
    "El Tarf",
    "Ghardaia",
    "Guelma",
    "Illizi",
    "In Guezzam",
    "In Salah",
    "Jijel",
    "Khenchela",
    "Laghouat",
    "Mascara",
    "Médéa",
    "Mila",
    "Mostaganem",
    "M'Sila",
    "Naama",
    "Ouargla",
    "Oran",
    "Oum El Bouaghi",
    "Relizane",
    "Sétif",
    "Skikda",
    "Souk Ahras",
    "Souk Abrahm",
    "Tamanghasset",
    "Tébessa",
    "Tiemimoun",
    "Tindouf",
    "Tipasa",
    "Tissemsilt",
    "Tlemcen",
    "Touggourt",
  ];

  const propertyTypes = [
    "House",
    "Appartement",
    "Villa",
    "Cabin",
    "Caravan",
    "Tent",
  ];

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const wilayaOptions = wilayas.map((wilaya) => ({
    value: wilaya,
    label: wilaya,
  }));

  const propertyOptions = propertyTypes.map((p) => ({
    value: p,
    label: p,
  }));

  const [selectedWilaya, setSelectedWilaya] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedWilaya(selectedOption);
  };

  const customStyles = {
    control: () => ({
      display: "flex",
      border: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "6D6D6D",
      backgroundColor : (state.isSelected) && "#0051CB",
      opacity: state.isFocused ? "0.6" : "1"
    }),
  };
  return (
    <div className="container relative z-40 top-[-250px] md:top-[-100px]">
      <div className="w-full md:h-20  border border-gray-300 dark:border-gray-600 rounded-2xl md:rounded-full grid grid-cols-2 gap-3 md:flex md:items-center md:justify-between md:gap-2 px-6 md:px-8 lg:pr-10 lg:pl-16 py-6 md:py-14 absolute bg-white dark:bg-darkmode text-sm lg:text-base left-0">
        <div className="flex flex-col justify-between relative gap-2">
          <IoLocationOutline className="text-xl absolute left-0 top-1"/>
          <span className="pl-6">Location</span>
          <Select
            classNamePrefix="react-select"
            value={selectedWilaya}
            onChange={handleChange}
            options={wilayaOptions}
            placeholder="Select a location"
            className="md:w-[150px] lg:w-[200px] text-xs lg:text-sm text-nowrap selection:bg-darkmode"
            styles={customStyles}
          />
        </div>
        <div className="flex flex-col justify-between relative gap-2">
          <PiBuildingsLight className="text-xl absolute left-0 top-1"/>
          <span className="pl-6">Property Type</span>
          <Select
            classNamePrefix="react-select"
            value={selectedProperty}
            onChange={(e)=> setSelectedProperty(e)}
            options={propertyOptions}
            placeholder="Property type"
            className="md:w-[150px] lg:w-[200px] text-xs lg:text-sm"
            styles={customStyles}
          />
        </div>
        <div className="relative flex flex-col justify-between">
          <div onClick={() => setIsShown(!isShown)} className="cursor-pointer flex flex-col justify-between gap-2">
          <PiCurrencyDollarLight className="text-xl absolute left-[-8px] top-1"/>
            <span className="pl-4">Price Range</span>
            <p className="text-xs lg:text-sm h-[38px] md:w-[180px] flex justify-center items-center pl-2 text-nowrap">
              <span className="linline-block text-[#777777] mr-1 lg:mr-2">
                Min: {priceRange[0]} DA
              </span>
              <span className="inline-block text-[#777777]">
                Max: {priceRange[1]} DA
              </span>
            </p>
          </div>
          <div
            className={`absolute bottom-[-70px] z-30 lg:bottom-[-80px] w-[200%] md:w-[300px] lg:w-[400px] px-4 lg:px-6 py-2 lg:py-3 h-16 lg:h-20 border-gray-300 dark:border-gray-600 border bg-white dark:bg-darkmode rounded-full ${
              !isShown && `opacity-0`
            } transition-opacity duration-150`}
          >
            <h3 className=" max-md:text-xs">Select a price range</h3>
            <ReactSlider
              className="w-full h-full flex justify-center items-center translate-y-[-10px]"
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              onChange={setPriceRange}
              trackClassName="bg-primary h-2 lg:h-3 rounded-full"
              minDistance={5000}
              thumbClassName="h-4 w-4 lg:h-5 lg:w-5 outline-none bg-white text-center text-sm cursor-pointer  border-[2px] border-primary rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 relative">
          <IoCalendarOutline className="text-xl absolute left-0 top-1"/>
          <span className="pl-6">Date Range</span>
          <div className="rounded-md relative">
            <span
              onClick={() => setOpenDate(!openDate)}
              className="cursor-pointer text-xs lg:text-sm pl-2 h-[38px] md:translate-y-[7px] lg:translate-y-0 flex justify-center items-center text-[#777777]"
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
            </span>

            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date mt-32 absolute -top-[5.5rem] md:top-[-5.5rem] left-[-80%] lg:left-0 z-50"
                minDate={new Date()}
              />
            )}
          </div>
        </div>
        <div className="flex justify-center items-center col-span-2">
        <button className=" text-white h-[50px] w-[50px] bg-primary rounded-full flex justify-center items-center md:translate-x-[20px] translate-y-[10px] md:translate-y-0 ">
          <IoSearchOutline size={18}/>
        </button>
      </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;
