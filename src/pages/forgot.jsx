import React, { useState, useContext } from "react";
import Logo from "../assets/logo/Typo Logo SVG Blue.svg";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import {
  AiFillPhone,
} from "react-icons/ai";
import backImage from "../assets/logo/backgroundSmall.png"

export default function Forgot() {
  const ctx = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("curlets1123@gmail.com");
 
  return (
    <div className="flex relative text-baseBlack flex-col justify-center items-center w-screen h-screen">
      <div 
        className="bg-cover absolute top-0 left-0 -z-10 opacity-90 w-screen h-screen"
        style={{backgroundImage: `url(${backImage})`}}>
      </div>
     <img src={Logo} className="w-[300px] h-[100px] mb-10"/>   
        <div className="mb-5 flex flex-row relative justify-between items-center w-[276px] h-[40px] ">
          <AiFillPhone size={20} className="text-baseBlue1 absolute ml-4" />
          <input
            className="w-full h-full text-center border border-baseBlue1 
            rounded-[25px] transition ease-in-out duration-200
             hover:bg-blue-700"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
       <button 
          className="w-[276px] h-[40px] font-semibold text-center mt-6 bg-baseBlue1 
          rounded-[25px] text-white transition ease-in-out duration-200
          "
          onClick={() => ctx.forgotPassword(email)}
        >Reset password
        </button>
        <button 
          className="w-[276px] h-[40px] font-semibold text-center mt-6 bg-helpGray 
          rounded-[25px] transition ease-in-out duration-200 hover:bg-gray-200"
          onClick={() => history.push("/login")}
        >Back
        </button>
    
    </div>
  );
}


