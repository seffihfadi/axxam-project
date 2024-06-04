import { FaTv } from "react-icons/fa";
import { PiPlantLight, PiPianoKeysLight, PiSwimmingPoolLight, PiTentLight } from "react-icons/pi";
import { MdOutlineBathtub, MdOutlineLocalLaundryService } from "react-icons/md";
import { IoCarSportOutline, IoSnowOutline, IoWifiOutline } from "react-icons/io5";
import { CiDumbbell } from "react-icons/ci";
import { SlScreenDesktop } from "react-icons/sl";
import { LiaWaterSolid, LiaBedSolid, LiaSkiingSolid } from "react-icons/lia";
import { BsThermometerHalf } from "react-icons/bs";
import { TbGrill, TbSportBillard } from "react-icons/tb";
import { RiCaravanLine } from "react-icons/ri";

export const Amenities = {
  hot_tub: <MdOutlineBathtub />,
  wifi: <IoWifiOutline />,
  air_conditioning: <IoSnowOutline />,
  piano: <PiPianoKeysLight />,
  gym: <CiDumbbell />,
  workspace: <SlScreenDesktop />,
  bbq_grill: <TbGrill />,
  parking: <IoCarSportOutline />,
  beach_access: <LiaWaterSolid />,
  garden: <PiPlantLight />,
  tv: <FaTv />,
  swimming_pool: <PiSwimmingPoolLight />,
  heating: <BsThermometerHalf />,
  arctic: <IoSnowOutline />,
  office: <SlScreenDesktop />,
  camping: <PiTentLight />,
  ski: <LiaSkiingSolid />,
  caravan: <RiCaravanLine />,
  nature: <PiPlantLight />, 
};
