import { resetAlert, selectCurrentAlert } from "../features/ui/alertSlice"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"

const AlertModel = () => {
  const alert = useSelector(selectCurrentAlert)
  const dispatch = useDispatch()


  useEffect(() => {
    if (alert.isVisible) {
      const timeoutId = setTimeout(() => {
        dispatch(resetAlert())
      }, 5000)

      return () => clearTimeout(timeoutId)
    }
  }, [alert.isVisible, dispatch])


  return (
    <>
    {alert.isVisible &&
      <div className={`alert ${alert.type}`}>
        {alert.type === 'error' ?
          <i className="uil uil-exclamation-octagon"></i>
          : 
          <i className="uil uil-check-circle"></i>
        }
        <p>{alert.text}</p>    
      </div>
    }
    </>
  )
}

export default AlertModel