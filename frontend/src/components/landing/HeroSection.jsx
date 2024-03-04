

const HeroSection = () => {
  return (
    <>
      <div className="h-[calc(100vh-4rem)] mt-10 bg-green-800"></div>
      <div className="w-full absolute top-16 left-0 h-[calc(100vh-4rem)] bg-red-400">
        <img className="w-full h-full object-cover" src="/bg1.jpg" alt="" />
      </div>
      <div className="backdrop">
        <h1 className="text-6xl font-semibold max-w-4xl text-center">Let’s Find a Home That’s Perfect For You</h1>
        <p className="my-8 max-w-xl text-center text-xl">Excited to find your perfect rental home? Click 'Discover More' and start exploring now!</p>
        <button className="primary">Discover more</button>
      </div>
    </>
  )
}

export default HeroSection