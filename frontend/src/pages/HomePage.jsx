import { setAlert } from '../app/slices/alertSlice'
import Loader from '../components/common/Loader'
import ThemeToggle from '../components/common/ThemeToggle'
import { useDispatch } from 'react-redux'

const HomePage = () => {
  const dispatch = useDispatch()
  const handle = () => {
    dispatch(setAlert(['Fill in required fields', 'error']))
  }
  return (
    <>
      HomePage
      <ThemeToggle />
      {/* <Loader /> */}
      <button onClick={handle}> oi</button>
    </>
  )
}

export default HomePage