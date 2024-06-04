import React from 'react'
import BHistoryCard from './BHistoryCard';
import { useGetLesseeReservationsQuery } from '../../features/reservations/reservationApiSlice';
import Empty from '../common/Empty'
import Loader from '../common/Loader';
function BhistoryProperties(){
    const {data: reservations, isLoading: reservationsLoading} = useGetLesseeReservationsQuery()
    console.log(reservations)
    if (reservationsLoading) return <Loader msg={"Loading"}/>
    if (reservations.length == 0) return <Empty/>
      return (
      <div className="container my-24">
        {reservations.length > 0 ? (
          <>
          <h1 className="pb-10 pt-5 md:pb-20 font-bold text-xl  ">Booking History</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">  
              {reservations.map((element, id) => (
                <BHistoryCard key={id} props={element} />
              ))}
          </div>
          </>
        ) : (
          <div className="h-screen">
            <h1 className="pb-6 font-bold text-lg md:text-xl  "> Booking History </h1>
            <h2 className="font-semibold pb-5 ">No Bookings Yet !</h2>
            <p className="lg:w-1/2 md:w-4/5 text-sm md:text-base pb-12 ">
            Seems like you haven't booked any properties yet. Why not start exploring our listings today and turn your next getaway into a reality ?
            </p>
            <button className='button md:px-6 py-3 rounded-lg bg-primary text-white  font-medium text-sm md:font-semibold w-2/5 md:w-fit '>Start booking</button>
          </div>
        )}
      </div>  
      );
    }
    

export default BhistoryProperties
