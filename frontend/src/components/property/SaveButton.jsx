
import { useSavePropertyMutation } from '../../features/bookings/bookingsApiSlice';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../app/slices/alertSlice';
import { CiHeart } from "react-icons/ci";


const SaveButton = ({ className, propID, isSaved, text = false }) => {
  
  const dispatch = useDispatch()
  const [saveProp, {isLoading: saveLoading}] = useSavePropertyMutation()


  console.log('isSaved', isSaved)
  const handleSave = async () => {
    await saveProp(propID)
      .unwrap()
      .then((payload) => dispatch(setAlert([payload.message, 'success'])))
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))
  }
  return (
    <button disabled={saveLoading} onClick={handleSave} className={className + ` flex items-center justify-center ${text ? 'gap-1' : 'rounded-full w-8 aspect-square bg-[#333333d0] '} ${isSaved ? 'saved' : ''}`}> 
      <span className={`material-symbols-outlined ${text ? '' : 'text-white'}`}>
        {isSaved ? 'heart_minus' : 'heart_plus'}
      </span>
      {text && <span className={`text-base`}>{isSaved ? 'unsave' : 'save'}</span>}
      
    </button>
  )
}

export default SaveButton