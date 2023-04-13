import { useState } from "react";
import React from "react";
import css from "./style.module.css";
import {Button } from "@mui/material"
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const signup = () => {
        history.push("/signup")
    }
    return (
        <div className={css.body}>
            <input type="number" placeholder="Phone" value={phone} onChange={e=> setPhone(e.target.value)} required/> 
           
            <input type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
          
            <Button  color="primary" style={{textTransform: "none",backgroundColor: "#4285f4",  fontSize: "18px", margin: "12px", fontWeight: "600 "}} > Бүртгүүлэх</Button>
            <Button  color="primary" style={{textTransform: "none",  fontSize: "18px", margin: "12px", fontWeight: "600"}}><Link to="/">Нэвтрэх</Link></Button>
        </div>
    )
}
export default SignUp;