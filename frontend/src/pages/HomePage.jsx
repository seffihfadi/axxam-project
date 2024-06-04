import Filters from "../components/home/Filters";
import Properties from "../components/home/Properties";
import AdvancedSearch from "../components/home/AdvancedSearch";
import { useGetAnnouncementsQuery } from "../features/bookings/bookingsApiSlice";
import Loader from "../components/common/Loader";
import Empty from "../components/common/Empty";
import { useLocation } from "react-router-dom";


const HomePage = () => {
  const { search } = useLocation()
  const {data: announcements, isLoading: announcementsLoading} = useGetAnnouncementsQuery(search)

  if (announcementsLoading) return <Loader msg='loading' />

  return (
    <>
      <AdvancedSearch />
      <Filters />
      <Properties announcements={announcements} search={search} />
    </>
  );
};

export default HomePage;
