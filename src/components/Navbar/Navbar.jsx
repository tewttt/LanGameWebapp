import React, {useContext} from "react";
import css from "./style.module.css"
import { useHistory } from "react-router-dom"
import UserContext from "../../context/UserContext";

const Navbar = (props) => {
    const ctx = useContext(UserContext)
    const history = useHistory()
    const signOut = () => {
        // history.push("/")
        ctx.logout()
    }
    return (
        
            <div  
                onClick={props.toggleSidebar}
                className={
                props.showSidebar ? 
                "overflow-y-hidden bg-baseBlack border border-helpGray fixed left-0 top-0 z-40 ease-in duration-300  h-screen w-[50%] md:w-[20%] xl"
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
                    <div onClick={()=> history.push("/settings")} className={css.towch}>
                       Settings
                    </div>
                    <div onClick={signOut} className={css.towch}>
                        Log-out
                    </div>
                </div>
            </div>
       
    ) 
}
export default Navbar;


