import PropertyDetails from '../components/property/PropertyDetails'


import { Rules } from '../components/common/Rules';
import { amenities } from '../components/common/Ameneties';

import Reviews from '../components/property/Reviews';
import Overallreview from '../components/property/Overallreview';
import PropertyMap from '../components/property/PropertyMap'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
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
      picture: "/public/bg4.jpg"
    };
    
    const propertyPosition = [36.75694627456025, 2.8524488210678105]
    
    const propertyRules = [Rules[0], Rules[1], Rules[2], Rules[3],Rules[4]];

    const propertyAmenities = {
      Hot_tub: amenities.Hot_tub,
      Air_conditioning: amenities.Air_conditioning,
      Wifi: amenities.Wifi,
      Gym: amenities.Gym,
      Workspace: amenities.Workspace,
      Parking: amenities.Parking,
      Beach_Access: amenities.Beach_Access
    }

    const ratingPercentage = [
      {
        number : '5',
        perc : 65
      },
      {
        number : '4',
        perc : 20
      },
      {
        number : '3',
        perc : 10
      },
      {
        number : '2',
        perc : 5
      },
      {
        number : '1',
        perc : 0
      }
    ]

  return (
    <>
    <PropertyDetails data={card} rules={propertyRules} offers={propertyAmenities} owner={owner}/>
    <Overallreview owner={owner} ratingPercentage={ratingPercentage}/>
    <Reviews />
    <PropertyMap position = {propertyPosition}/>
    </>
  )
}

export default PropertyPage
