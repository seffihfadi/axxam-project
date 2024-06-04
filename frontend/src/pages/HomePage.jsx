import Filters from "../components/home/Filters";
import Properties from "../components/home/Properties";
import AdvancedSearch from "../components/home/AdvancedSearch";

const HomePage = () => {
  return (
    <>
      {/* <div className="mt-20 relative"> */}
      <AdvancedSearch />
      <Filters />
      {/* </div> */}
      <Properties />
    </>
  );
};

export default HomePage;
