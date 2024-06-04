import OwnersListings from "../components/OwnerProfile/OwnersLisings";
import OwnerDetails from "../components/OwnerProfile/OwnerDetails";
import { BsGenderMale } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { LiaPhoneSolid } from "react-icons/lia";
import { IoMailOutline } from "react-icons/io5";
import { TbLocation } from 'react-icons/tb';
const ProfilePage = () => {
    const cards = [
        {
          image: "card7.jpg",
          location: "Sidi mebrouk, Constantine",
          description: "Villa with terrace",
          date: "Mar 1-6",
          price: "25000,00",
          rating: "5.0",
        },
        {
          image: "card8.jpg",
          location: "Biskra",
          description: "Villa with swimming pool",
          date: "Mar 1-6",
          price: "25000,00",
          rating: "5.0",
        },
        {
          image: "card9.jpg",
          location: "Flifla, Skikda",
          description: "Beachfront house",
          date: "Mar 1-6",
          price: "25000,00",
          rating: "5.0",
        },
        {
          image: "card10.jpg",
          location: "Cherea, Blida",
          description: "Log cabin",
          date: "Mar 1-6",
          price: "25000,00",
          rating: "5.0",
        },
        {
          image: "card8.jpg",
          location: "Biskra",
          description: "Villa with swimming pool",
          date: "Mar 1-6",
          price: "25000,00",
          rating: "5.0",
        },
        {
          image: "card9.jpg",
          location: "Flifla, Skikda",
          description: "Beachfront house",
          date: "Mar 1-6",
          price: "25000,00",
          rating: "5.0",
        },
        {
          image: "card10.jpg",
          location: "Cherea, Blida",
          description: "Log cabin",
          date: "Mar 1-6",
          price: "25000,00",
          rating: "5.0",
        },
      ];
    const owner={
      image:"../../public/svc19.jpg",
      name:"Ahmed",
      lastname:"Benachour",
      gender:"Male",
      phonenumber:"+213 546 77 89 90",
      email:"AhmedBenachour@gmail.com",
      adress:"Algiers, douira",
      biographie:"Hi there! I'm Benachour Ahmed, a dedicated property owner in Algiers. With years of experience in real estate, I strive to offer top-notch rental experiences. From cozy apartments to spacious homes, I take pride in providing quality living spaces. Looking forward to welcoming you to one of my properties!",
    }
  
  return (
    
    <>
    <OwnerDetails  owner={owner}/>
    <OwnersListings cards={cards} owner={owner}/>
    </>
  )
}

export default ProfilePage