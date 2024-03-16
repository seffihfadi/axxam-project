
export const validateGuests = (guests, maxPersons) => {
  const { adults, children, infants } = guests

  if (
        !Number.isInteger(adults) || adults < 1 ||
        !Number.isInteger(children) || children < 0 ||
        !Number.isInteger(infants) || infants < 0
    ) {
    return { 
      isValid: false, 
      message: 'guest counts must be valid non-negative integers, with at least one adult.' 
    }
  }

  const totalGuests = adults + children + infants
  if (totalGuests > maxPersons) {
    return { 
      isValid: false, 
      message: `total guest count exceeds the maximum allowed (${maxPersons}).` 
    }
  }

  return { isValid: true }
}
