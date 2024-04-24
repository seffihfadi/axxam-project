import PropertyDetails from '../components/property/PropertyDetails'
import { Rules } from '../components/common/Rules';
import { amenities } from '../components/common/Ameneties';
import Reviews from '../components/property/Reviews';
import Overallreview from '../components/property/Overallreview';
import PropertyMap from '../components/property/PropertyMap'
import { useState } from 'react';
import Comments from '../components/property/Comments';

const PropertyPage = () => {
    {/*PropertDetails */}
    const card = 
    { 
      image1: "/public/picc1-360.jpg",
      image2:"/public/card1pic1.jpg",
      image3:"/public/card1pic2.jpg",
      image4:"/public/card1pic3.jpg",
      image5:"/public/card1pic4.jpg",
      accommodation_title:"Stylish Downtown Retreat - Walk Everywhere!",
      location: "Villa with terrace in Staoueli, Algiers",
      accommodation_config: "4 guests,  3 badrooms,  3 bads,  1 bath ",
      description:"Discover urban living at its best in our chic downtown retreat. Located steps fro cafes, shops, and attractions, our cozy home offers a serene escape amidst city life. Relax in stylish comfort, cook in our fully equipped kitchen, and enjoy modern amenities including WiFi and AC. With pet-friendly options and flexible check-in,it s the perfect base for your city adventure. Book now and experience the downtown living!",
      date: "Mar 1-6",
      rating: "5.0",
      reductions:{
        adults:0,
        infants:0,
        children:0,
      },
      price:25000,
    }
    const owner = {
      name: "Ahmed",
      rate: "5.0",
      hosting: "4 months",
      reviews_nemb: "12",
      communication_rate: "5.0",
      location_rate: "5.0",
      neighbours_rate: "5.0",
      cleanliness_rate: "5.0",
      picture: "/public/bg4.jpg"
    };
    const comments=[
      {
        comment:'Wonderful location, good for 2-3 couples with children. Tastefully decorated. Great outdoor area and pool. Recommended!',
        user:'B. Salim',
        location:'Tiaret, Algeria',
        rate:'5',
        picture:'../../../public/user1.jpg',
        date:"November 2023"
      },
      {
        comment:'incredible location and views with several tavernas in proximity. The pool, terrace and garden were beautiful and well maintained, kitchen was clean and stocked. The host also runs one of the best tavernas and is just across the street. highly recommend',
        user:'M. Ismael',
        location:'Oran, Algeria',
        rate:'5',
        picture:'../../../public/user2.jpg',
        date:"July 2023"
      },
      {
        comment:'The location of the villa is very good - walking distance to the lake and many tavernas, short drive to the beach. The house is very comfortable, well equiped with all amenities. Contact person is very nice, just across the street in the taverna.',
        user:'B. Assia',
        location:'Bouira, Algeria',
        rate:'4',
        picture:'../../../public/user3.jpg',
        date:"June 2023"
      },
      {
        comment:'Lovely villa with stunning views. The pool and outdoor area were fantastic for relaxing. The interior was spacious and beautifully decorated. Convenient location with shops and restaurants nearby. Highly recommended for a family getaway.',
        user:'A. Youssef',
        location:'Constantine, Algeria',
        rate:'5',
        picture:'../../../public/user4.jpg',
        date:"September 2023"
        },
        {
        comment:'Exceptional villa with breathtaking views. The pool and garden were immaculate. The interior was tastefully furnished with all the necessary amenities. Great location with easy access to local attractions. Perfect for a relaxing holiday.',
        user:'H. Samir',
        location:'Annaba, Algeria',
        rate:'5',
        picture:'../../../public/user5.jpg',
        date:"August 2023"
        },
        {
        comment:'Fantastic villa in a picturesque location. The outdoor space was perfect for BBQs and lounging by the pool. Interior was clean, modern, and comfortable. Host was friendly and provided helpful tips for exploring the area. Would definitely return!',
        user:'R. Amira',
        location:'Batna, Algeria',
        rate:'5',
        picture:'../../../public/user6.jpg',
        date:"May 2023"
        },
        {
        comment:'Amazing villa with stunning views of the surrounding mountains. The pool area was a highlight, great for relaxing after a day of exploring. The villa itself was spacious and well-appointed. Close to amenities yet still felt private and secluded.',
        user:'S. Fatima',
        location:'Setif, Algeria',
        rate:'5',
        picture:'../../../public/user7.jpg',
        date:"April 2023"
        },
        {
        comment:'Beautiful villa in a peaceful setting. The outdoor space was perfect for our group to enjoy meals together and the pool was a refreshing escape from the heat. The interior was clean and comfortable. Excellent communication with the host throughout our stay.',
        user:'N. Ahmed',
        location:'Tebessa, Algeria',
        rate:'5',
        picture:'../../../public/user8.jpg',
        date:"March 2023"
        } 
    ]
    const propertyPosition = [36.75694627456025, 2.8524488210678105]
    
    const propertyRules = [Rules[0], Rules[1], Rules[2], Rules[3],Rules[4]];

    const propertyAmenities = {
      Hot_tub: amenities.Hot_tub,
      Air_conditioning: amenities.Air_conditioning,
      Wifi: amenities.Wifi,
      Gym: amenities.Gym,
      Workspace: amenities.Workspace,
      Parking: amenities.Parking,
      Beach_Access: amenities.Beach_Access
    }

    const ratingPercentage = [
      {
        number : '5',
        perc : 65
      },
      {
        number : '4',
        perc : 20
      },
      {
        number : '3',
        perc : 10
      },
      {
        number : '2',
        perc : 5
      },
      {
        number : '1',
        perc : 0
      }
    ]

    const [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
      setIsOpen(true);
      document.body.classList.add("popup-open");
    }

    function handleClose() {
      setIsOpen(false);
      document.body.classList.remove("popup-open");
    }

  return (
    <>
    <PropertyDetails data={card} rules={propertyRules} offers={propertyAmenities} owner={owner} handleOpen={handleOpen}/>
    <Overallreview owner={owner} ratingPercentage={ratingPercentage}/>
    <Reviews handleOpen={handleOpen} users={comments} />
    <PropertyMap position = {propertyPosition}/>
    {isOpen && <Comments handleClose={handleClose} owner={owner} comments={comments} />}
    </>
  )
}

export default PropertyPage
