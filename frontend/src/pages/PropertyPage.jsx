import PropertyDetails from '../components/property/PropertyDetails'
import Reviews from '../components/property/Reviews';
import Overallreview from '../components/property/Overallreview';
import PropertyMap from '../components/property/PropertyMap'
import { useState } from 'react';
import Comments from '../components/property/Comments';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { useGetPropertyQuery } from '../features/bookings/bookingsApiSlice';
import { useGetReviewsQuery } from '../features/reviews/reviewsApiSlice';

const PropertyPage = () => {

  const {propID} = useParams()
  const [isOpen, setIsOpen] = useState(false);

  const {data: property, isLoading: propertyLoading} = useGetPropertyQuery(propID)
  const {data: reviews, isLoading: reviewsLoading} = useGetReviewsQuery(propID)
  // console.log('reviews', reviews)

  
  const propertyPosition = [36.75694627456025, 2.8524488210678105]
  
  function handleOpen() {
    setIsOpen(true);
    document.body.classList.add("popup-open");
  }
  function handleClose() {
    setIsOpen(false);
    document.body.classList.remove("popup-open");
  }


  
  if (propertyLoading || reviewsLoading) return <Loader msg='loading' />

  return (
    <>
      <PropertyDetails property={property} handleOpen={handleOpen}/>
      <Overallreview rating={reviews} owner={property.owner} />
      <Reviews handleOpen={handleOpen}/>
      <PropertyMap position={property.location.coordinates}/>
      {isOpen && <Comments handleClose={handleClose}/>}
    </>
  )
}

export default PropertyPage
