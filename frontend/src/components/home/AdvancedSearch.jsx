import React from "react";
import Select from "react-select";
import { useState } from "react";
import ReactSlider from "react-slider";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

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

  const handleChange = (selectedOption) => {
    setSelectedWilaya(selectedOption);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "6D6D6D",
    }),
  };
  return (
    <div className="container relative z-40 top-[-100px]">
      <div className="w-[85%] h-20  border border-gray-300 rounded-full flex items-center justify-between px-10 py-6 absolute bg-white">
        <div className="flex flex-col justify-between">
          <span>Location</span>
          <Select
            value={selectedWilaya}
            onChange={handleChange}
            options={wilayaOptions}
            placeholder="Select a location"
            className="w-[200px] text-sm"
            styles={customStyles}
          />
        </div>
        <div className="flex flex-col justify-between">
          <span>Property Type</span>
          <Select
            value={selectedWilaya}
            onChange={handleChange}
            options={propertyOptions}
            placeholder="Property type"
            className="w-[200px] text-sm"
            styles={customStyles}
          />
        </div>
        <div className="relative flex flex-col justify-between">
          <div onClick={() => setIsShown(!isShown)} className="cursor-pointer">
            <span>Price Range</span>
            <p className="text-sm h-[38px] flex justify-center items-center pl-2">
              <span className="w-[120px] inline-block text-[#777777]">
                Min: {priceRange[0]}DA
              </span>
              <span className="w-[120px] inline-block text-[#777777]">
                Max: {priceRange[1]}DA
              </span>
            </p>
          </div>
          <div
            className={`absolute bottom-[-55px] w-[400px] px-4 py-2  h-10 border-gray-300 border bg-white rounded-full ${
              !isShown && `opacity-0`
            } transition-opacity duration-150`}
          >
            <ReactSlider
              className="w-full h-full flex justify-center items-center"
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              onChange={setPriceRange}
              trackClassName="bg-primary h-3 rounded-full"
              minDistance={5000}
              thumbClassName="h-5 w-5 outline-none bg-white w-[60px] text-center text-sm cursor-pointer  border-[2px] border-primary rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <span>Date Range</span>
          <div className="rounded-md relative">
            <span
              onClick={() => setOpenDate(!openDate)}
              className="cursor-pointer text-sm pl-2 h-[38px] flex justify-center items-center"
              style={{ color: "#6D6D6D" }}
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
                className="date mt-32 absolute -top-[5.5rem] md:top-[-5.5rem] left-0 z-50"
                minDate={new Date()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;
