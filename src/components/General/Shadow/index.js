import React from "react";
import css from "./style.module.css";

const Shadow = (props) => {
    return (
        props.show ?  <div className={css.Shadow} onClick={props.onClick}></div> : null
    )
}
export default Shadow;