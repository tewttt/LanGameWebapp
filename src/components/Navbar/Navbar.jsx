import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { getAuth } from "firebase/auth";
import css from "./style.module.css"
import { useHistory } from "react-router-dom"

const auth = getAuth();
const Navbar = (props) => {
    const ctx = useContext(UserContext)
    const history = useHistory()
  
    return (
        <div >
            <div 
                onClick={props.toggleSidebar}
                className={
                props.showSidebar ? 
                "overflow-y-hidden  left-0 top-0 z-10 ease-in duration-300 absolute h-screen w-[50%] md:w-[30%] xl border border-[#263968] bg-baseColor"
                : "absolute top-0 h-screen left-[-100%] ease-in duration-500"}
            >
                <div className=" pt-12 flex flex-col items-center justify-center text-white">
                    <div onClick={()=> history.push("/profile")} className={css.towch}>
                        Profile
                    </div>
                   
                    {/* {ctx?.currentUser?.teacher ? (
                        <div onClick={()=> history.push("/addLesson")} className={css.towch}>
                        Lesson
                        </div>
                    ) : (
                        <div onClick={()=> history.push("/teacher")} className={css.towch}>
                            Teacher
                        </div>
                    ) } */}
                   <div onClick={()=> history.push("/teacher")} className={css.towch}>
                            Teacher
                        </div>
                    <div onClick={()=> history.push("/ads")} className={css.towch}>
                       Advertise
                    </div>
                    <div onClick={()=> history.push("/logout")} className={css.towch}>
                        Log-out
                    </div>
                </div>
            </div>
        </div>
    ) 
}
export default Navbar;


 {/* desktop menu */}
            {/* <div >
                <ul className="flex flex-col justify-center items-center  text-white">
                    <li className="w-[200px] h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 bg-[#383030]">
                        <a href="/user">Profile</a>
                    </li>
                    <li className="w-[200px] h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 bg-[#383030]">
                        <a href="/logout">Гарах</a>
                    </li>
                </ul>
            </div> */}
            {/* mobile menu */}