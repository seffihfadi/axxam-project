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