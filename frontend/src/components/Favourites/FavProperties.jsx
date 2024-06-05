import React from "react";
import FavPropertiesCard from "./FavPropertiesCard";
import { selectCurrentUser } from "../../app/slices/authSlice";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import { Link } from "react-router-dom";
function FavProperties(){

  const user = useSelector(selectCurrentUser)
  console.log('user', user?.extra?.saved.length)
  const cards = [
    {
      image: "public/card1.jpg",
      location: "Staoueli, Algiers",
      description: "Villa with terrace",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card2.jpg",
      location: "Bir el djir, Oran",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card3.jpg",
      location: "Zeralda, Algiers",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card4.jpg",
      location: "Bir el djir, Oran",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card5.jpg",
      location: "Bir el djir, Oran",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card6.jpg",
      location: "Sidi abdellah, Algiers",
      description: "Appartement",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card7.jpg",
      location: "Sidi mebrouk, Constantine",
      description: "Villa with terrace",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card8.jpg",
      location: "Biskra",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card9.jpg",
      location: "Flifla, Skikda",
      description: "Beachfront house",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card10.jpg",
      location: "Cherea, Blida",
      description: "Log cabin",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card11.jpg",
      location: "Ain-el-turk, Oran",
      description: "Villa with terrace",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card12.jpg",
      location: "Seraidi, Annaba",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
  ];

    if (!user) return <Loader msg={'load favorites'} />
    return (
    <div className="container my-24">
      {user?.extra?.saved.length > 0 ? (
        <>
        <h1 className="pb-12 pt-3 md:pb-20 font-bold text-xl">Favorite properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">  
            {user?.extra?.saved.map((element) => (
              <Link to={'/property/'+element._id} >
                <FavPropertiesCard key={element.id} props={element} />
              </Link>
            ))}
        </div>
        </>
      ) : (
        <div className="h-screen">
          <h1 className="md:pb-6 pb-3 font-bold text-lg md:text-xl">Favorite properties</h1>
          <h2 className="font-semibold pb-2 ">Create your first wishlist</h2>
          <p className="lg:w-1/2 md:w-4/5 text-sm md:text-base ">
            As you search, click the heart to save your favorite places and experiences to a wishlist.
          </p>
        </div>
      )}
    </div>  
    );
  }
  

export default FavProperties
