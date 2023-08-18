import React, { useState, useContext} from "react";
import Spinner from "../../components/General/Spinner";
import Clock from "../../UI/clock";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import {AiFillEye, AiFillEyeInvisible, AiFillLock, AiTwotoneMail} from "react-icons/ai"

export default function Login () {
    const ctx = useContext(UserContext)
    const history = useHistory();
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("123456");
    const [showPass, setShowPass] = useState(password)
    const signup = () => { 
        history.push("/signup")
    }
   
    const year = new Date().getFullYear()
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
        history.push("/lesson")
    };

    return (
        <div className="flex flex-col justify-center items-center text-gray-700 max-w-[1540px] mx-auto">
            <h1 className="text-6xl font-bold text-baseBlue p-10">Мэдлэг</h1>
            <div className="flex flex-col bg-baseColor w-[300px] h-[320px] border-2 border-baseBlue p-3 items-center rounded-[20px]">
                {ctx.state.error && <div style={{ color : "red"}}>{ctx.state.error}</div>}
                {/* {ctx.state.logginIn && <p>loading</p>} */}
                <div className="flex flex-row mt-10 justify-between items-center mr-[-30px]">
                    <AiTwotoneMail size={20} className="text-baseBlue mr-[-50px] z-10 "/>
                    <input 
                    className="w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
                </div>
                <div className="flex flex-row m-2 justify-between items-center">
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
                <div className="flex flex-col mx-2 items-center">
                    <button className="btn mt-2 p-2 rounded-lg bg-baseBlue  w-[200px] h-[40px] text-base active:bg-red-200 hover:bg-blue-500 items-center" onClick={login}>Нэвтрэх</button>
                    <button className="bg-[#383030] text-sm font-300 text-red-500 hover:text-red-400 w-[200px] h-[40px] ">Нууц үг сэргээх</button>
                   
                </div>
                <button className=" p-2 rounded-lg bg-baseBlue w-[200px] h-[40px] hover:bg-blue-500 text-white text-base items-center"    onClick={signup}> Бүртгүүлэх</button>
            </div>
        
        {/* <Clock/> */}    
        {/* {year} */}
        </div>
    )}