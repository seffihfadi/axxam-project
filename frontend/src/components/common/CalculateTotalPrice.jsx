export const CalculateTotalPrice = ({days, announcement, guests}) => {
 
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
  const totalAdultPrice = basePrice * guests.Adults * (1 - (announcement.reductions.adults / 100))
  const totalChildrenPrice = basePrice * guests.Children * (1 - (announcement.reductions.children / 100))
  const totalInfantsPrice = basePrice * guests.Infants * (1 - (announcement.reductions.infants / 100))
  // console.log('totalInfantsPrice', totalAdultPrice, guests.adults)
  // console.log('first', totalAdultPrice + totalChildrenPrice + totalInfantsPrice)
  return <span>{(totalAdultPrice + totalChildrenPrice + totalInfantsPrice) / 100},00</span>
}