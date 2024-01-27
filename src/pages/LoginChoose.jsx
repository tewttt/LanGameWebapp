import { useContext, useState } from "react";
import React from "react";
import {useHistory} from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Logo from "../assets/logo/Logo Violet.svg"
import {AiFillPhone} from "react-icons/ai"

const LoginChoose = () => {
    const history = useHistory();

return (
    <div className="flex flex-col justify-center items-center w-screen h-screen ">
        <img src={Logo} className="w-[190px] h-[90px] mb-10"/>

        <button 
        onClick={() => {history.push("/login")}}
                className="w-[276px] px-14 h-[40px] font-semibold flex justify-start items-center my-2 bg-baseColor 
                rounded-[25px] hover:bg-baseColor/80 transition ease-in-out duration-200
                text-white"
                >
          
            <p className="">Login </p>
        </button>

        <button 
        onClick={() => {history.push("/loginPhone")}}
                className="w-[276px] px-14 h-[40px] font-semibold flex justify-start items-center my-2 bg-baseColor 
                rounded-[25px] hover:bg-baseColor/80 transition ease-in-out duration-200
                text-white"
                >
            <AiFillPhone size={18} className="mr-8"/>
            <p className="">Login Phone</p>
        </button>

        <button 
                className="flex justify-start items-center w-[276px] h-[40px] font-semibold my-2 bg-[#1877F2] 
                rounded-[25px] pl-14 transition ease-in-out duration-200 text-white hover:bg-blue-500
            ">
            <FaFacebook size={20} color="" className="mr-8"/>
            <p className="">Login Facebook</p>
        </button>
            

        <button 
                className="w-[276px] px-14 h-[40px] font-semibold flex justify-start items-center my-2 bg-[#c71610] 
                rounded-[25px] transition ease-in-out duration-200
                text-white hover:bg-red-500"
                >
            <SiGmail size={18} className="mr-8"/>
            <p className="">Login Gmail</p>
        </button>

        <button 
        onClick={() => {history.push('/signupChoose')}}
         className="w-[276px] h-[40px] font-semibold text-center mt-20 bg-hpink 
         rounded-[25px] transition ease-in-out duration-200
         text-baseColor hover:bg-pink-200"
          >
          Бүртгүүлэх
        </button>
        </div>
    
)
}
export default LoginChoose;