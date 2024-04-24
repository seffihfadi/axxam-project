import {FaTv} from "react-icons/fa6";
import { PiPlantLight, PiPianoKeysLight, PiSwimmingPoolLight } from "react-icons/pi";
import { MdOutlineBathtub, MdOutlineLocalLaundryService } from "react-icons/md";
import { IoCarSportOutline, IoSnowOutline, IoWifiOutline  } from "react-icons/io5";
import { CiDumbbell } from "react-icons/ci";
import { SlScreenDesktop } from "react-icons/sl";
import { LiaWaterSolid,LiaBedSolid } from "react-icons/lia";
import { BsThermometerHalf } from "react-icons/bs";
import { TbGrill, TbSportBillard} from "react-icons/tb";

export const Amenities = {
  hot_tub : <MdOutlineBathtub/>,
  air_conditioning: <IoSnowOutline/>,
  wifi: <IoWifiOutline/>,
  piano: <PiPianoKeysLight/>,
  gym: <CiDumbbell/>,
  workspace: <SlScreenDesktop/>,
  parking: <IoCarSportOutline/>,
  bbq_grill: <TbGrill/>,
  beach_access: <LiaWaterSolid/>,
  swimming_pool: <PiSwimmingPoolLight/>,
  garden: <PiPlantLight/>,
  tv: <FaTv/>,
  heating: <BsThermometerHalf/>
}