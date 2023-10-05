import React from "react";
import {FaWallet} from "react-icons/fa";
import {BsFillChatRightTextFill} from "react-icons/bs"
import Tools from "./Tools";

const Footer = () => {
    return (
        <div className=" h-[30px] flex justify-between items-center w-full">
            
            <Tools/>
            
            <div className="flex w-[20%] justify-between items-center mx-2">
                <FaWallet size={20} className=" hover:text-baseBlue "/>
                <BsFillChatRightTextFill size={20} className=" hover:text-baseBlue "/>
            </div>
          
        </div>
    )
}

export default Footer;