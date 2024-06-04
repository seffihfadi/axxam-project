import PropertyCard from "./PropertyCard";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import Empty from "../common/Empty";



function Properties({ announcements, search }) {
 
  const position = [30.83, 5.11]

  const isSearch = search.length > 0 && announcements?.length > 0
  const propsClass = isSearch ? 'col-span-7 lg:col-span-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'col-span-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  if (announcements?.length == 0) return <Empty msg='No properties founded' />
  return (
    <div className="grid grid-cols-7">
      <div className={`container py-12 grid gap-5 ${propsClass}`}>
        {announcements?.map((announcement) => (
          <PropertyCard announcement={announcement} />
        ))}
      </div>
      {isSearch &&
      <div className="mt-12 hidden md:block md:col-span-2 overflow-visible w-full h-[calc(100vh-4rem)] sticky top-16">
        <MapContainer
      center={position}
      zoom={4}
      scrollWheelZoom={false}
      className="w-0 lg:w-[calc(100%+(100vw-1250px)/2)] h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {announcements.map((anno, idx) => (
        <Marker key={idx} position={anno.location.coordinates}>
          <Popup>
            <div className="flex justify-center items-center">
              <div className="rounded-full h-10 object-contain mr-2 overflow-hidden w-10">

                <img className="w-full h-full" src={anno.images[1].secure_url} alt="" />
              </div>
              <div>
                <span className="font-bold">{anno.title}</span> 
                <br /> {anno.location.name}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
      </div>}
    </div>
  );
}

export default Properties;
