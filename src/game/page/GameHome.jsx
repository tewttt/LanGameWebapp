import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ToolSidebar from "../../components/ToolSidebar";

import GameNavbar from "../components/GameNavbar";
const GameHome = () => { 
    const history = useHistory();
    return (
        <div className="text-white">
            <ToolSidebar/>
            <div className="pt-20 flex flex-col">
               <GameNavbar/>
                <div className="w-[200px] mt-20 flex flex-col justify-center items-center h-[200px] border border-blue-400 m-auto">
                    <button onClick={() =>history.push("/watchAds")} className="w-20 h-20 border border-red-500 m-4">video watch </button>
                    <div>coin цуглуулах</div>
                </div>
               
                <button onClick={() =>history.push("/game")} className="mt-20">start</button>
            </div>
        </div>
    )
}
 
export default GameHome;