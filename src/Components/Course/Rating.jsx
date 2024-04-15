import StarRatings from "react-star-ratings"
function Rating({rating=4.5,numberofratings=5}) {
  return (
    <div  className=" flex gap-2 items-center">
        <p className=" text-yellow-100">{rating.toFixed(2)}</p>
        <StarRatings
    rating={rating}
    starRatedColor="yellow"
    numberOfStars={numberofratings}
    name='rating'
    starDimension="20px"
  />
    </div>
  )
}

export default Rating