import HeroSection from "../components/landing/HeroSection"
import SectionOne from "../components/landing/SectionOne"
import SectionTwo from "../components/landing/SectionTwo"
import Testomonials from "../components/landing/Testomonials"
import Features from "../components/landing/Features"
const LandingPage = () => {
  const sectionOne = {
    imgUrl1: '/bg4.jpg',
    imgUrl2: '/bg2.jpg',
    imgUrl3: '/bg1.jpg',
    span: 'Who we are',
    title: 'We offer property renting for individuals or falimies with amazing prices',
    desc: 'If you are searching for a seamless rental process, look no further. At AXXAM, we are dedicated to simplifying your property search and ensuring you find the perfect home to fit your lifestyle.',
    btntext: 'Learn More'
  }

  const sectionTwo = {
    imgUrl1: '/bg2.jpg',
    imgUrl2: '/bg1.jpg',
    imgUrl3: '/bg4.jpg',
    span: 'Be an owner',
    title: 'Are you looking to rent out your property or find tenants ?',
    desc: 'Click "JOIN US" to start your journey towards hassle-free renting and make the most of your rental income today!',
    btntext: 'Join us'
  }

  const sectionThree = {
    imgUrl1: '/bg2.jpg',
    imgUrl2: '/bg4.jpg',
    span: 'Benefits',
    title: 'Why Choose us ?',
    desc: 'AXXAM is your perfect place to find your perfect experience in renting houses with quality, calm and peace.',
    points: [
      'Escape to serene properties for tranquility',
      'Enjoy expedited service for seamless stays',
      'Relax in carefully selected havens',
      'Swift service ensures seamless experiences',
      'Unwind effortlessly with our hassle-free hospitality'
    ]
  }
  return (
    <>
      <HeroSection />
      <Features />
      <SectionOne data={sectionOne} />
      <SectionOne data={sectionTwo} rtl />
      <SectionTwo data={sectionThree} />
      <Testomonials />

    </>
  )
}

export default LandingPage