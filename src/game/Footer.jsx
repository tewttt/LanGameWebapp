import React from "react";
import {FaWallet} from "react-icons/fa";
import {BsFillChatRightTextFill} from "react-icons/bs"
const Footer = () => {
    return (
        <div className=" h-[30px] flex justify-between items-center">
            <div>
                ggg
            </div>
            <div className="flex w-[20%] justify-between items-center mx-2">
                <FaWallet size={20} className=" hover:text-baseBlue "/>
                <BsFillChatRightTextFill size={20} className=" hover:text-baseBlue "/>
            </div>
          
        </div>
    )
}

export default Footer;