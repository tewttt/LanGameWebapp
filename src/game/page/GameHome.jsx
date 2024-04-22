import React,{useContext} from "react";
import { useHistory } from "react-router-dom";
import ToolSidebar from "../../components/ToolSidebar";
import useAds from "../../hook/useAds";
import moment from "moment";
import GameNavbar from "../components/GameNavbar";
import pattern from "../../assets/logo/patternWhite.png"
import { FaCoins } from "react-icons/fa";
import UserContext from "../../context/UserContext";

const GameHome = () => {
    const ctx = useContext(UserContext)
    // console.log(ctx.currentUser.age)
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
                className="bg-cover bg-center opacity-10 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
            <div className="z-30"> <ToolSidebar/></div>
           
            <div className=" md:pt-20 z-20 m-6 flex flex-col items-center h-full text-white ">
                <GameNavbar/>
                <div className="flex flex-col rounded-xl w-full p-2 text-center">
                   
                    
                    {filterAds.length === 0 && <div className=" text-2xl">Today's video are over</div>}
                    {(ctx?.currentUser?.age != "" && ctx?.currentUser?.gender != "") ? (
                        <div >
                            <p className="text-helpGreen font-bold my-1 text-xl">VIDEO үзээд COIN цуглуулаарай</p>
                            <p>Total video {filterAds.length}</p>
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                {filterAds?.map((ads, index) => {
                                        return (
                                            <div key={index} className="flex flex-row">
                                                <div className="">
                                                    <button 
                                                    onClick={()=> watch(ads?.id)} 
                                                    className="w-[60px] h-[60px] m-auto rounded-[50%] text-[12px] bg-baseBlue1 hover:bg-baseBlue1/80 border">
                                                    WATCH VIDEO
                                                    </button> 
                                                </div>
                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                    ):(
                        <div className="mt-4 flex flex-col justify-center items-center">
                            <p>Хувийн мэдээллээ гүйцэт бөглөснөөр, COIN цуглуулах боломжтой болно</p>
                            <button 
                                onClick={() =>history.push("/profile")}
                                className="bg-baseBlue1 hover:bg-baseBlue1/80 mt-4 py-2 px-6 rounded-lg w-[200px] font-bold">БӨГЛӨХ</button>
                        </div>
                    )}
                </div>
                <button 
                    onClick={() =>history.push("/game")} 
                    className="w-[150px] mt-10 h-[150px] text-xl font-bold rounded-[50%] bg-helpGreen hover:bg-helpGreen/80">
                    START GAME
                </button>
               
            </div>
        </div>
    )
}
 
export default GameHome;