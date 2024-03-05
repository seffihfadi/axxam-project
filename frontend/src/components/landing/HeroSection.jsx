

const HeroSection = () => {
  return (
    <>
      <div className="h-[calc(100vh-4rem)] mt-10"></div>
      <div className="w-full absolute top-16 left-0 h-[calc(100vh-4rem)]">
        <img className="w-full h-full" src="/bg2.jpg" alt="" />
      </div>
      <div className="backdrop px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl text-center">Let’s Find a Home That’s Perfect For You</h1>
        <p className="my-8 max-w-xl text-center text-lg">Excited to find your perfect rental home. Click 'Discover More' and start exploring now!</p>
        <button className="primary">Discover more</button>
      </div>
    </>
  )
}

export default HeroSection