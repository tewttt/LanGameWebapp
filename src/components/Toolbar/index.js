import React , {useRef, useState} from "react";
import css from "./style.module.css";
import { useHistory } from "react-router-dom";
import logo from "../../assets/img/1.jpg";
import { NavLink, Link} from "react-router-dom";
import { useEffect } from "react";
import Logo from "../General/Logo";
import Menu from "../Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const Toolbar = (props) => {
 
  
    // const headerRef = useRef(null)
    // const stickyHeaderFunc = () => {
    //     window.addEventListener("scroll", () => {
    //         // if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
    //         //     headerRef.current.classList.add("sticky_header")
              
    //         // } else {
    //         //     headerRef.current.classList.remove("sticky_header")
    //         // }
    //     })
    // }
    // useEffect(() => {
    //     stickyHeaderFunc()
    //     return () => window.removeEventListener("scroll", stickyHeaderFunc);
    // })

    const history = useHistory();
    const game = () => {
        history.push("/game");
   };
   const view = () => {
    history.push("/lesson");
}; 
    return (
       
            <header className={css.body} > 
             <Logo/>
                <div className={css.meduim}>

                    <div className={css.btn} onClick={game}>Тоглох </div>
                    <div className={css.btn} onClick={view}>Хичээл</div>

                </div>

               <AccountCircleIcon onClick={props.toggleSidebar} className={css.icon}/>
            </header>
       
    )
}
export default Toolbar;