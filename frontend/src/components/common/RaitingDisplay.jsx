
const RatingDisplay = ({rate}) => {
  
  const fullStars = Math.floor( Number(rate))
  const decimalPart =  Number(rate) % 1
  const halfStar = decimalPart >= 0.4 && decimalPart <= 0.9 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar
  return (
    <div className="raiting_display flex justify-center items-center w-fit lg:gap-0.5">
      {[...Array(fullStars)].map((i) => (
        <img key={`full-${i}`} src="/star.svg" alt="star" />
      ))}

      {halfStar === 1 && <img src="/star_half.svg" alt="star_half" />}

      {[...Array(emptyStars)].map((i) => (
        <img key={`empty-${i}`} src="/star_out.svg" alt="star_outline" />
      ))}
    </div>
  );
};

export default RatingDisplay;
