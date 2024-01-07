import React from "react";
import img from "../../../assets/logo/Symbol White.svg"
import { useHistory } from "react-router-dom";

const Logo = () => {
    const history = useHistory()
    return (
        <div onClick={() => { history.push("/lesson")}} >
            <img  
                className="w-[40px] h-[40px] flex justify-center items-center 
                m-2 rounded-[20px] p-0 sm:w-[50px] sm:h-[50px] 
                transform transition duration-300 ease-in-out hover:scale-110" 
                            
            src={img}/>
        </div>
    )
}

export default Logo; 