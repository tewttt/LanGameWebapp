import React from "react";
import css from "./style.module.css";

const FormInput = (props) => {
    const {label, errorMessage, onChange, id, ...inputProps} = props;
    return (
        <div className={css.FormInput}>
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} required/>
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput;