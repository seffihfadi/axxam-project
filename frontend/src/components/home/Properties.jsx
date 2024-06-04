import PropertyCard from "./PropertyCard";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";



function Properties({ announcements, search }) {
 
  const position = [30.83, 5.11]

  const isSearch = search.length > 0 && announcements?.length > 0
  const propsClass = isSearch ? 'col-span-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'col-span-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

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
