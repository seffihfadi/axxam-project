import { IoMdTime } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { TbSmokingNo, TbBalloonOff, TbCar } from "react-icons/tb";
import { MdPets, MdOutlineCleanHands } from "react-icons/md";
import { AiFillSound } from "react-icons/ai";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { FaSwimmingPool } from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";

export const Rules = {
  rule1: {
    icon: <IoMdTime />,
    content: "Check-in after 3 PM",
  },
  rule2: {
    icon: <IoMdTime />,
    content: "Check-out by 12 PM",
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
  rule6: {
    icon: <MdPets />,
    content: "Pets allowed with restrictions",
  },
  rule7: {
    icon: <TbCar />,
    content: "Free parking on premises",
  },
  rule8: {
    icon: <AiFillSound />,
    content: "Quiet hours from 10 PM to 7 AM",
  },
  rule9: {
    icon: <MdOutlineCleanHands />,
    content: "Leave the house clean",
  },
  rule10: {
    icon: <BsFillExclamationTriangleFill />,
    content: "Immediate reporting of damages required",
  },
  rule11: {
    icon: <FaSwimmingPool />,
    content: "Pool available seasonally",
  },
  rule12: {
    icon: <Ri24HoursFill />,
    content: "24/7 security camera surveillance",
  },
};
