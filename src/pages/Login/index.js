import React, { useState, useContext} from "react";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";

import Clock from "../../UI/clock";
import {Button } from "@mui/material"
import { Link, useHistory,Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Home = () => {
    const ctx = useContext(UserContext)
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    // console.log(ctx.state)

    const signup = () => {
        history.push("/signup")
    }
    const year = new Date().getFullYear()

    const login = () => {
        ctx.loginUser(email, password);
     
        history.push("/lesson")
        
    };
    return (
        <div className={css.body}>
            <div className={css.text}>Мэдлэг</div>
            <div className={css.login} >
           
           
           {ctx.state.error && <div style={{ color : "red"}}>{ctx.state.error}</div>}
           {ctx.state.logginIn && <Spinner/>}
           {/* {ctx.state.userId && <Redirect to="/lesson"/>} */}
           
            <input type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <Button variant="outlined"  style={{textTransform: "none", color: "white", backgroundColor: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}} onClick={login}>Нэвтрэх</Button>
            <Button   style={{textTransform: "none",  fontSize: "18px", margin: "12px", color: "white", fontWeight: "600 "}} onClick={signup}> Бүртгүүлэх</Button>
           
            </div>
        
        {/* <Clock/> */}
            
            {/* {year} */}
        </div>
    )
}
export default Home;