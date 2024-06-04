import OwnersListings from "../components/OwnerProfile/OwnersLisings";
import OwnerDetails from "../components/OwnerProfile/OwnerDetails";
import { BsGenderMale } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { LiaPhoneSolid } from "react-icons/lia";
import { IoMailOutline } from "react-icons/io5";
import { TbLocation } from 'react-icons/tb';
import { useGetUserIdQuery } from "../features/user/userApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader";



const ProfilePage = () => {

  const {userID} = useParams()
  const {data: owner, isLoading: ownerIsLoading} = useGetUserIdQuery(userID)
  console.log(owner)
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
      
    if (ownerIsLoading) return <Loader msg="Loading"/>
    else{
      return (
        <>
        <OwnerDetails  owner={owner}/>
        <OwnersListings cards={cards} owner={owner}/>
        </>
      ) 
    }
}

export default ProfilePage