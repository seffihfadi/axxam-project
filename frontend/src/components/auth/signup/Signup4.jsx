import { useState, useEffect } from "react";
import Popup from "../../common/Popup";
import { IoChevronBackOutline } from "react-icons/io5";
import { useUpdateAdditionalMutation } from "../../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../app/slices/alertSlice";
import { useNavigate } from "react-router-dom";

function ResizeAwareTextarea({ children }) {
  const [rows, setRows] = useState(4);
  

  function calculateRows() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
          setRows(2);
      } else if (screenWidth <= 1024) {
          setRows(3);
      } else {
          setRows(4);
      }
  }

  useEffect(() => {
      calculateRows();
      window.addEventListener('resize', calculateRows);
      return () => window.removeEventListener('resize', calculateRows);
  }, []);

  return children(rows);
}



function Signup4({ isOpen, handleClose }) {
  const [bio, setBio] = useState('')
  const [livein, setLivein] = useState('')
  const [gender, setGender] = useState('male')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [updateAdditional, { isLoading }] = useUpdateAdditionalMutation();

  const handleUpdateAdditional = async (e) => {
    e.preventDefault()
    if(!gender && !livein && !bio) return dispatch(setAlert(['add at least one field or skip for now', 'error']))
    // console.log('gender, livein, bio', gender, livein, bio)
  
    await updateAdditional({gender, livesIn: livein, bio})
      .unwrap()
      .then((payload) => {
        dispatch(setAlert([payload.message, 'success']))
        navigate('/sl')
        handleClose()
      })
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))
  
  }

  return (
    <>
      {isOpen && (
        <Popup
          children={
            <div className="window">
              <div className="w-[85%] mx-auto h-[400px] md:h-[450px] lg:h-[480px]">
                <button
                  className="absolute left-5 top-6 md:text-lg"
                >
                  <IoChevronBackOutline/>
                </button>
                <div
                  className="text-center mb-6  before:absolute before:w-full before:h-px before:bg-gray-300 dark:before:bg-gray-600 before:top-16 
                                before:left-0 font-semibold"
                >
                  Signup
                </div>
                <h1 className="text-center font-semibold text-xl md:text-2xl mt-14">
                  Additional Informations
                </h1>
                <form onSubmit={handleUpdateAdditional}>
                <div className="pt-8 lg:pt-10">
                  <div className="flex justify-between items-center gap-3">
                      <div className="flex-1" >
                        <div className="group flex-1">
                          <select onChange={(e) => setGender(e.target.value)} name="gender" id="sdf">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          <label htmlFor="sdf">Gender</label>
                        </div>
                      </div>
                      <div className="group flex-1">
                        <input
                          id="location"
                          name="location"
                          type="location"
                          onChange={(e) => setLivein(e.target.value)}
                        />
                        <label htmlFor="location">Lives in</label>
                      </div>
                  </div>
                  <ResizeAwareTextarea>
                    {(rows) => (
                        <div className="group">
                          <textarea
                            name="desc"
                            id="desc"
                            rows={rows}
                            maxLength={250}
                            onChange={(e) => setBio(e.target.value)}
                          ></textarea>
                          <label htmlFor="desc">Tell us more about yourself</label>
                        </div>
                    )}
                  </ResizeAwareTextarea>
                  
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={handleClose} className="text-gray-500 font-light text-sm md:text-base">Skip for now</button>
                      
                  <button disabled={isLoading} type="submit" className="rounded-lg bg-primary text-white font-semibold w-fit px-8 md:px-10 py-3 md:py-4">
                    Save
                  </button>
                </div>
                </form>
              </div>
            </div>
          }
        />
      )}
    </>
  );
}

export default Signup4;
