import css from "./style.module.css"
import React from "react";
const Loader = () => {
    return (
        <div className={css.body}>
            <div className={css.ball1}></div>
            <div className={css.ball2}></div>
        </div>
    )
}

export default Loader;