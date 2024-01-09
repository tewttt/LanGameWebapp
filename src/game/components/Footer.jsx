import React from "react";
import { FaWallet } from "react-icons/fa";
import { BsFillChatRightTextFill } from "react-icons/bs";
import go from "../../assets/game/Go 1.png"
import shield from "../../assets/game/Shield 1.png"
import back from "../../assets/game/Back 1.png"

const Footer = () => {
  return (
    <div className="h-full m-auto rounded-[30px] flex justify-around items-center w-[350px] bg-white">
      <p className="w-[84px] h-[20px] bg-baseColor text-white rounded-3xl flex justify-center items-center ">₮</p>
      <div className="flex flex-col items-center">
        <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
          <img src={shield} className="h-[40px] w-[40px]"/>
        </div>
        <p className="text-[6px] mt-1">Хамгаалах</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
          <img src={go} className="h-[40px] w-[40px]"/>
        </div>
        <p className="text-[6px] mt-1">Давших</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
          <img src={back} className="h-[50px] w-[48px]"/>
        </div>
        <p className="text-[6px] mt-1">Ухраах</p>
      </div>
      {/* <div className="flex w-[20%] justify-between items-center mx-2">
        <FaWallet size={20} className=" hover:text-baseBlue " />
        <BsFillChatRightTextFill size={20} className=" hover:text-baseBlue " />
      </div> */}
    </div>
  );
};

export default Footer;
