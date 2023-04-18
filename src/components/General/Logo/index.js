import React from "react";
import css from "./style.module.css";
import img from "../../../assets/img/1.jpg"

const Logo = () => {
    return (
        <div className={css.Logo}>
            <img src={img}/>
        </div>
    )
}

export default Logo;