import React from "react";
import { useHistory } from "react-router-dom";
import ToolSidebar from "../../components/ToolSidebar";
import useAds from "../../hook/useAds";
import moment from "moment";
import GameNavbar from "../components/GameNavbar";
import pattern from "../../assets/logo/patternWhite.png"
import { FaCoins } from "react-icons/fa";

const GameHome = () => {
    const time = new Date().getTime()
    const watchDate = moment(time).format('YYYY-MM-DD')
    const history = useHistory();
    const { filterAds} = useAds()
  
    const watch = (adsId ) => {
        history.push(`/watchAds/${adsId}`)  
    }
  
    return (
        <div className="relative flex bg-baseBlack flex-col h-screen">
            <div 
                className="bg-cover bg-center opacity-30 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
            <div className="z-30"> <ToolSidebar/></div>
           
            <div className="md:pt-20 z-20 m-6 flex flex-col h-full text-white items-center justify-between">
                <div className="flex flex-col p-4 w-full">
                    <GameNavbar/>
                    <div className="flex flex-col rounded-xl w-full m-auto p-2 text-center">
                        <p> Watch 5/{filterAds.length} video and collect coin</p>
                        {filterAds.length === 0 && <div className=" text-2xl">Today's video are over</div>}
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                            {filterAds?.map((ads, index) => {
                                return (
                                    <div key={index} className="flex flex-row">
                                        <div className="">
                                            <button 
                                            onClick={()=> watch(ads?.id)} 
                                            className="w-[100px] h-[100px] m-auto rounded-[50%] bg-baseBlue1 hover:bg-baseColor/80  text-[14px] p-4 border">
                                            WATCH A VIDEO
                                            </button> 
                                        </div>
                                    </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() =>history.push("/game")} 
                    className="w-[150px] m-14 h-[150px] text-[20px] rounded-[50%] bg-baseBlue1">
                    START GAME
                </button>
            </div>
        </div>
    )
}
 
export default GameHome;