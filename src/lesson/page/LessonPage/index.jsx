import React ,{useContext, useState} from "react";
import ToolSidebar from "../../../components/ToolSidebar";
import pattern from "../../../assets/logo/patternWhite.png"
import Choice from "../../component/Choice"
import UserContext from "../../../context/UserContext";
import {useHistory } from "react-router-dom";
import useLesson from "../../../hook/useLesson";

const LessonPage = () => {
    const ctx = useContext(UserContext)
    const [chLan, setChLan] = useState("");
    const {lanId, getLevelId} = useLesson();
   
    const history = useHistory();
  
    const selectLan = (lan, i) => {
        if(lan != ""){
            history.push(`/level/${lan}`)
        }
        setChLan(lan);
        getLevelId(lan)
    };
    return (
        <div className="relative flex flex-col items-center h-screen pt-10 px-6 md:p-0">
           
            <div className="z-30">
                <ToolSidebar />
            </div>
           
            <div className="text-gray-400 border rounded-2xl px-4 py-2 border-gray-400 md:mt-28 bg-baseBlack/10 text-xl flex justify-between w-[310px] m-auto">
                <p>{ctx?.currentUser?.name}</p>
                <p>{ctx?.currentUser?.amount}₮</p>
                <p>{ctx?.currentUser?.coins}coin</p>
            </div>
          
            <div className="flex flex-wrap gap-2 place-content-center mt-10 mb-2  w-full sm:w-[80%] xl:w-[60%]">
                {lanId.map((lan, i) => {
                return (
                    <div
                    className={`${chLan === lan ?  "bg-baseBlue1 text-white" : "" } w-[80%] md:w-[30%] aspect-square hover:bg-baseBlue1 hover:text-white md:text-2xl bg-white font-bold text-baseBlack p-4 flex items-center justify-center rounded-2xl` }
                    key={i}
                    onClick={() => selectLan(lan.id)}
                    >
                    <p className={`${chLan === lan && " text-white"} text-4xl`}>{lan.id}</p>
                    </div>
                );
                })}
            </div>

            <div className="z-20 h-full">
                {/* <Choice/> */}
            </div> 
        </div>      
)}
export default LessonPage;