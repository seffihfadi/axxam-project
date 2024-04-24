import AddListing from "../components/PropertyManagement/AddListing"
import ListingDetails from "../components/PropertyManagement/ListingDetails"
import { Rules } from '../components/common/Rules';
const AddListingPage = () => {
  const propertyRules = [Rules[0], Rules[1], Rules[2], Rules[3],Rules[4]];
  
  return (
    <>
   <AddListing/>
   <ListingDetails propertyRules={propertyRules}/>
    </>
  )
}

export default AddListingPage