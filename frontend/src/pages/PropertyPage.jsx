import PropertyDetails from '../components/property/PropertyDetails'
import { IoMdTime,IoIosSnow} from "react-icons/io";
import { GiBarbecue } from "react-icons/gi";
import { GoPeople} from "react-icons/go";
import {FaCar,FaBath,FaWifi, FaSnowflake,FaDesktop} from "react-icons/fa";
import {FaDumbbell} from "react-icons/fa6";
import { TbSmokingNo,TbBalloonOff,TbPiano} from "react-icons/tb";
import Reviews from '../components/property/Reviews';
import Overallreview from '../components/property/Overallreview';
import PropertyMap from '../components/property/PropertyMap'
const PropertyPage = () => {
    {/*PropertDetails */}
    const card = 
    { 
      image1: "/public/picc1.jpg",
      image2:"/public/card1pic1.jpg",
      image3:"/public/card1pic2.jpg",
      image4:"/public/card1pic3.jpg",
      image5:"/public/card1pic4.jpg",
      accommodation_title:"Stylish Downtown Retreat - Walk Everywhere!",
      location: "Villa with terrace in Staoueli, Algiers",
      accommodation_config: "4 guests,  3 badrooms,  3 bads,  1 bath ",
      description:"Discover urban living at its best in our chic downtown retreat. Located steps fro cafes, shops, and attractions, our cozy home offers a serene escape amidst city life. Relax in stylish comfort, cook in our fully equipped kitchen, and enjoy modern amenities including WiFi and AC. With pet-friendly options and flexible check-in,it s the perfect base for your city adventure. Book now and experience the downtown living!",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    }
    const owner = {
      name: "Ahmed",
      rate: "5.0",
      hosting: "4 months",
      reviews_nemb: "12",
      communication_rate: "5.0",
      location_rate: "5.0",
      neighbours_rate: "5.0",
      cleanliness_rate: "5.0",
      picture: "../../../public/bg4.jpg"
    };
  
    const rules= [
      { icon:<IoMdTime/>,
        check_in:"Check-in after 3 PM"
      },
      { icon:<IoMdTime/>,
        check_out:"Check-out 12 PM"
      },
      { icon:<GoPeople/>,
        max_guest:"10 Guests maximum "
      },  
      {
       icon:<TbSmokingNo/>,
       smoking:"No smoking"
      },
      {
      icon:<TbBalloonOff/>,
      parties:"No parties or events"
      },
     ]
    const offers= [
      {icon:<FaBath/>,
       offer:"Hot tub" 
      },
      { icon:<FaSnowflake/>,
        offer:"Air conditioning"
      },
      { icon:<FaWifi/>,
        offer:"Wifi"
      },
      { icon:<TbPiano/>,
        offer:"Piano"
      },
      {icon:<FaDumbbell/>,
        offer:"Gym"  
      },
     {icon:<FaDesktop/>,
      offer:"Workspace"
      },
     { icon:<FaCar/>,
      offer:"Parking",
     },
     { icon:<GiBarbecue/>,
     offer:"BBQ Grill"
     }]
  return (
    <>
    <PropertyDetails data={card} rules={rules} offers={offers} owner={owner}/>
    <Overallreview owner={owner}/>
    <Reviews />
    <PropertyMap/>
    </>
  )
}

export default PropertyPage
