import React from "react";
import PropertyCard from "./PropertyCard";
import { useGetAnnouncementsQuery } from "../../features/bookings/bookingsApiSlice";
import Loader from "../common/Loader";

function Properties() {
  
  const {data: announcements, isLoading: announcementsLoading} = useGetAnnouncementsQuery()
// console.log('announcements', announcements)
  if (announcementsLoading) return <Loader msg='loading' />

  return (
    <div className="container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {announcements.map((announcement) => (
        <PropertyCard announcement={announcement} />
      ))}
    </div>
  );
}

export default Properties;
