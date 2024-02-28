import { setAlert } from '../app/slices/alertSlice'
import Loader from '../components/common/Loader'
import Popup from '../components/common/Popup'
import ThemeToggle from '../components/common/ThemeToggle'
import { useDispatch } from 'react-redux'

const HomePage = () => {
  const dispatch = useDispatch()
  const handle = () => {
    dispatch(setAlert(['Fill in required fields', 'error']))
  }
  return (
    <>
      {/* <Popup>hi Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis possimus magnam ea voluptatem illo officia amet reiciendis tenetur dolorem obcaecati dolorum omnis ipsa molestias ad ducimus, repellat soluta quasi explicabo.</Popup> */}
      HomePage
      <ThemeToggle />
      <span class="material-symbols-outlined text-[40px] mx-2">broadcast_on_home</span>
      <span class="material-symbols-outlined text-[40px] mx-2">stadia_controller</span>
      <span class="material-symbols-outlined text-[40px] mx-2">chair</span>
      <span class="material-symbols-outlined text-[40px] mx-2">deck</span>
      <span class="material-symbols-outlined text-[40px] mx-2">mode_heat_off</span>
      {/* <Loader /> */}
      <button onClick={handle}><span class="material-symbols-outlined">in_home_mode</span>click to alert</button>
    </>
  )
}

export default HomePage