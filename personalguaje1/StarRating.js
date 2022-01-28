import React ,{useState}from "react";
import { FaStar } from 'react-icons/fa';
import "App.css";

const StarRating = () => {
    const[rating ,setRating] = useState(null);
    const[hover ,setHover] = useState(null);
    const[value,setValue] = useState('')

    const onChange = (e) =>{
        console.log(e.target);
        console.log(e.target.value);
        setValue(e.target.value)
    }

    return (
        <div>
        {[...Array(5)].map((star, i) =>{
            const ratingValue = i +1;  
            return (
            <label>
                <input
                    type="radio" 
                    name='rating' 
                    onChange={onChange}
                    value={ratingValue, value}   
                    onClick={()=> setRating(ratingValue)}
                    />
                <FaStar 
                className="star" 
                color={ratingValue <= (hover || rating)?"#ffc107":"#e4e5e9"} 
                size={50}
                onMouseEnter={()=> setHover(ratingValue)}
                onMouseLeave={()=> setHover(null)}
                />               
                </label>
                
                );
            })}
        </div>
        );
};
export default StarRating;