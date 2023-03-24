import React from "react";
import css from "./style.module.css";
import Button from "../Button";

const Choice = () => {
    return (
        <div className={css.body}>
                <div className={css.language}>Хэл сонгох
               
                <div className={css.box}> <Button text="Англи хэл"/></div>
                <div className={css.box}> <Button text="Бусад хэл"/></div>
            </div>
            <div className={css.language}>Түвшин сонгох
                <div className={css.box}> <Button text="A1" /></div>
                <div className={css.box}> <Button text="A2"/></div>
                <div className={css.box}> <Button text="B1"/></div>
                <div className={css.box}> <Button text="B1 +"/></div>
                <div className={css.box}> <Button text="B2"/></div>
                <div className={css.box}> <Button text="B2 +"/></div>
            </div >
            <div className={css.language}>Хичээл сонгох</div>

        </div>
    )
}
export default Choice;