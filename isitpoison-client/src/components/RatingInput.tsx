import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function RatingInput({ selected, setSelected }: { selected: number, setSelected: React.Dispatch<React.SetStateAction<number>>}) {
    const [hovered, setHovered] = useState<number | null>(null);
    
    
    const handleClick = (index: number) => {
        setSelected(index + 1);
    };
    
    return (
        <Container>
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    onMouseEnter={() => setHovered(index + 1)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleClick(index)}
                >
                    {index + 1 <= (hovered ?? selected) ? (
                        <FaStar color="#ffc107" />
                    ) : (
                        <FaRegStar color="#e4e5e9" />
                    )}
                </span>
            ))}
            {selected}
        </Container>
    );
}