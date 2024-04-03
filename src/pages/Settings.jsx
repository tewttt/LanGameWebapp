import React, { useState, useContext } from "react";
import ToolSidebar from "../components/ToolSidebar";
import pattern from "../assets/logo/patternWhite.png"
import { useHistory ,useParams} from "react-router-dom";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

  const Settings = () => {
    const history = useHistory();
 
  return (
    <div className="relative flex bg-baseBlack flex-col pt-6 px-6 pb-96 md:p-0 text-white">
        <div 
                className="bg-cover bg-center opacity-10 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
        <div className="z-30"> <ToolSidebar/> </div>
        <div className="flex py-2 justify-between pb-4 w-full">
                    <div className="flex items-center">
                        <IoIosArrowBack size={20} onClick={() => history.push("/lesson")}/>
                        <p>Settings</p>
                    </div>
                   
                </div>

        <div className="z-20 flex flex-col items-center md:pt-20 h-[800px]">
     
          {/* <p>Нууц үг солих</p> */}
          
          {/* <p>notification sound </p> */}
        </div>
    
    </div>
  );
}
export default Settings;


