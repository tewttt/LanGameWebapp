import React  from "react";
import css from "./style.module.css"
import { useHistory } from "react-router-dom";
import Logo from "../General/Logo";
import {HiUserCircle} from "react-icons/hi";
import {FaWallet} from "react-icons/fa";

const Toolbar = (props) => {
    const history = useHistory();
    const game = () => {
        history.push("/game");
    };
   const view = () => {
    history.push("/lesson");
    }; 
    const wallet = () => {
        history.push("/wallet")
    }
    const profile = () => {
        history.push("/profile")
    }
    return (
        <header className="fixed flex h-[50px] w-screen p-0 z-10 items-center justify-between mt-0 ml-0 bg-baseColor text-white text-center" > 
            <Logo/>
            <div className="flex justify-between ">
                <div 
                className={`${history.location.pathname == '/lesson' ? css.neon : ""} ${css.noneon} `}
                    // className={`${history.location.pathname == '/lesson' ? 'border border-blue-700 text-blue-500' : ''} w-[120px] h-full border border-blue-200 hover:border-blue-500 hover:text-blue-500 px-5 py-1 rounded-[5px] mx-1 text-sm sm:w-[190px] lg:text-[24px] sm:text-[18px]`} 
                    onClick={view}>Хичээл</div>
                <div 
                 className={`${history.location.pathname == '/game' ? css.neon : ""} ${css.noneon} `}
                    // className={`${history.location.pathname == '/game' ? 'border border-blue-700 text-blue-500' : ''} w-[120px] h-full border border-blue-200 hover:border-blue-500 hover:text-blue-500 px-5 py-1 rounded-[5px] mx-1 text-sm sm:w-[190px] lg:text-[24px] sm:text-[18px]`} 
                    onClick={game}>Тоглох </div>
            </div>
            <div className="flex items-center pr-2">
                <FaWallet onClick={wallet} size={18} className="md:w-[25px] md:h-[25px] mx-1 lg:mx-5 sm:mx-3 transform transition duration-500 ease-in-out hover:rotate-45 hover:translate-x-1 hover:text-blue-500  "/>
                <HiUserCircle onClick={props.toggleSidebar} size={22} className="md:w-[30px] md:h-[30px] mx-1 lg:mx-5 hover:text-blue-500 transform duration-500 ease-in-out hover:scale-125" />
            </div>
        </header>
)}
export default Toolbar;