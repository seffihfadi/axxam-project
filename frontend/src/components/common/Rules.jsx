import { IoMdTime } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { TbSmokingNo, TbBalloonOff } from "react-icons/tb";

export const Rules = [
  {
    icon: <IoMdTime />,
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
];