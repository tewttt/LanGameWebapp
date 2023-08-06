import React from "react";
import css from "./style.module.css";
import img from "../../../assets/img/1.jpg"

const Logo = () => {
    return (
        <div >
            <img  className="w-[25px] h-[25px] flex justify-center items-center m-2 rounded-[20px] p-0
                            sm:w-[35px] sm:h-[35px]" 
                            
            src={img}/>
        </div>
    )
}

export default Logo;