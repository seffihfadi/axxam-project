import { GiBarbecue } from "react-icons/gi";
import {FaCar,FaBath,FaWifi, FaSnowflake,FaDesktop,FaSwimmingPool,FaUmbrellaBeach,FaThermometerHalf} from "react-icons/fa";
import {FaDumbbell,FaTv} from "react-icons/fa6";
import {TbPiano} from "react-icons/tb";
import { PiPlantFill } from "react-icons/pi";

export const amenities= {
    Hot_tub : <FaBath/>,
    Air_conditioning: <FaSnowflake/>,
    Wifi: <FaWifi/>,
    Piano: <TbPiano/>,
    Gym: <FaDumbbell/>,
    Workspace: <FaDesktop/>,
    Parking: <FaCar/>,
    BBQ_Grill: <GiBarbecue/>,
    Beach_Access: <FaUmbrellaBeach/>,
    Swimming_Pool: <FaSwimmingPool/>,
    Garden: <PiPlantFill/>,
    TV: <FaTv/>,
    Heating: <FaThermometerHalf/>
  }