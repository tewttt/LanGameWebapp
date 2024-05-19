import React ,{useContext} from "react";
import ToolSidebar from "../../../components/ToolSidebar";
import pattern from "../../../assets/logo/patternWhite.png"
import Choice from "../../component/Choice"
import UserContext from "../../../context/UserContext";
import {useHistory } from "react-router-dom";

const LessonPage = () => {
    const ctx = useContext(UserContext)
    const history = useHistory();
  
    return (
        <div className="relative flex flex-col h-screen pt-10 px-6 md:p-0">
            <div 
                className="bg-cover bg-center opacity-10 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
            <div className="z-30">
                <ToolSidebar />
            </div>
           
            <div className="text-gray-400 border rounded-2xl px-4 py-2 border-gray-400 md:mt-28 bg-baseBlack/10 text-xl flex justify-between w-[310px] m-auto">
                <p>{ctx?.currentUser?.name}</p>
                <p>{ctx?.currentUser?.amount}₮</p>
                <p>{ctx?.currentUser?.coins}coin</p>
            </div>
            {/* <button 
                onClick={() => history.push("/gameHome")}
                className="bg-baseBlue1 z-20 my-2 font-bold text-2xl text-white w-[300px] py-3 px-10 hover:bg-baseBlue1/80  m-auto rounded-xl">
                    COLLECT COIN
            </button> */}
            {/* <p className="text-helpGreen  font-semibold md:text-2xl text-center my-2">Суралцах хэл, түвшингээ сонгоорой</p> */}
            <div className="z-20 h-full">
                <Choice/>
            </div> 
        </div>      
)}
export default LessonPage;