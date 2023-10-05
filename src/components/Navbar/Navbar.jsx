import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { getAuth } from "firebase/auth";
import css from "./style.module.css"
import { useHistory } from "react-router-dom"

const auth = getAuth();
const Navbar = (props) => {
    const ctx = useContext(UserContext)
    const [nav , setNav] =useState(false)
    const history = useHistory()

    // useEffect(() => {
    //     const profile = ctx.userList.find(
    //         // item => console.log(item.authId)
    //         item => item.authId === auth.currentUser.uid
    //     )   
    //     // console.log(profile)
   
    // },[])

    const handleNav = () => {
        setNav(!nav)
    }
    const teacher = () => {
        history.push("/teacher")
    }
    const profile = () => {
        history.push("/profile")
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
                "overflow-y-hidden  left-0 top-0 z-10 ease-in duration-300 absolute h-screen w-[50%] md:w-[30%] xl border border-[#263968] bg-baseColor"
                : "absolute top-0 h-screen left-[-100%] ease-in duration-500"}
            >
                <div className=" pt-12 flex flex-col items-center justify-center text-white">
                    <div onClick={profile} 
                    className={css.towch}
                    // className="m-2 p-1 rounded-lg w-[100px] h-[20px] md:w-[200px] md:h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 hover:text-blue-500 bg-[#383030]"
                    >
                        Profile
                    </div>
                    <div onClick={teacher} 
                        className={css.towch}
                        // className="m-2 p-1 rounded-lg w-[100px] h-[20px] md:w-[200px] md:h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 hover:text-blue-500 bg-[#383030]"
                        >
                        Багш
                    </div>
                    <div onClick={()=> history.push("/addLesson")} 
                        className={css.towch}
                        // className="m-2 p-1 rounded-lg w-[100px] h-[20px] md:w-[200px] md:h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 hover:text-blue-500 bg-[#383030]"
                        >
                       Хичээл
                    </div>
                  
                    <div onClick={()=> history.push("/logout")} 
                        className={css.towch}
                        // className="m-2 p-1 rounded-lg w-[100px] h-[20px] md:w-[200px] md:h-[30px] flex items-center justify-center border border-gray-400 hover:border-blue-500 hover:text-blue-500 bg-[#383030]"
                        >
                        Гарах
                    </div>
                </div>
            </div>
        </div>
    ) 
}
export default Navbar;