import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function AverageRating({ rating }: { rating: number }) {
    const stars = [];

    for (let i = 0; i < 10; i+=2) {
        if (i + 1.5 < rating) {
            stars.push(<FaStar key={i} color="#ffc107" />);
        } else if (i + 0.5 < rating) {
            stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
        } else {
            stars.push(<FaRegStar key={i} color="#e4e5e9" />);
        }
    }

    return (
        <>{stars} {(rating / 2).toFixed(2)}</>
    );
}