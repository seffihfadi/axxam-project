import { IoMdTime } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { TbSmokingNo, TbBalloonOff } from "react-icons/tb";


export const Rules = {
  rule1: {
    icon: <IoMdTime />,
    content: "Check-in after 3 PM",
  },
  rule2: {
    icon: <IoMdTime />,
    content: "Check-out 12 PM",
  },
  rule3: {
    icon: <GoPeople />,
    content: "10 Guests maximum",
  },
  rule4: {
    icon: <TbSmokingNo />,
    content: "No smoking",
  },
  rule5: {
    icon: <TbBalloonOff />,
    content: "No parties or events",
  },
};