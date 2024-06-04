import { useDispatch } from 'react-redux';
import { useHandleReservationMutation } from '../../features/reservations/reservationApiSlice';
import Image from '../common/Image';
import { setAlert } from '../../app/slices/alertSlice';

function BookingRequests({ reservations }) {
  // const {data: reservations, isLoading: reservationsLoading} = useHandleReservationMutation()
  // console.log(reservations)
  const [setDecision, {isLoading}] = useHandleReservationMutation()
  const dispatch = useDispatch()

  const handleAccDel = async (decision, reservationID) => {
    // console.log('first', decision, reservationID)
    await setDecision({decision, reservationID})
      .unwrap()
      .then((payload) => dispatch(setAlert([payload.message, 'success'])))
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))
  }

  return (
    <div className='container mt-24'>
      <h1 className="pb-12 pt-3 md:pb-15 font-bold text-xl md:text-left text-center">Booking requests</h1>
      <div className="flex flex-col items-center  gap-9 ">
        {reservations.length == 0 && <div className='text-lg'>Nothing new</div>}
        {reservations.map((reservation, id) => (
          <div key={id} className='border dark:border-gray-600 md:h-[135px]  rounded-xl md:grid md:grid-cols-[1fr,6fr,3fr] p-2 overflow-hidden lg:w-[84%] '>
            <div className='flex flex-col items-center justify-center py-2'>
              <div className="w-12 aspect-square">

                <Image src={reservation.announcementDetails.images[1].secure_url} userName={reservation.clientDetails.fullname} className="w-full h-full " alt={reservation.clientDetails.fullname} />
              </div>
              <span className='font-semibold pt-2 lg:text-sm text-[10px]'>{reservation.clientDetails.fullname}</span>
            </div>
            <div className='flex flex-col justify-center pl-3'>
              <span className='text-center md:text-left pb-2'>{reservation.clientDetails.fullname} has requested to book your property '{reservation.announcementDetails.title}'.</span>
              <span className='flex justify-between md:w-4/5 w-[95%]'>
                <span className='text-secondary lg:text-[15px] text-[13px] font-light block leading-8 '>
                  Check-in: {reservation.checkin.slice(0, 10)}
                </span>
                <span className='text-secondary lg:text-[15px] text-[13px] font-light block leading-8 '>
                  Check-out: {reservation.checkout.slice(0, 10)}
                </span>
              </span>
              <span className='text-secondary lg:text-[15px] text-[13px] font-light text-center md:text-left darktxt '>
                Guests: {reservation.guests.adults + reservation.guests.infants + reservation.guests.children} guests
              </span>
            </div>
            <div className='flex items-center justify-center gap-2 pt-2 px-1 md:pt-0 md:px-0'>
              <button disabled={isLoading} onClick={() => handleAccDel('accepted', reservation._id)} className='BookingButton fixebutton bg-green-600 dark:bg-green-700 m-2 md:m-0'>Accept</button>
              <button disabled={isLoading} onClick={() => handleAccDel('rejected', reservation._id)} className='BookingButton fixebutton bg-red-500  dark:bg-red-700 text-white m-2 md:m-0'>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingRequests;
