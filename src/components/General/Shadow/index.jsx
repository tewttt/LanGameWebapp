import React from "react";
import css from "./style.module.css";

const Shadow = (props) => {
    // console.log(props)
    return (
        // props.show ?  <div className={css.Shadow} onClick={props.onClick}></div> : null

        <div  
        onClick={props.toggleSidebar}
        className={
        props.showSidebar ? 
        "overflow-y-hidden fixed left-0 top-0 z-40 ease-in duration-300  h-screen w-full"
        : "absolute  top-0 h-screen left-[-100%] ease-in duration-500"}
    >
        
      
    </div>
    )
}
export default Shadow;  