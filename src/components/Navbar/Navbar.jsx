import React from "react";
import css from "./style.module.css"
import { useHistory } from "react-router-dom"

const Navbar = (props) => {
    const history = useHistory()
  
    return (
        <div className="relative">
            <div 
                onClick={props.toggleSidebar}
                className={
                props.showSidebar ? 
                "overflow-y-hidden  left-0 top-0 z-10 ease-in duration-300 absolute h-screen w-[50%] md:w-[30%] xl border border-[#263968] bg-baseBlack"
                : "absolute  top-0 h-screen left-[-100%] ease-in duration-500"}
            >
                <div className=" pt-12 flex flex-col items-center justify-center text-white">
                    <div onClick={()=> history.push("/profile")} className={css.towch}>
                        Profile
                    </div>
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


