import React ,{useContext} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import Choice from "../component/Choice";
import UserContext from "../../context/UserContext";
import { IoIosArrowBack} from "react-icons/io";
import {  useHistory ,useParams} from "react-router-dom";

const LessonLevel = () => {
    const {languageId} = useParams()
    const ctx = useContext(UserContext)  
    const history = useHistory();
    return (
        <div className="flex flex-col h-screen pt-10 px-6 md:p-0">
            <div className="z-30">
                <ToolSidebar />
            </div>
            
            <div className="relative text-gray-400 border rounded-2xl px-4 py-2 border-gray-400 md:mt-28 bg-baseBlack/10 text-xl flex justify-between w-[310px] m-auto">
                <p>{ctx?.currentUser?.name}</p>
                <p>{ctx?.currentUser?.amount}₮</p>
                <p>{ctx?.currentUser?.coins}coin</p>
                <IoIosArrowBack 
                    className="text-white absolute -left-6"
                    size={20} onClick={() => history.push("/lesson")}
                />
            </div>
            
            <div className="z-20 h-full">
                
                <Choice languageId={languageId}/>
            </div> 
        </div>      
)}
export default LessonLevel; 