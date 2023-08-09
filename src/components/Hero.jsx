import React from "react";
import back from "../assets/img/back.jpg"
const Hero = () => {
    return (
        <div className="w-full h-[90vh]">
            <img src={back} className="w-full h-full object-cover absolute opacity-40"/>
            <div className="absolute w-full h-full flex flex-col max-w-[300px] p-4 top-[40%] justify-center items-center">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum voluptatibus sed et temporibus culpa! Harum illum maiores sequi. Reprehenderit, sunt?</p>
            </div>
        </div>
    )
}

export default Hero;