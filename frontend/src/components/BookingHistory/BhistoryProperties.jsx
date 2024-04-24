import React from 'react'
import BHistoryCard from './BHistoryCard';
function BhistoryProperties(){
    const cards = [
      {
        image: "public/card1.jpg",
        location: "Staoueli, Algiers",
        description: "Villa with terrace",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"accepted",
      },
      {
        image: "public/card2.jpg",
        location: "Bir el djir, Oran",
        description: "Villa with swimming pool",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"completed",
      },
      {
        image: "public/card3.jpg",
        location: "Zeralda, Algiers",
        description: "Villa with swimming pool",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"cancelled",
      },
      {
        image: "public/card4.jpg",
        location: "Bir el djir, Oran",
        description: "Villa with swimming pool",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"inprogress",
      },
      {
        image: "public/card5.jpg",
        location: "Bir el djir, Oran",
        description: "Villa with swimming pool",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"rejected",
      },
      {
        image: "public/card6.jpg",
        location: "Sidi abdellah, Algiers",
        description: "Appartement",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"pending",
      },
      {
        image: "public/card7.jpg",
        location: "Sidi mebrouk, Constantine",
        description: "Villa with terrace",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"accepted",
      },
      {
        image: "public/card8.jpg",
        location: "Biskra",
        description: "Villa with swimming pool",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"accepted",
      },
      {
        image: "public/card9.jpg",
        location: "Flifla, Skikda",
        description: "Beachfront house",
        date: "Mar 1-6",
        price: "25000,00",
        rating: "5.0",
        status:"accepted",
      },
    ];
      return (
      <div className="container my-24">
        {cards.length > 0 ? (
          <>
           <h1 className="pb-10 pt-5 md:pb-20 font-bold text-xl  ">Booking History</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">  
              {cards.map((element) => (
                <BHistoryCard key={element.id} props={element} />
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
