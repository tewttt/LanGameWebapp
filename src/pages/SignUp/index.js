import { useContext, useState } from "react";
import React from "react";
import css from "./style.module.css";
import {Button } from "@mui/material"
import { Link, useHistory , Redirect} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Spinner from "../../components/General/Spinner";
import {getAuth, } from "firebase/auth";



const SignUp = () => {
  
    const ctx = useContext(UserContext);
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [err, setErr] = useState({
        phone: false
    })

    const signupHandler = () => {
       
        if (phone.length === 0) {
            // setErr({... err, phone: text.lenght < 8})
            setError(" Утасны дугаараа оруулна уу")
          
            return;
        }
        if (email.length === 0) {
            setError("Имэйл хаягаа оруулна уу")
            // Alert.alert("Та имэйл хаягаа бичнэ үү");
            return;
        }
        if (password.length === 0) {
            setError("6с дээш урттай нууц үг оруулна уу")
            return;
        }
        if (password !== password2) {
            setError("Нууц үг хоорондоо таарахгүй байна")
        }
        ctx.signupUser(email,password, phone);
        history.push("/")
    };

   
    

   const login = () => {
    history.push("/")
   }
    return (
        <div>
            <div className={css.text}>Мэдлэг</div>
            {/* {ctx.state.userId && <Redirect to="/"/>} */}
        <div className={css.body}>
            
            <input type="number" placeholder="Phone" value={phone} onChange={e=> setPhone(e.target.value)} required/> 
           
            <input type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
            <input type="password" placeholder="Нууц үг" value={password} onChange={e=>setPassword(e.target.value)}/>
            <input type="password" placeholder="Нууц үгээ давтан оруулна уу" value={password2} onChange={e=>setPassword2(e.target.value)}/>
            {error && <div style={{color: "red"}}>{error}</div>}

            {ctx.state.error && (
                <div style={{color: "red"}}> {ctx.state.error}</div>
            )}

            {ctx.state.logginIn && <Spinner/>}
            <Button  color="primary" style={{textTransform: "none",backgroundColor: "#4285f4", color:"white", fontSize: "18px", margin: "12px", fontWeight: "600 "}} onClick={signupHandler} > Бүртгүүлэх</Button>
            <Button   style={{textTransform: "none", color: "white",  fontSize: "18px", margin: "12px", fontWeight: "600"}} onClick={login} >Нэвтрэх</Button>
        </div>
        </div>
    )
}
export default SignUp;