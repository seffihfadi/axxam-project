export const strToBool = (str) => {
  const map = { 'true': true, 'false': false }
  if (str in map) {
    return map[str]
  }
  throw new Error('input must be "true" or "false".')
}

export const isPhone = (str) => {
  return /^0[5-7]\d{8}$/.test(str)
}

export const getPublicIDFromUrl = (url) => {
  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  const publicId = filename.split('.')[0] 
  return publicId
}



export const calculateTotalPrice = (days, announcement, guests) => {
   
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
  return totalAdultPrice + totalChildrenPrice + totalInfantsPrice
}
