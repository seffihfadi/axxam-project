import React from 'react';

const DiscountsDisplay = ({ property, numberOfDays, guests }) => {
  const discounts = [
    { type: 'Adults', value: property.reductions.adults },
    { type: 'Children', value: property.reductions.children },
    { type: 'Infants', value: property.reductions.infants }
  ];

  return (
    <>
      {discounts.map((discount) => {
        if (discount.value > 0 && guests[discount.type.toLowerCase()] > 0) {
          const discountAmount = (guests[discount.type.toLowerCase()] * (property.price / 100) * (numberOfDays - 1) * discount.value / 100).toFixed(2);
          return (
            <div key={discount.type} className="flex py-1 justify-between text-sm text-secondary items-center">
              <span>{discount.type} Discount</span>
              <span className="line-through text-yellow-500">
                -{discountAmount} DZD
              </span>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default DiscountsDisplay;
