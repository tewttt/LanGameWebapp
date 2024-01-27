import { useContext, useState } from "react";
import React from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../context/UserContext";
import { Colors } from "../constants/Colors";
import Spinner from "../components/General/Spinner";
import {AiFillEye, AiFillEyeInvisible, AiFillLock, AiTwotoneMail, AiFillPhone} from "react-icons/ai"
import Logo from "../assets/logo/Logo Violet.svg"
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import {
    getAuth,
    signInWithPhoneNumber,
    RecaptchaVerifier
  } from "firebase/auth";
const auth = getAuth();

const LoginPhone = () => {
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [password, setPassword] = useState("123456Aa@");
    const [phone, setPhone] = useState("");
    const [showPass, setShowPass] = useState(false)
    const [valid, setValid] = useState(false)
    const [rememberMe , setRememberMe] = useState(false)
   

    const changePass =()=> {
     setShowPass(!showPass)  
    }
   
    const changePhone =async (value) => {
        setPhone(value)
        setValid(validatePhone(value))
    }
    const validatePhone = (phone) => {
        const phoneNumberPattern = /^\d{11}$/;
        return phoneNumberPattern.test(phone)
    }


const handlePasswordChange = (e) => {
    setPassword(e.target.value);
}


const login = async () => {
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
      console.log(localStorage.setItem)
    } else {
      // If "Remember Me" is not checked, clear local storage
      localStorage.removeItem('rememberMe');
  
      if ( password.length === 0) {
        return alert("нууц үгээ бөглөнө үү");
      }
    }
    try {
      ctx.loginUser(phone, password);
      history.push("/lesson");
      // Your login logic here
    } catch (error) {
      alert('Error during login:', error);
     
    }
  };

return (
    <div className="flex flex-col justify-center items-center w-screen h-screen ">
        <img src={Logo} className="w-[190px] h-[90px] mb-10"/>
        {ctx.state.error && (
                <div style={{color: "red"}}> {ctx.state.error}</div>
            )}
    
            <div className="mb-5 flex flex-col relative justify-between items-center w-[276px] h-[40px] ">
                <PhoneInput
                    country={"mn"}
                    className="absolute z-50"
                    placeholder="phone number"
                    value={phone}
                    onChange={changePhone}
                    inputProps={{
                        required: true
                    }}
                    inputStyle={{width: "276px", borderColor: Colors.baseColor, borderRadius: "20px", height: "40px"}}
                />
                {! valid && <p className="text-red-500 text-xs">Please enter a valid phone number</p>}
            </div>
            
            <div className=" flex flex-col mb-8 relative justify-center items-center w-[276px] h-[40px] ">
                <AiFillLock size={20} className="text-baseColor/70 left-4 absolute z-10 " />
                <input 
                    className="w-full h-full text-center border border-baseColor 
                    rounded-[25px] transition ease-in-out duration-200
                    hover:bg-hpink/10"
                    type={showPass ? "text" : "password"} 
                    placeholder="Нууц үг" 
                    value={password} 
                    onChange={handlePasswordChange}
                />
                {showPass ? (
                    <AiFillEye size={20}  className="text-baseColor/70 right-4 absolute z-10 " onClick={changePass}/>
                ) : (
                    <AiFillEyeInvisible size={20}  className="text-baseColor/70 right-4 absolute z-10 " onClick={changePass}/>
                )}
               
            </div>
            
            {ctx.state.error && (
          <div style={{ color: "red" }}>{ctx.state.error}</div>
        )}

            {ctx.state.logginIn && <Spinner/>}
        <div className="flex justify-start w-[276px]">
          <input
            checked={rememberMe} 
            onChange={() => setRememberMe(!rememberMe)}
            type="checkbox"
            className="mx-2 w-5 h-5 border border-gray-400 rounded-md appearance-none 
             checked:bg-baseColor checked:border-baseColor
            "

          />
          <p className="text-sm text-gray-400">Remember me</p>

        </div>

            <button 
                className="w-[276px] h-[40px] font-semibold text-center mt-6 bg-baseColor 
                rounded-[25px] transition ease-in-out duration-200
                text-hpink"
                onClick={login} >Login</button>
          
            <button 
                className="w-[276px] h-[40px] font-semibold text-center mt-2 bg-hpink 
                rounded-[25px] transition ease-in-out duration-200
                text-baseColor"
                onClick={() => {history.push("signupChoose")}} >Back</button>
        </div>
    
)
}
export default LoginPhone;