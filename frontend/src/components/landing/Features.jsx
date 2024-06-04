import PropertyCard from "../home/PropertyCard";
import { useGetAnnouncementsQuery } from "../../features/bookings/bookingsApiSlice";
import { Link } from "react-router-dom";

 function Features() {
  const {data: announcements, isLoading: announcementsLoading} = useGetAnnouncementsQuery('')
  console.log(announcements);
if(announcementsLoading){
  return <div>loading</div>
}
  const cards = [
    {
      image: "/cardl1.svg",
      location: "Staoueli, Algiers",
      description: "Villa with swiming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "/cardl2.svg",
      location: "Bir el djir, Oran",
      description: "Villa with swimming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },{
      image: "/cardl3.svg",
      location: "Ain-el-turk, Oran",
      description: "Villa with swiming pool",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
    {
      image: "/cardl4.svg",
      location: "Seraidi, Annaba",
      description: "Villa with terrace",
      date: "Mar 1-6",
      price: "25000,00",
      rating: "5.0",
    },
  ];


  return (
    <div className=" mt-20">
    
      <div className=" flex flex-col  md:flex md:flex-row justify-between  z-0">
            <div>
              <p className="font-bold text-2xl ">Discover Our Featured<br/> Properties</p>
              <p className=" font-medium text-sm text-[#6D6D6D] mt-3">Discover best deals for your future rent.</p>
            </div>
        
            <Link to={"/sl"}
             className=" w-[140px] h-[40px] mt-5 lg:mt-0   shadow-sm shadow-[#6D6D6D] element-center font-medium  rounded-full ">
             See more 
            </Link>
                    
                 
     </div>
            <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {announcements.slice(0,4).map((element) => (
              <div>
                <PropertyCard announcement={element} />
              </div>
            ))}
            </div>
      
     </div>
  )
}
export default Features;