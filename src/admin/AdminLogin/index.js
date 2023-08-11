import React, {useContext, useState} from "react";

import Spinner from "../../components/General/Spinner";
import {Button } from "@mui/material";
import { Link, useHistory,Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

import {getAuth} from "firebase/auth"

const auth = getAuth();

const AdminLogin = () => {
    const ctx = useContext(UserContext)
    const history = useHistory();
    const [email, setEmail] = useState("tuya@gmail.com");
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
        <div className="flex flex-col justify-center items-center text-gray-700 max-w-[1540px] mx-auto">
            <div className="text-6xl font-bold text-[#1974C7] p-10">Admin {auth.currentUser?.uid}</div>
            <div className="flex flex-col bg-[#383030] w-[300px] h-[300px] border-2 border-[#1974C7] p-3 items-center rounded-[20px]" >
           
           
           {/* {ctx.state.error && <div style={{ color : "red"}}>{ctx.state.error}</div>}
           {ctx.state.logginIn && <Spinner/>} */}
        
           
            <input 
                className="w-[250px] h-[30px] text-center bg-gray-300 m-4"
                type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
            <input 
                className="w-[250px] h-[30px] text-center bg-gray-300 m-4"
                type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <button variant="outlined"  className="btn p-2 bg-[#1974C7]  w-[200px] h-[40px] text-base active:bg-red-200 hover:bg-blue-500 items-center" onClick={login}>Нэвтрэх</button>

           
            </div>
        
      
        </div>
       
    )
}

export default AdminLogin;