import React, { useState, useContext } from "react";
import ToolSidebar from "../components/ToolSidebar";
import pattern from "../assets/logo/patternWhite.png"

  const Settings = () => {
 
  return (
    <div className="relative flex bg-baseBlack flex-col pt-6 px-6 pb-96 md:p-0 text-white">
        <div 
                className="bg-cover bg-center opacity-10 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
        <div className="z-30"> <ToolSidebar/> </div>

        <div className="z-20 flex flex-col items-center md:pt-20 h-[800px]">
          <p>Нууц үг солих</p>
          <p>Утас баталгаажуулах</p>
          <p>notification sound </p>
        </div>
    
    </div>
  );
}
export default Settings;


