import React, { useState, useContext} from "react";
import css from "./style.module.css";


import Clock from "../../UI/clock";
import {Button } from "@mui/material"
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Home = () => {
    const ctx = useContext(UserContext)
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    // console.log(ctx.loginUser)

    const signup = () => {
        history.push("/signup")
    }
    const year = new Date().getFullYear()

    const login = () => {
        // ctx.loginUser(email, password);
        
    };
    return (
        <div className={css.body}>
        <div className={css.login} >
            <input type="number" placeholder="Phone" value={phone} onChange={e=> setPhone(e.target.value)} required/> 
           
            <input type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <Button variant="outlined"  style={{textTransform: "none", backgroundColor: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}} onClick={login}>Нэвтрэх</Button>
            <Button color="error"  style={{textTransform: "none",  fontSize: "18px", margin: "12px", color: "red", fontWeight: "600 "}} onClick={signup}> <Link to="/signup">Бүртгүүлэх</Link></Button>
        
            
          
           
        </div>
        
        <Clock/>
            
            {year}
        </div>
    )
}
export default Home;