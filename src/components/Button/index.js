import React from "react";
import css from "./style.module.css"

const Button = props => (
  <button
    onClick={props.daragdsan}
    // className={css.Button}
    className={`${css.Button} ${css[props.btn]}`}
  >
    {props.text}
  </button>
);

export default Button;
