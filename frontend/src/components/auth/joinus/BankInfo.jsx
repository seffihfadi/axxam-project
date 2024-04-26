
import Popup from "../../common/Popup";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../../app/slices/authSlice";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useJoinUsMutation } from "../../../features/auth/authApiSlice";
import { setAlert } from "../../../app/slices/alertSlice";


function BankInfo({ isOpen, handleClose }) {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const stripe = useStripe()
  // const navigate = useNavigate()
  const [accountHolderName, setAccountHolderName] = useState(user.fullname);
  const [accountNumber, setAccountNumber] = useState('00001234567890123456');
  const [email, setEmail] = useState(user.fullname+'@email.domain');
  const [routingNumber, setRoutingNumber] = useState('AAAADZDZXXX');
  const [accountHolderType, setAccountHolderType] = useState('individual');

  const [joinUs, {isLoading}] = useJoinUsMutation()

  const handleBank = async (event) => {
    event.preventDefault();

    const bankAccountDetails = {
        country: 'DZ',
        currency: 'dzd',
        account_holder_name: accountHolderName,
        account_holder_type: accountHolderType,
        routing_number: routingNumber,
        account_number: accountNumber,
    };

    stripe.createToken('bank_account', bankAccountDetails).then(({token, error}) => {
        if (error) {
          dispatch(setAlert([error.message, 'error']))
        } else {
          console.log('Bank account token:', token.id);
          // Send the token to your server
          submitBankAccountToken(token.id);
        }
    })
  }

  const submitBankAccountToken = async (tokenId) => {
    console.log('tokenId submitBankAccountToken', tokenId)
    await joinUs({token: tokenId, email})
      .unwrap()
      .then((payload) => {
        dispatch(setAlert([payload.message, 'success']))
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
                  Join Us
                </div>
                <h1 className="text-center font-semibold text-xl md:text-2xl mb-8 mt-14">
                  Your Bank Information
                </h1>
                <form onSubmit={handleBank}>
                  

                  <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    <div className="group col-span-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required={true}
                        value={accountHolderName} 
                        onChange={(e) => setAccountHolderName(e.target.value)}
                      />
                      <label htmlFor="name">Account Holder Name</label>
                    </div>
                    <div className="group col-span-1">
                      <select value={accountHolderType} name='holdertype' onChange={(e) => setAccountHolderType(e.target.value)}>
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                      </select>
                      <label htmlFor="holdertype">Account Holder Type</label>
                    </div>
                  </div>
                  <div className="group">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required={true}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Your Email</label>
                  </div>
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                    <div className="group col-span-1">
                      <input
                        id="anumber"
                        name="anumber"
                        type="text"
                        required={true}
                        value={accountNumber} 
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                      <label htmlFor="anumber">Account Number</label>
                    </div>
                    <div className="group col-span-1">
                      <input
                        id="rnumber"
                        name="rnumber"
                        type="text"
                        required={true}
                        value={routingNumber} 
                        onChange={(e) => setRoutingNumber(e.target.value)}
                      />
                      <label htmlFor="rnumber">Routing Number</label>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                      
                  <button type="submit" disabled={isLoading} className="rounded-lg bg-primary ml-auto text-white font-semibold w-fit px-8 md:px-10 py-3 md:py-4">
                    Join
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

export default BankInfo;
