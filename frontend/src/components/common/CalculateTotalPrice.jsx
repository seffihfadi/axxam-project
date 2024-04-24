export const CalculateTotalPrice = ({days, announcement, guests}) => {
  console.log(days);
  console.log(announcement);
  console.log(guests)
  const longStayDiscounts = {
    15: 0.05,
    30: 0.10, 
    90: 0.15, 
    180: 0.20,
  }
  
  let discountRate = 0;
  Object.keys(longStayDiscounts).forEach((threshold) => {
    if (days > parseInt(threshold)) {
      discountRate = longStayDiscounts[threshold]
    }
  })
  const discountedBasePricePerDay = announcement.price * (1 - discountRate)
  const basePrice = days * discountedBasePricePerDay
  const totalAdultPrice = basePrice * guests.adults * (1 - (announcement.reductions.adults / 100))
  const totalChildrenPrice = basePrice * guests.children * (1 - (announcement.reductions.children / 100))
  const totalInfantsPrice = basePrice * guests.infants * (1 - (announcement.reductions.infants / 100))
  // console.log('totalInfantsPrice', totalAdultPrice, guests.adults)
  console.log('base',basePrice, 'ad', totalAdultPrice, 'ch', totalChildrenPrice,'in', totalInfantsPrice)
  return (
    <span>
      {totalAdultPrice + totalChildrenPrice + totalInfantsPrice}
    </span>
  )
}