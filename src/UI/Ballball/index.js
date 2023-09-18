import React from "react";
import css from "./style.module.css";

const Ballball = () => {
    return (
        <div className={css.body}>
            <div className={css.room}>
                <div className={css.floor}>
                    <div className={css.ballShadow}></div>
                </div>
                <div className={css.ball}></div>
            </div>
        </div>
    )
}

export default Ballball;