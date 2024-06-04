import BookingRequests from "../components/BookingManagement/BookingRequests";
import AllBookings from "../components/BookingManagement/AllBookings"
import { useGetLessorReservationsQuery } from "../features/reservations/reservationApiSlice";
import Empty from "../components/common/Empty";
import Loader from '../components/common/Loader';

const BManagementPage = () => {
  const cards = [
    {
      image: "public/card1.jpg",
      location: "Staoueli, Algiers",
      checkin: "12 August 2022",
      checkout: "19 August 2022",
      Payment: "Completed",
    },
    {
      image: "public/card2.jpg",
      location: "Bir el djir, Oran",
      checkin: "12 August 2022",
      checkout: "19 August 2022",
      Payment: "Upcoming",
    },
    {
      image: "public/card3.jpg",
      location: "Zeralda, Algiers",
      checkin: "12 August 2022",
      checkout: "19 August 2022",
      Payment: "inprogress",
    },
    {
      image: "public/card4.jpg",
      location: "Bir el djir, Oran",
      checkin: "12 August 2022",
      checkout: "19 August 2022",
      Payment: "Completed",
    },
    {
      image: "public/card5.jpg",
      location: "Bir el djir, Oran",
      checkin: "12 August 2022",
      checkout: "19 August 2022",
      Payment: "Upcoming",
    },
    {
      image: "public/card6.jpg",
      location: "Sidi abdellah, Algiers",
      checkin: "12 August 2022",
      checkout: "19 August 2022",
      Payment: "Cancelled",
    },
  ];
  const client = [{
    name: "Samir",
    fname:"B",
    guests:3,
    checkin: "23 February",
    checkout: "73 February",
    picture: "/public/bg4.jpg",
    property:"Seaside Retreat",
  },
  {
    name: "Samir",
    fname:"B",
    guests:3,
    checkin: "23 February",
    checkout: "73 February",
    picture: "/public/bg4.jpg",
    property:"Seaside Retreat",
    
  },
  {
    name: "Samir",
    fname:"B",
    guests:3,
    checkin: "23 February",
    checkout: "73 February",
    picture: "/public/bg4.jpg",
    property:"Seaside Retreat",
  },];
  
  const {data: reservations, isLoading: reservationsLoading} = useGetLessorReservationsQuery()
    console.log(reservations)
    if (reservationsLoading) return <Loader msg={"Loading"}/>
    if (reservations.length == 0) return <Empty/>
  
  return (
    <>
   <BookingRequests client={client}/>
   <AllBookings cards={reservations}/>
    </>
  )
}

export default BManagementPage 