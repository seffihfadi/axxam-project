import User from '../models/User.js'

export const incrementPoints = async (lessorID, incAmount) => {

  const lessor = await User.findById(lessorID).populate('extra')
  let currentPoints = lessor.extra.points
  currentPoints += incAmount
  lessor.extra.points = currentPoints
  await lessor.extra.save()
  
}

export const appFeeBasedinPoints = async (lessorID) => {
  const lessor = await User.findById(lessorID).populate('extra')
  let currentPoints = lessor.extra.points
  let currentExtrema = lessor.extra.pointsExtrema

  if (currentPoints >= currentExtrema) {
    currentPoints = currentPoints - currentExtrema
    currentExtrema += 500
    lessor.extra.points = currentPoints
    lessor.extra.pointsExtrema = currentExtrema
    await lessor.extra.save()
    return 0
  }

  return 0.1
}