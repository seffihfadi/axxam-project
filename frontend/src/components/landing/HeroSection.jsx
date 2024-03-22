import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <>
      <section id="hero" className="min-h-screen">
        <div className="hero-content w-full flex-col z-10 flex justify-center items-center sm:px-4 pt-44 relative pb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl text-center">
            Let’s Find a Home That’s Perfect For You
          </h1>
          <p className="my-8 max-w-xl text-center text-lg">
            Excited to find your perfect rental home. Click 'Discover More' and
            start exploring now!
          </p>
          <button className="primary">Discover more</button>
          <SearchBar />
        </div>
      </section>
    </>
  );
};

export default HeroSection;



