
const Image = ({src, alt='', className='', userName='#'}) => {
  return (
    !src 
    ? 
      <div className="w-full aspect-square text-white bg-primary rounded-full flex justify-center items-center text-lg capitalize">{userName[0]}</div> 
    : 
      <img src={src} alt={alt} className={className +"rounded-full"} />
  )
}

export default Image