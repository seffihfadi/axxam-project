import React from 'react';

const LongStayDiscount = ({ days, originalPrice }) => {
  const longStayDiscounts = {
    15: 0.05,
    30: 0.10, 
    90: 0.15, 
    180: 0.20,
  };

  // Function to calculate the discount and the amount removed
  const getDiscountDetails = () => {
    let discountRate = 0;

    // Determine the maximum applicable discount
    for (let key of Object.keys(longStayDiscounts).reverse()) {
      if (days >= key) {
        discountRate = longStayDiscounts[key];
        break;
      }
    }

    if (discountRate > 0) {
      const discountAmount = originalPrice * discountRate;
      return {
        discounted: true,
        discountAmount: discountAmount.toFixed(2)
      };
    }

    return {
      discounted: false,
      discountAmount: 0
    };
  };

  const { discounted, discountAmount } = getDiscountDetails();

  return (
    <>
    {discounted &&
      <div className="flex py-2 justify-between text-sm text-secondary items-center">
        <span>Long stay discount</span>
        <span className="line-through text-green-500">
          -{discountAmount} DZD
        </span>
      </div>
    }
    </>
  );
};

export default LongStayDiscount;
