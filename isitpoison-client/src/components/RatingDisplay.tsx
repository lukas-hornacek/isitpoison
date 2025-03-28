import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function RatingDisplay({ rating, precision }: { rating: number, precision: number }) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i + 0.75 < rating) {
            stars.push(<FaStar key={i} color="#ffc107" />);
        } else if (i + 0.25 < rating) {
            stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
        } else {
            stars.push(<FaRegStar key={i} color="#e4e5e9" />);
        }
    }

    return (
        <>{stars} {rating.toFixed(precision)}</>
    );
}