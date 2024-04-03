import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

function PropertyMap({position}) {
  return (
  <div className='container'>
    <div className='border-t border-t-gray-300 dark:border-t-gray-600 py-10 my-5 h-[90vh] mb-24'>
      <h1 className='font-bold text-xl my-5 '>Where you will be.</h1>
      {/*map*/}
      <MapContainer center={position} zoom={16} scrollWheelZoom={false} className='w-full h-full mt-6'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>
  )
}

export default PropertyMap

