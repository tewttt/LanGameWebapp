
import React from "react";
// import css from "./style.module.css";
import Shadow from "../../components/General/Shadow"

const Modal = (props) => {
    return (
        <div className="">
            <Shadow show={props.show}  onClick={props.closeConfirm}/>
            <div style={{
                transform: props.show ? "translateY(0) " : "translateY(-100vh)",
                opacity: props.show ? "1" : "0"
            }} 
            // className={`${css.Modal} w-[80%] top-[30%] left-[10%] md:w-[60%] xl:w-[40%] md:left-[20%] xl:left-[30%]`}
            
            >
                {/* jlkkljlk{props.children} */}
                <p>jjjjjjj</p>
            </div>
        </div>
    )
}
export default Modal;