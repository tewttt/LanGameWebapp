import React, {useContext, useState} from "react";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import {Button } from "@mui/material";
import { Link, useHistory,Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

import {getAuth} from "firebase/auth"

const auth = getAuth();

const AdminLogin = () => {
    const ctx = useContext(UserContext)
    const history = useHistory();
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("123456");

    const login = () => {
        if (email.length === 0) {
            alert("Та имэйл хаягаа бичнэ үү");
            return;
        }
        if (password.length === 0) {
            alert("Та нууц үгээ оруулна уу");
            return;
        }
        ctx.loginUser(email,password);
        history.push("/dashboard")
        
    };
    return (
        <div className={css.body}>
            <div className={css.text}>Мэдлэг {auth.currentUser?.uid}</div>
            <div className={css.login} >
           
           
           {/* {ctx.state.error && <div style={{ color : "red"}}>{ctx.state.error}</div>}
           {ctx.state.logginIn && <Spinner/>} */}
        
           
            <input type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <Button variant="outlined"  style={{textTransform: "none", color: "white", backgroundColor: "#4285f4", fontSize: "18px", margin: "12px", fontWeight: "600"}} onClick={login}>Нэвтрэх</Button>

           
            </div>
        
      
        </div>
       
    )
}

export default AdminLogin;