import { IoMdTime } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { TbSmokingNo, TbBalloonOff } from "react-icons/tb";
import { MdOutlinePets } from "react-icons/md";

export const Rules = [
  {
    icon: <GoPeople />,
    check_in: "Check-in after 3 PM",
  },
  {
    icon: <IoMdTime />, // Corrected icon for check-out
    check_out: "Check-out 12 PM",
  },
  {
    icon: <GoPeople />,
    max_guest: "10 Guests maximum ",
  },
  {
    icon: <TbSmokingNo />,
    smoking: "No smoking",
  },
  {
    icon: <TbBalloonOff />,
    parties: "No parties or events",
  },
  {
    icon: <MdOutlinePets/> ,
    pets: "No pets & animals allowed"
  },
  {
    icon: <MdOutlinePets/> ,
    pets: "No pets & animals allowed"
  },
];