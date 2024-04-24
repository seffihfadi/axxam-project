import React from "react";
import PropertyCard from "./PropertyCard";

function Properties() {
  const cards = [
    {
      image: "public/card1.jpg",
      location: "Staoueli, Algiers",
      description: "Villa with terrace",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
      status: "confirmed"
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
  return (
    <div className="containerpy-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 z-30">
      {cards.map((element) => (
        <PropertyCard props={element} />
      ))}
    </div>
  );
}

export default Properties;
