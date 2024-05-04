import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";

const StarRating = ({initialValue, onRatingChange }) => {
  const [rating, setRating] = useState(initialValue);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="flex items-center ">
      {[...Array(5)].map((_, index) => (
        < MdOutlineStar
          key={index}
          size={24}
          onClick={() => handleRatingChange(index + 1)}
          className={`cursor-pointer ${index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-white'}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
