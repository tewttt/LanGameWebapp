import React, { useState, useEffect } from "react";

import css from "./style.module.css"
import { useHistory } from "react-router-dom"

const Navbar = (props) => {
    const [nav , setNav] =useState(false)
    const history = useHistory()

    const handleNav = () => {
        setNav(!nav)
    }
    return (
        <div 
            // onClick={props.toggleSidebar}
            // className={
            // props.showSidebar ? 
            // "overflow-y-hidden hidden md:flex right-0 top-0 z-10 ease-in duration-300 absolute h-[full] w-[40%] bg-[#383030]"
            // : "absolute top-0 h-screen left-[-100%] ease-in duration-500"}
        >
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
            <div 
                onClick={props.toggleSidebar}
                className={
                props.showSidebar ? 
                "overflow-y-hidden  left-0 top-0 z-10 ease-in duration-300 absolute h-screen w-[50%] md:w-[30%] xl bg-[#383030]"
                : "absolute top-0 h-screen left-[-100%] ease-in duration-500"}
            >
                <ul className=" pt-12 flex flex-col items-center justify-center text-white">
                    <li onClick={()=> history.push("/profile")} 
                    className={css.towch}
                    // className="m-2 p-1 rounded-lg w-[100px] h-[20px] md:w-[200px] md:h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 hover:text-blue-500 bg-[#383030]"
                    >
                        <a href="/profile">Profile</a>
                    </li>
                    <li onClick={()=> history.push("/teacher")} 
                        className={css.towch}
                        // className="m-2 p-1 rounded-lg w-[100px] h-[20px] md:w-[200px] md:h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 hover:text-blue-500 bg-[#383030]"
                        >
                        <a href="/teacher">Багш</a>
                    </li>
                    <li onClick={()=> history.push("/addLesson")} 
                        className={css.towch}
                        // className="m-2 p-1 rounded-lg w-[100px] h-[20px] md:w-[200px] md:h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 hover:text-blue-500 bg-[#383030]"
                        >
                        <a href="/addLesson">Хичээл</a>
                    </li>
                  
                    <li onClick={()=> history.push("/logout")} 
                        className={css.towch}
                        // className="m-2 p-1 rounded-lg w-[100px] h-[20px] md:w-[200px] md:h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 hover:text-blue-500 bg-[#383030]"
                        >
                        <a href="/logout">Гарах</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar;