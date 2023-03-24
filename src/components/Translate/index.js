import React, {useState} from "react";
import css from "./style.module.css";
import Button from "../Button";
import AddQuestion from "../addQuestion";

const Translate = () => {
    const add = () =>  {
        <AddQuestion/>
    }
    return (
        <div className={css.body}>
             <AddQuestion/>
             <Button text="Асуулт нэмэх" daragdsan={add}/>
        </div>
    )
}
export default Translate;