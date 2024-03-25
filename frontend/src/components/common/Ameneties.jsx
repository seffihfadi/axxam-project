import {FaTv} from "react-icons/fa6";
import { PiPlantLight, PiPianoKeysLight, PiSwimmingPoolLight } from "react-icons/pi";
import { MdOutlineBathtub } from "react-icons/md";
import { IoCarSportOutline, IoSnowOutline, IoWifiOutline  } from "react-icons/io5";
import { CiDumbbell } from "react-icons/ci";
import { SlScreenDesktop } from "react-icons/sl";
import { LiaWaterSolid } from "react-icons/lia";
import { BsThermometerHalf } from "react-icons/bs";
import { TbGrill } from "react-icons/tb";

export const amenities= {
    Hot_tub : <MdOutlineBathtub/>,
    Air_conditioning: <IoSnowOutline/>,
    Wifi: <IoWifiOutline/>,
    Piano: <PiPianoKeysLight/>,
    Gym: <CiDumbbell/>,
    Workspace: <SlScreenDesktop/>,
    Parking: <IoCarSportOutline/>,
    BBQ_Grill: <TbGrill/>,
    Beach_Access: <LiaWaterSolid/>,
    Swimming_Pool: <PiSwimmingPoolLight/>,
    Garden: <PiPlantLight/>,
    TV: <FaTv/>,
    Heating: <BsThermometerHalf/>
  }