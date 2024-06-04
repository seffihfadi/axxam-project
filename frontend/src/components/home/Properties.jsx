import React from "react";
import PropertyCard from "./PropertyCard";
import { useGetAnnouncementsQuery } from "../../features/bookings/bookingsApiSlice";
import Loader from "../common/Loader";
import Empty from "../common/Empty";
import { useLocation } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";



function Properties() {
  const { search } = useLocation()
  const position = [30.83, 5.11]
  const {data: announcements, isLoading: announcementsLoading} = useGetAnnouncementsQuery(search)
  const isSearch = search.length > 0 && announcements?.length > 0
  const propsClass = isSearch ? 'col-span-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'col-span-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  if (announcementsLoading) return <Loader msg='loading' />
  if (announcements?.length == 0) return <Empty msg='No properties founded' />
  return (
    <div className="grid grid-cols-7">
      <div className={`container py-12 grid gap-5 ${propsClass}`}>
        {announcements?.map((announcement) => (
          <PropertyCard announcement={announcement} />
        ))}
      </div>
      {isSearch &&
      <div className="col-span-2 w-full h-[calc(100vh-2.5rem)] sticky top-12 overflow-hidden bg-red-500">
         <MapContainer center={position} zoom={4} scrollWheelZoom={false} className='w-full h-full'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
          <Popup>
          </Popup>
          </Marker>
        </MapContainer>
      </div>}
    </div>
  );
}

export default Properties;
