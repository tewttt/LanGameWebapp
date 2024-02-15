import React from "react";
import css from "./style.module.css";
import { useHistory} from "react-router-dom";
import Logo from "../General/Logo";
import { HiUserCircle } from "react-icons/hi";
import { FaWallet } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { MdOutlineMenuBook } from "react-icons/md";
const Toolbar = (props) => {
  const history = useHistory();
  const game = () => {
    history.push("/gameHome");
  };
  const view = () => {
    history.push("/lesson");
  };
  const wallet = () => {
    history.push("/wallet");
  };

  return (
    <div className="flex justify-center">
      <header className="hidden  p-8 fixed md:flex h-[50px] text-gray-400 border-b-4 bg-baseBlack border-helpGray w-screen  z-20 items-center justify-around">
          <div className={`${history.location.pathname == "/wallet" ? "bg-baseBlue1 p-3 rounded-[50%]" : ""} hover:bg-baseBlue1 p-3 rounded-[50%] text-white`}>
            <FaWallet className={`${history.location.pathname == "/wallet" ? " text-white" : ""} `}
              onClick={wallet} size={26}/>
          </div>
         
          <div className={`${history.location.pathname == "/lesson" ? "bg-baseBlue1 p-3 rounded-[50%]" : ""} hover:bg-baseBlue1 p-3 rounded-[50%] text-white `}>
            <MdOutlineMenuBook 
              className={`${history.location.pathname == "/lesson" ? " text-white" : ""} `}
              onClick={view} size={28}/>
          </div>
          <Logo/>
          <div className={`${history.location.pathname == "/gameHome" ? "bg-baseBlue1 p-3 rounded-[50%]" : ""} hover:bg-baseBlue1 p-3 rounded-[50%] text-white`}>
            <IoGameController onClick={game}  size={28} className={`${history.location.pathname == "/gameHome" ? " text-white" : ""} `}/>
          </div >
          <div className="hover:bg-baseBlue1 p-3 rounded-[50%]">
            <HiUserCircle onClick={props.toggleSidebar} size={30} className="hover:text-white"/>
          </div>
      </header>
      {/* mobile */}
      <header className="bg-white fixed md:hidden bottom-10 rounded-full w-[340px] z-10 flex text-gray-400 p-2 justify-between items-center">
          <div className={`${history.location.pathname == "/wallet" ? "bg-baseBlue1 p-3 rounded-[50%]" : "p-3"} `}>
            <FaWallet className={`${history.location.pathname == "/wallet" ? " text-white " : ""} `}
              onClick={wallet} size={26}/>
          </div>
          <div className={`${history.location.pathname == "/lesson" ? "bg-baseBlue1 p-3 rounded-[50%]" : "p-3"} `}>
            <MdOutlineMenuBook 
              className={`${history.location.pathname == "/lesson" ? " text-white" : ""} `}
              onClick={view} size={28}/>
          </div>
          <div className=""> 
            <Logo />
          </div>
          
          <div className={`${history.location.pathname == "/gameHome" ? "bg-baseBlue1 p-3 rounded-[50%]" : "p-3"} `}>
            <IoGameController onClick={game}  size={28} className={`${history.location.pathname == "/gameHome" ? " text-white" : ""} `}/>
          </div >
          <div className="hover:bg-baseBlue1 p-3 rounded-[50%]">
            <HiUserCircle onClick={props.toggleSidebar} size={30} className="hover:text-white"/>
          </div>
      </header>
    </div>
  );
};
export default Toolbar;


 {/* <div
            className={`${history.location.pathname == "/lesson" ? css.neon : ""} ${css.noneon} `}
            onClick={view}
          >
            Хичээл
          </div> */}

          {/* <div
            className={`${history.location.pathname == "/gameHome" ? css.neon : ""} ${css.noneon}`}
            onClick={game}
          >
            Тоглоом
          </div> */}