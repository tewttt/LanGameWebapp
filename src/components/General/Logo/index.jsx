import React from "react";
import css from "./style.module.css";
import img from "../../../assets/img/1.jpg"
import { useHistory } from "react-router-dom";

const Logo = () => {
    const history = useHistory()
    return (
        <div onClick={() => { history.push("/lesson")}} >
            <img  className="w-[25px] h-[25px] flex justify-center items-center m-2 rounded-[20px] p-0
                            sm:w-[30px] sm:h-[30px] transform transition duration-300 ease-in-out hover:scale-110" 
                            
            src={img}/>
        </div>
    )
}

export default Logo;