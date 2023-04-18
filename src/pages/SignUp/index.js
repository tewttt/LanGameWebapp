import { useContext, useState } from "react";
import React from "react";
import css from "./style.module.css";
import {Button } from "@mui/material"
import { Link, useHistory , Redirect} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Spinner from "../../components/General/Spinner";


const SignUp = () => {
  
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
   
    // console.log(ctx)
    const signUp = () => {
        
        if (password === password2) {
            ctx.signupUser(email, password);
            // alert ("Бүртгүүлэх......" + email + " : " + password);
            // history.push("/")
        } else {
            setError( "Нууц үг хоорондоо таарахгүй байна");
        }
       
    };
   const login = () => {
    history.push("/")
   }
    return (
        <div>
            <div className={css.text}>Мэдлэг</div>
            {ctx.state.userId && <Redirect to="/"/>}
        <div className={css.body}>
            
            <input type="number" placeholder="Phone" value={phone} onChange={e=> setPhone(e.target.value)} required/> 
           
            <input type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
            <input type="password" placeholder="Нууц үг" value={password} onChange={e=>setPassword(e.target.value)}/>
            <input type="password" placeholder="Нууц үгээ давтан оруулна уу" value={password2} onChange={e=>setPassword2(e.target.value)}/>
            {error && <div style={{color: "red"}}>{error}</div>}

            {ctx.state.error && (
                <div style={{color: "red"}}> {ctx.state.error}</div>
            )}

            {ctx.state.saving && <Spinner/>}
            <Button  color="primary" style={{textTransform: "none",backgroundColor: "#4285f4", color:"white", fontSize: "18px", margin: "12px", fontWeight: "600 "}} onClick={signUp} > Бүртгүүлэх</Button>
            <Button   style={{textTransform: "none", color: "white",  fontSize: "18px", margin: "12px", fontWeight: "600"}} onClick={login} >Нэвтрэх</Button>
        </div>
        </div>
    )
}
export default SignUp;