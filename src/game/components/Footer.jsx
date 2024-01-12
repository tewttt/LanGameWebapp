import React from "react";
import go from "../../assets/game/Go 1.png"
import shield from "../../assets/game/Shield 1.png"
import back from "../../assets/game/Back 1.png"

const Footer = ({currentUser}) => {
  // console.log(currentUser)
  return (
    <div className="h-full m-auto rounded-[30px] flex justify-around items-center w-[350px] bg-white">
      
      <div className="flex flex-col items-center relative">
        <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
          <img src={shield} className="h-[40px] w-[40px]"/>
        </div>
        <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
          {currentUser?.shield}
        </div>
      </div>
      
      <div className="flex flex-col items-center relative">
        <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
          <img src={go} className="h-[40px] w-[40px]"/>
        </div>
        <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
          {currentUser?.go}
        </div>
      </div>

      <div className="flex flex-col items-center relative">
        <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
          <img src={back} className="h-[50px] w-[48px]"/>
        </div>
        <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
          {currentUser?.back}
        </div>
      </div>
    
    </div>
  );
};

export default Footer;
