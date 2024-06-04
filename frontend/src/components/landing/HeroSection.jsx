
import AdvancedSearch from "../home/AdvancedSearch";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section id="hero" className="min-h-screen">
        <div className="hero-content w-full flex-col z-10 flex justify-center items-center sm:px-4 pt-44 relative pb-10 mb-80 md:mb-28">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-4xl text-center">
            Let’s Find a Home That’s Perfect For You
          </h1>
          <p className="my-8 max-w-xl text-center text-lg">
            Excited to find your perfect rental home. Click 'Discover More' and
            start exploring now!
          </p>
          <Link to={'/sl'}><button className="rounded-lg bg-primary ml-auto text-white font-semibold w-fit px-8 md:px-10 py-3 md:py-4">Discover more</button></Link>
        </div>
        <AdvancedSearch/>
      </section>
    </>
  );
};

export default HeroSection;
