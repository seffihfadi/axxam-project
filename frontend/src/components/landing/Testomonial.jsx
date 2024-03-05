import RatingDisplay from "../common/RaitingDisplay"
const Testomonial = () => {
  return (
    <div className="relative bg-white shadow-md p-8 rounded-xl">
      <p>“Renting a house through AXXAM website was a breeze! The process was seamless, and the property exceeded our expectations. From booking to check-out, everything was smooth. Highly recommend! “</p>
      <div className="flex justify-between items-center pt-6 mt-6 border-t-[1px] border-gray-200">
        <div className="user">
          <div className="img">
            <img src="/bg4.jpg" alt="profile" />
          </div>
          <div className="name">
            <span>josn karlos</span>
            <p>satisfied client</p>
          </div>
        </div>
        <RatingDisplay rate={3.6} />
      </div>
      <div className="absolute h-5 z-0 top-0 left-8">
        <img className="h-full" src="/coat.svg" alt="ct" />
      </div>
    </div>
  )
}

export default Testomonial