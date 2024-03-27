import { setAlert } from '../app/slices/alertSlice'
import Loader from '../components/common/Loader'
import Popup from '../components/common/Popup'
import ThemeToggle from '../components/common/ThemeToggle'
import { useDispatch } from 'react-redux'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import SearchBar from '../components/landing/SearchBar'
import Filters from '../components/home/Filters'
import PropertyCard from '../components/home/PropertyCard'
import Properties from '../components/home/Properties'


const HomePage = () => {
  
  
  return (
    <>
    <Filters/>
    <Properties/>
    </>
  )
}

export default HomePage