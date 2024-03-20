import { MdOutlineHomeWork } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Select from 'react-select';
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
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'condo', label: 'Condo' }
      ];
      const prix = [
        { value:'0da-50000da', label: '0da-50000da' },
        { value: '50000da-10000da', label: '50000da-10000da' },
        { value: '+10000da ', label: '+10000da' }
      ];
      const lieu = [
        { value: 'Alger', label: 'Alger' },
        { value: 'Annaba', label: 'Annaba' },
        { value: 'Ouran', label: 'Ouran' }
      ];
      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border: 'none', // Supprime la bordure
        }),
        indicatorSeparator: () => ({
          display: 'none', // Masque le séparateur d'indicateur (|)
        }),
        dropdownIndicator: () => ({
          display: 'none', // Masque l'indicateur de menu déroulant (^)
        }),
      };
      const navigate = useNavigate();

  
      const handleSearch = () => {
        navigate("/hotels", { state: { date } });
      };

      return (
        <div className=" container pt-[60px] z-50 "> 
         <div className=" border  rounded-full border-red w-[1069px] h-[100px]  py-3  ">
         
          <div className= " flex items-center justify-center gap-5   " >
                    <div className="singleInput  grid grid-cols-1  items-center  gap-[0px]   ">
                        <div className=" iconDiv texts fle ">
                        <div className="pd ">
                           <HiOutlineLocationMarker className="icon " />
                        </div>
                        <h4 className="font-semibold pr-9 arrow ">Location <IoIosArrowDown  /></h4>
                        </div>
                        <div className="texts">
                            <Select
                           options={lieu}
                            placeholder="Select location"
                            styles={customStyles}
                            className="pl-[27px] text-sm text-[#6D6D6D]" 
                          />     
                        </div>
                    </div>
                    <div className="singleInput  grid grid-cols-1  items-center  gap-[0px]  ">
                        <div className=" iconDiv texts fle">
                           <div className="pd"> <MdOutlineHomeWork className="icon" /></div>
                           <h4 className="font-semibold pr-9 arrow ">Proprety Type <IoIosArrowDown  /></h4>
                        </div>
                        <div className="texts">
                           
                            <Select
                            options={option}
                            placeholder="Select Property"
                            styles={customStyles}
                            className="pl-[27px] text-sm text-[#6D6D6D]" 
                          />
                        </div>
                    </div>

                    <div className="singleInput  grid grid-cols-1  items-center  gap-[0px]  ">
                        <div className=" iconDiv   texts fle  ">
                           <div className="pd "><FiDollarSign className="icon  h-[20px] w-[20px]" /></div> 
                            <h4 className="font-semibold pr-9 arrow " >Price Range <IoIosArrowDown  /> </h4>
                        </div>
                        <div className="texts ">
                        
                           <div className=""> <Select
                            options={prix}
                            placeholder="Select price"
                            styles={customStyles} 
                            className="pl-7   text-sm text-[#6D6D6D]"
                          />
                             </div>               
                      
                        </div>
                 </div>

                    <div className="singleInput grid grid-cols-1   items-center  gap-[3px]">
                      <div className="iconDiv   texts fle ">
                       <div className="pd"> <SlCalender  className="icon" />
                       </div>
                       <h4 className="font-semibold pr-16 arrow ">Date Range <IoIosArrowDown  /></h4>
                       </div>
                  <div className="texts">
                   
                    <div className="pt-1 pb-[8px] ">
                                      
                    <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText pl-[46px]  text-sm text-[#6D6D6D]  "
                  >{`${format(date[0].startDate, "MM/dd/yyyy" )} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className="date"
                      minDate={new Date()}
                    />
                  )}
                 
                  </div>
                  </div>
                  </div>

                  
                 <div className="h-[60px] w-[60px]  pl-9 " >
                 <a
                      className=" text-white h-[50px] w-[50px]  bg-[#0051CB]   rounded-full flex justify-center items-center hover: transform  hover:scale-75
                  transition-all duration-150 ease-in-out" href="">
                      <FaSearch />
                  </a>
                  </div>

               
              </div>
          </div>

          

        </div> 
        
      )
    }
    
   export default SearchBar ;




