import React ,{useState}from "react";
import { FaStar } from 'react-icons/fa';
import "App.css";

const Star = (props) => {
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const rating =getRandom(1,5)
    return (
        <div>
        {[...Array(5)].map((star, i) =>{
            const ratingValue = i +1;  
            return (
            <label>
                <FaStar 
                className="star" 
                color={ratingValue <= (rating)?"#ffc107":"#e4e5e9"} 
                size={50}
                />   
                &nbsp;     
                </label>
                );
            })}
        </div>
        );
};

export default Star;