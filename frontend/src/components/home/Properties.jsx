import React from "react";
import PropertyCard from "./PropertyCard";

function Properties() {
  const cards = [
    {
      image: "public/card1.png",
      location: "Staoueli, Algiers",
      description: "Villa with terrace",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card2.png",
      location: "Bir el djir, Oran",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card3.png",
      location: "Zeralda, Algiers",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card4.png",
      location: "Bir el djir, Oran",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card5.png",
      location: "Bir el djir, Oran",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card6.png",
      location: "Sidi abdellah, Algiers",
      description: "Appartement",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card7.png",
      location: "Sidi mebrouk, Constantine",
      description: "Villa with terrace",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card8.png",
      location: "Biskra",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card9.png",
      location: "Flifla, Skikda",
      description: "Beachfront house",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card10.png",
      location: "Cherea, Blida",
      description: "Log cabin",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card11.png",
      location: "Ain-el-turk, Oran",
      description: "Villa with terrace",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "public/card12.png",
      location: "Seraidi, Annaba",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
  ];
  return (
    <div className="container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((element) => (
        <PropertyCard props={element} />
      ))}
    </div>
  );
}

export default Properties;
