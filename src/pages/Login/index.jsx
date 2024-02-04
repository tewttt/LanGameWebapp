import React, { useState, useContext, useEffect } from "react";
import Clock from "../../UI/clock";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillLock,
  AiTwotoneMail,
} from "react-icons/ai";
import Loader from "../../UI/Loader";
import Logo from "../../assets/logo/Logo Violet.svg"
import {AiFillPhone} from "react-icons/ai"
import { FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Login() {
  const ctx = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // curlets1123@gmail.com
  // 123456Aa@
  const [showPass, setShowPass] = useState(false);
  const [rememberMe , setRememberMe] = useState(false)

  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(rememberMeValue);
    if (rememberMeValue) {
      const storedUsername = localStorage.getItem('email');
      const storedUserPassword = localStorage.getItem('password');
      if (storedUsername ) {
        setEmail(storedUsername);
        setPassword(storedUserPassword)
      }
    }
  }, []);

  const signup = () => {
    history.push("/signup");
  };

// console.log(ctx.state.error)
  //TO DO
  // hooson input shalgah , ulaan  bichig gargah
// remember me color change
// log out shuud garahgvi bn 



  // const year = new Date().getFullYear()
  const login = async () => {
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('rememberMe', 'true');
      // console.log(localStorage.setItem)
    } else {
      // If "Remember Me" is not checked, clear local storage
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
  
      if (email.length === 0 || password.length === 0) {
        return alert("Та имэйл хаягаа болон нууц үгээ бөглөнө үү");
      }
    }
    try {
      ctx.loginUser(email, password);
      history.push("/lesson");
      // Your login logic here
    } catch (error) {
      alert('Error during login:', error);
     
    }
  };
  
  const forgotPassword = () => {
    history.push('/forgot') 
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen relative ">
      {ctx.state.logginIn && (
        <div className="absolute z-10"> 
          <Loader />
        </div>
      )}
     
      <div className="flex flex-col items-center">
        {ctx.state.error && (
          <div style={{ color: "red" }}>{ctx.state.error}</div>
        )}
        
        <img src={Logo} className="w-[190px] h-[90px] mb-10"/>
        <div className="mb-5 flex flex-row relative justify-between items-center w-[276px] h-[40px] ">
          <AiTwotoneMail size={20} className="text-baseColor/70 absolute ml-4" />
          <input
            className="w-full h-full text-center border border-baseColor 
            rounded-[25px] transition ease-in-out duration-200
             hover:bg-hpink/10"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 relative flex flex-row justify-between items-center w-[276px] h-[40px]">
          <AiFillLock size={22} className="text-baseColor/70 absolute left-4" />
          <input
            className="w-full h-full text-center border border-baseColor 
            rounded-[25px] transition ease-in-out duration-200
             hover:bg-hpink/10"
            type={showPass ? "text" : "password"} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPass ? (
            <AiFillEye
              size={24}
              className="text-baseColor/70 absolute right-4"
              onClick={() => setShowPass(!showPass)}
            />
          ) : (

            <AiFillEyeInvisible
              size={24}
              className="text-baseColor/70 absolute right-4"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>
        
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
         className="w-[276px] h-[40px] mt-6 bg-baseColor text-hpink text-center border border-baseColor 
         rounded-[25px] transition ease-in-out duration-200
         font-semibold"
          onClick={login}>
          Login
        </button>

      
        <button 
          onClick={forgotPassword}
          className="w-[276px] h-[40px] text-sm font-300 text-gray-400 hover:text-gray-500 ">
          Forgot password 
        </button>
       
        <button 
         className="w-[276px] h-[40px] font-semibold text-center mt-6 bg-hpink 
         rounded-[25px] transition ease-in-out duration-200
         text-baseColor"
          onClick={signup}>
          Бүртгүүлэх
        </button>
      </div>
    </div>
  );
}

