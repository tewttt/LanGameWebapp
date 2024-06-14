import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillLock,
  AiTwotoneMail,
} from "react-icons/ai";
import Loader from "../../components/General/Loader"
import Logo from "../../assets/logo/Typo Logo SVG Blue.svg"
import blue from "../../assets/shagai/bluelogin.svg"
import red from "../../assets/shagai/redlogin.svg"
import green from "../../assets/shagai/greenlogin.svg"
import orange from '../../assets/shagai/orangelogin.svg'
import pattern from "../../assets/logo/backgroundSmall.png"

export default function Login() {
  const ctx = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    } catch (error) {
      alert('Error during login:', error);
     
    }
  };
  
  const forgotPassword = () => {
    history.push('/forgot') 
  }

  return (
    <div className="flex bg-white text-baseBlack flex-col justify-center items-center w-screen h-screen relative "
      style={{backgroundImage: `url(${pattern})`}}
    >
      
      

      {ctx.state.logginIn && (
        <div className="absolute z-10"> 
          <Loader />
        </div>
      )}
     
      <div className="w-[276px] flex flex-col items-center">
        {ctx.state.error && (
          <div style={{ color: "red" }}>{ctx.state.error}</div>
        )}
        
        <img src={Logo} className="w-[300px] h-[100px] mb-5"/>
        {/* <p className="text-3xl text-center text-baseBlue1 font-bold uppercase mb-5">Тоглонгоо сур</p> */}
        <div className="mb-5 flex flex-row relative justify-between items-center w-full ">
          <AiTwotoneMail size={20} className="text-baseBlue1 absolute ml-4" />
          <input
            className="w-full h-full text-center border border-baseBlue1 
            rounded-[25px] transition ease-in-out duration-200 py-2
             hover:bg-baseBlue1/5"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 relative flex flex-row justify-between items-center w-full">
          <AiFillLock size={22} className="text-baseBlue1 absolute left-4" />
          <input
            className="w-full h-full text-center border border-baseBlue1 
            rounded-[25px] transition ease-in-out duration-200 py-2
             hover:bg-baseBlue1/5"
            type={showPass ? "text" : "password"} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPass ? (
            <AiFillEye
              size={24}
              className="text-baseBlue1 absolute right-4"
              onClick={() => setShowPass(!showPass)}
            />
          ) : (

            <AiFillEyeInvisible
              size={24}
              className="text-baseBlue1 absolute right-4"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>
        
        <div className="flex justify-start w-full">
          <input
            checked={rememberMe} 
            onChange={() => setRememberMe(!rememberMe)}
            type="checkbox"
            className="mx-2 w-5 h-5 border border-gray-400 rounded-md appearance-none 
             checked:bg-baseBlue1 checked:border-baseBlue1"
          />
          <p className="text-sm text-gray-400">Remember me</p>

        </div>
        <button 
            className="w-full py-2 mt-6 bg-baseBlue1 text-white text-center border border-helpGray 
            rounded-[25px] transition ease-in-out duration-200
            font-semibold hover:bg-blue-700"
            onClick={login}>
            Login
        </button>

        <button 
          onClick={forgotPassword}
          className="w-full py-2 text-sm font-300 text-gray-400 hover:text-gray-500 ">
          Forgot password 
        </button>
       
        <button 
          className="w-full py-2 font-semibold text-center mt-2 bg-helpGray 
          rounded-[25px] transition ease-in-out duration-200 hover:bg-gray-200
          "
          onClick={signup}>
          Sign up
        </button>
        <button 
          onClick={() => (history.push("/"))}
          className="w-full py-2 text-sm font-300 text-gray-400 hover:text-gray-500 ">
          Back 
        </button>
      </div>

    </div>
  );
}

 