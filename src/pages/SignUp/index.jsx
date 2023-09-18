import { useContext, useState } from "react";
import css from "./style.module.css"
import React from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Spinner from "../../components/General/Spinner";
import {AiFillEye, AiFillEyeInvisible, AiFillLock, AiTwotoneMail, AiFillPhone} from "react-icons/ai"

const SignUp = () => {
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("shine@gmail.com");
    const [password, setPassword] = useState("123456");
    const [password2, setPassword2] = useState("123456");
    const [phone, setPhone] = useState("5");
    const [error, setError] = useState("");
    const [err, setErr] = useState({
        phone: false
    })
    const [showPass, setShowPass] = useState(password)

    const signupHandler = () => {
        if (phone.length === 0) {
            // setErr({... err, phone: text.lenght < 8})
            setError(" Утасны дугаараа оруулна уу")
            return;
        }
        else if (email.length === 0) {
            setError("Имэйл хаягаа оруулна уу")
            // Alert.alert("Та имэйл хаягаа бичнэ үү");
            return;
        }
        else if (password.length === 0) {
            setError("6с дээш урттай нууц үг оруулна уу")
            return;
        }
        // else if (password === password2) {
        //     setError("Нууц үг хоорондоо таарахгүй байна")
        // } 
        else {
            ctx.signupUser(email,password, phone);
            history.push("/")
        }
    };

   const login = () => {history.push("/")}
    return (
        <div className="flex flex-col justify-center items-center text-gray-700 max-w-[1540px] mx-auto">
            <div className="text-6xl font-bold text-baseBlue p-10">Мэдлэг</div>
            {/* {ctx.state.userId && <Redirect to="/"/>} */}
            <div className="flex flex-col bg-baseColor w-[300px] h-[370px] border-2 border-baseBlue p-5 items-center rounded-[20px]">
                <div className="flex flex-row m-1 justify-between items-center mr-[-30px]">
                    <AiFillPhone size={20} className="text-baseBlue mr-[-50px] z-10 "/>
                    <input 
                        className="w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100" 
                        type="number" placeholder="Phone" value={phone} onChange={e=> setPhone(e.target.value)} required/> 
                </div>
                <div className="flex flex-row m-1 justify-between items-center mr-[-30px]">
                    <AiTwotoneMail size={20} className="text-baseBlue mr-[-50px] z-10 "/>
                    <input 
                        className="w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100" 
                        type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
                </div>
                <div className="flex flex-row m-1 justify-between items-center">
                    <AiFillLock size={20} className="text-baseBlue mr-[-40px] z-10" />
                    <input 
                        className="w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100" 
                        type="password" placeholder="Нууц үг" value={password} onChange={e=>setPassword(e.target.value)}/>
                    {showPass ? (
                          <AiFillEyeInvisible size={20} className="text-baseBlue ml-[-40px]" onClick={() => setShowPass(!showPass)}/>
                    ) : (
                        <AiFillEye size={20} className="text-baseBlue ml-[-40px] " onClick={() => setShowPass(!showPass)}/>
                    )}
                </div>
                <div className="flex flex-row m-1 justify-between items-center">
                    <AiFillLock size={20} className="text-baseBlue mr-[-40px] z-10" />
                    <input
                        className="w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100" 
                        type="password" placeholder="Нууц үгээ давтана уу" value={password2} onChange={e=>setPassword2(e.target.value)}/>
                    {showPass ? (
                          <AiFillEyeInvisible size={20} className="text-baseBlue ml-[-40px]" onClick={() => setShowPass(!showPass)}/>
                    ) : (
                        <AiFillEye size={20} className="text-baseBlue ml-[-40px] " onClick={() => setShowPass(!showPass)}/>
                    )}
                </div>
                {error && <div style={{color: "red"}}>{error}</div>}

                {ctx.state.error && (
                    <div style={{color: "red"}}> {ctx.state.error}</div>
                )}

                {ctx.state.logginIn && <Spinner/>}
                <button className={css.signupButton} onClick={signupHandler} > Манайд</button>
                {/* <button className="btn p-2 bg-baseBlue  w-[200px] h-[40px] text-base hover:bg-blue-500 items-center" onClick={signupHandler} > Бүртгүүлэх</button> */}
                <button className="bg-baseColor text-base font-300 text-white hover:text-baseBlue w-[200px] h-[40px]" onClick={login} >Нэвтрэх</button>
            </div>
        </div>
    )
}
export default SignUp;