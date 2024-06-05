import OwnersListings from "../components/OwnerProfile/OwnersLisings";
import OwnerDetails from "../components/OwnerProfile/OwnerDetails";
import { BsGenderMale } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { LiaPhoneSolid } from "react-icons/lia";
import { IoMailOutline } from "react-icons/io5";
import { TbLocation } from 'react-icons/tb';
import { useGetUserIdQuery } from "../features/user/userApiSlice";
import { useParams } from "react-router-dom";
import { useGetLessorAnnouncementsQuery } from "../features/bookings/bookingsApiSlice";
import Loader from "../components/common/Loader";



const ProfilePage = () => {

  const {userID} = useParams()
  const {data: owner, isLoading: ownerIsLoading} = useGetUserIdQuery(userID)
  const {data: announcements, isLoading: announcementsLoading} = useGetLessorAnnouncementsQuery(userID)
  // console.log(owner)
  // console.log(announcements)
    

    if (ownerIsLoading || announcementsLoading) return <Loader msg="Loading"/>
    else{
      return (
        <>
        <OwnerDetails  owner={owner}/>
        <OwnersListings cards={announcements} owner={owner}/>
        </>
      ) 
    }
}

export default ProfilePage