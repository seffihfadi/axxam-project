function getPublicIDFromUrl(url) {
    const parts = url.split('/')
    const filename = parts[parts.length - 1]
    const publicId = filename.split('.')[0] 
    return publicId
  }
export default getPublicIDFromUrl