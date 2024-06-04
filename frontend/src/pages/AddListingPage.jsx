import AddListing from "../components/PropertyManagement/AddListing"
import ListingDetails from "../components/PropertyManagement/ListingDetails"
import { Rules } from '../components/common/Rules';
const AddListingPage = () => {
  const propertyRules = [Rules.rule1, Rules.rule2, Rules.rule3, Rules.rule4,Rules.rule5];
  
  return (
    <>
   <AddListing/>
   <ListingDetails propertyRules={propertyRules}/>
    </>
  )
}

export default AddListingPage