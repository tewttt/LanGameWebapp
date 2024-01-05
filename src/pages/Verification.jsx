import React, { useState, useContext } from "react";
import Logo from "../assets/logo/Logo-Violet.png"
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  
  AiFillPhone,
  AiTwotoneMail,
} from "react-icons/ai";



export default function Verification() {
  const ctx = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  
 
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
     
     <img src={Logo} className="w-[190px] h-[80px] mb-10"/>

     
        <div className="mb-5 flex flex-row relative justify-between items-center w-[276px] h-[40px] ">
          <AiFillPhone size={20} className="text-baseColor/70 absolute ml-4" />
          <input
            className="w-full h-full text-center border border-baseColor 
            rounded-[25px] transition ease-in-out duration-200
             hover:bg-hpink/10"
            type="text"
            placeholder="Phone or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p className="text-black">Утас эсвэл имэйл дээр ирсэн кодоо оруулна уу</p>
       <button 
            onClick={verifyOtp}
            className="w-[276px] h-[40px] font-semibold text-center mt-6 bg-baseColor 
            rounded-[25px] transition ease-in-out duration-200
            text-hpink"
        >Send verification code 
       </button>
    
    </div>
  );
}


