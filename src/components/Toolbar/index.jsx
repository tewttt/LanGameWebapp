import React , {useRef, useState} from "react";
import css from "./style.module.css";
import { useHistory } from "react-router-dom";
import logo from "../../assets/img/1.jpg";
import { NavLink, Link} from "react-router-dom";
import { useEffect } from "react";
import Logo from "../General/Logo";
import Menu from "../Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WalletIcon from '@mui/icons-material/Wallet';
import Wallet from "../Wallet";
import { blue } from "@mui/material/colors";


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
    history.push("/user")
}
    return (
       
            <header className="flex h-[40px] w-full p-0 items-center justify-between mt-0 ml-0 z-90 bg-[#383030] text-white text-center" 
             > 
             <Logo/>
                <div className="flex justify-between ">

                    <div className="w-[120px] h-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 px-5 py-1 rounded-[5px] mx-1 text-sm sm:w-[190px] lg:text-[24px] sm:text-[18px]" onClick={game}>Тоглох </div>
                    <div className="w-[120px] h-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 px-5 py-1 rounded-[5px] mx-1 text-sm sm:w-[190px] lg:text-[24px] sm:text-[18px]" onClick={view}>Хичээл</div>

                </div>
                <div className="flex">
                <WalletIcon  color="primary" onClick={wallet} className="w-[20px] h-[20px] mx-1 lg:mx-5 sm:mx-3"/>
               <AccountCircleIcon 
                color="error" 
               onClick={props.toggleSidebar} 
               className="w-[20px] h-[20px] mx-1 lg:mx-5"/>
               </div>
            </header>
       
    )
}
export default Toolbar;