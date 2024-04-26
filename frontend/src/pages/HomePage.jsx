import Filters from "../components/home/Filters";
import Properties from "../components/home/Properties";
import AdvancedSearch from "../components/home/AdvancedSearch";

const HomePage = () => {
  return (
    <>
      <AdvancedSearch/>
      <Filters />
      <Properties />
    </>
  );
};

export default HomePage;
