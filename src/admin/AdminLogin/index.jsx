import React, {useContext, useState} from "react";
import css from "./style.module.css"
import { Link, useHistory,Redirect } from "react-router-dom";

import MemberContext from "../../context/MemberContext";
import {AiFillEye, AiFillEyeInvisible, AiFillLock, AiTwotoneMail} from "react-icons/ai"
import {getAuth} from "firebase/auth"

const auth = getAuth();
const AdminLogin = () => {
    const ctx = useContext(MemberContext)
    const history = useHistory();
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("123456");
    const [showPass, setShowPass] = useState(password)

    const login = () => {
        if (email.length === 0) {
            alert("Та имэйл хаягаа бичнэ үү");
            return;
        }
        if (password.length === 0) {
            alert("Та нууц үгээ оруулна уу");
            return;
        }
        ctx.loginMember(email,password);
        history.push("/dashboard")
        
    };
    return ( 
        <div className="flex flex-col justify-center items-center text-gray-700 max-w-[1540px] mx-auto">
            <div className={css.admin}>Admin {auth.currentUser?.uid}</div>
            <div className="flex flex-col bg-baseColor w-[300px] h-[320px] border-2 border-baseBlue p-3 items-center rounded-[20px]">
                <div className="my-3 flex flex-row justify-between items-center mr-[-30px]">
                    <AiTwotoneMail size={20} className="text-baseBlue mr-[-50px] z-10 "/>
                    <input 
                        className=" w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                        type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
                </div>
                <div className="my-3 flex flex-row justify-between items-center mr-[-5px]">
                    <AiFillLock size={20} className="text-baseBlue mr-[-40px] z-10" />
                    <input 
                        className="w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                        type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    {showPass ? (
                            <AiFillEyeInvisible size={20} className="text-baseBlue ml-[-40px]" onClick={() => setShowPass(!showPass)}/>
                        ) : (
                            <AiFillEye size={20} className="text-baseBlue ml-[-40px] " onClick={() => setShowPass(!showPass)}/>
                        )}
                </div>
                <button variant="outlined"  className="mt-10 p-2 bg-baseBlue rounded-2xl  w-[200px] h-[40px] text-base  hover:bg-blue-500 items-center" onClick={login}>Нэвтрэх</button>
            </div>
        </div>
)}

export default AdminLogin;