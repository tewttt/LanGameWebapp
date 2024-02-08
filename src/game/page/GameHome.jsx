import React from "react";
import { useHistory } from "react-router-dom";
import ToolSidebar from "../../components/ToolSidebar";
import useAds from "../../hook/useAds";
import moment from "moment";
import GameNavbar from "../components/GameNavbar";
import backImage from "../../assets/logo/backgroundSmall.png"

const GameHome = () => {
    const time = new Date().getTime()
    const watchDate = moment(time).format('YYYY-MM-DD')
    const history = useHistory();
    const { filterAds} = useAds()
  
    const watch = (adsId ) => {
        history.push(`/watchAds/${adsId}`)
    }
    // console.log(filterAds.length === 0)
    return (
        <div className="relative bg-baseBlack">
            <ToolSidebar/>
            <div 
                className="bg-cover absolute top-0 left-0 -z-20 opacity-60 w-screen h-screen"
                style={{backgroundImage: `url(${backImage})`}}>
            </div>
            <div className="pt-20 flex flex-col items-center justify-between h-screen w-screen">
                <div className="flex flex-col h-[400px] w-[400px] border rounded-[20px] bg-hpink">
                    <GameNavbar/>
                    <div className="flex flex-col rounded-xl w-full m-auto p-2 text-center">
                        <p> Watch 5/{filterAds.length} video and collect coin</p>
                        {filterAds.length === 0 && <div className="bg-hpink text-2xl">Today's video are over</div>}
                        <div className="flex flex-wrap justify-center">
                            {filterAds?.map((ads, index) => {
                                return (
                                    <div key={index} className="flex flex-row">
                                        <div className="">
                                            <button 
                                            onClick={()=> watch(ads?.id)} 
                                            className="w-[120px] h-[120px] m-auto rounded-[50%] bg-baseColor text-hpink hover:bg-baseColor/80  text-[14px] p-4 border">
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
                    className=" m-auto w-[150px] h-[150px] text-[20px] rounded-[50%] bg-baseColor text-hpink">
                    START GAME
                </button>
            </div>
        </div>
    )
}
 
export default GameHome;