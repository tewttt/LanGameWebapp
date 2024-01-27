import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ToolSidebar from "../../components/ToolSidebar";
import useAds from "../../hook/useAds";

import GameNavbar from "../components/GameNavbar";
const GameHome = () => { 
    const {allads} = useAds()
    const [adsId , setAdsId] = useState("")
    // console.log(adsId)
    const history = useHistory();
    return (
        <div className="">
            <ToolSidebar/>
            <div className="pt-20 flex flex-col items-center justify-between h-screen w-screen">
              
                <div className="flex flex-col h-[400px] w-[400px] border rounded-[20px] bg-hpink">
                    <GameNavbar/>
                    <div className=" rounded-xl w-[200px] m-auto p-2 text-center">
                        <p>Collect coin</p>
                        {allads.map((ads, index) => {
                            // setAdsId(ads.id)
                            const adsId = ads.id 
                            // console.log(adsId)
                            // console.log(ads)
                            return (
                                <div key={index}>
                                    <p className="text-3xl"> {allads.length}</p>
                                   
                                    <button 
                                      onClick={() =>history.push(`/watchAds/${ads.id}`)} 
                                      className="w-[150px] h-[150px] m-auto rounded-[50%] bg-baseColor text-hpink hover:bg-baseColor/80  text-[20px] p-4 border">
                                       WATCH A VIDEO
                                    </button>
                                </div>
                            )
                        })}
                       
                    </div>
                    
                </div>
               
                <button 
                    onClick={() =>history.push("/game")} 
                    className=" m-auto w-[150px] h-[150px] text-[20px] rounded-[50%] bg-baseColor text-hpink">
                    START GAME
                </button>
            </div>
        </div>
    )
}
 
export default GameHome;