import { useContext, useState } from "react";
import React from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Colors } from "../../constants/Colors";
import Spinner from "../../components/General/Spinner";
import {AiFillEye, AiFillEyeInvisible, AiFillLock, AiTwotoneMail, AiFillPhone} from "react-icons/ai"
import Logo from "../../assets/logo/Logo Violet.svg"
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import {
    getAuth,
    signInWithPhoneNumber,
    RecaptchaVerifier
  } from "firebase/auth";
const auth = getAuth();

const SignUp = () => {
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [user , setUser] = useState(null)
    const [email, setEmail] = useState("curlets1123@gmail.com");
    const [name, setName] = useState("curlests");
    const [password, setPassword] = useState(123456);
    const [password2, setPassword2] = useState(123456);
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [err, setErr] = useState({
        phone: false
    })
    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const [valid, setValid] = useState(false)
    const [isStrongPassword, setIsStrongPassword] = useState(false)
    const [isStrongPassword2, setIsStrongPassword2] = useState(false)
    const [otp, setOtp] = useState("")

    const changePass =()=> {
     setShowPass(!showPass)  
    }
    const changePass2 =()=> {
        setShowPass2(!showPass2)  
    }

    const changePhone = (value) => {
        setPhone(value)
        setValid(validatePhone(value))
    }
    const validatePhone = (phone) => {
        const phoneNumberPattern = /^\d{11}$/;
        return phoneNumberPattern.test(phone)
    }
    const sendOtp = async() => {
        try {
            const recaptchaContainer = document.getElementById('recaptcha');
            const recaptcha = new RecaptchaVerifier(recaptchaContainer, {
                size: "normal",
                callback: (response) => {
                    console.log("recaptcha resolved", response)
                },
                "expired-callback" : () => {
                    console.log("recaptcha expired")
                }
            })
            // const recaptcha = new RecaptchaVerifier(auth, "recaptcha" , {})
        
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
            setUser(confirmation)
        }catch (err) {
            console.log(err)
        }
    }

    const verifyOtp = async() => {
        try{
            await user.confirm(otp)
        }catch(err){
            console.log(err)
        }
    }
// TO DO
// phone verification


const checkStrongPassword = (value) => {
    // Define your password policy rules
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

    // Check against the defined rules
    const isStrong =
    //   value.length >= minLength && hasUppercase && hasLowercase
      value.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

    setIsStrongPassword(isStrong);
  };

const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkStrongPassword(newPassword);
}

const checkStrongPassword2 = (value) => {
    // Define your password policy rules
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

    // Check against the defined rules
    const isStrong =
    //   value.length >= minLength && hasUppercase && hasLowercase
      value.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

    setIsStrongPassword2(isStrong);
  };

const handlePasswordChange2 = (e) => {
    const newPassword = e.target.value;
    setPassword2(newPassword);
    checkStrongPassword2(newPassword);
}

const signupHandler = async() => {
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
    else if (password !== password2) {
        setError("Нууц үг хоорондоо таарахгүй байна")
    } 
    else if(!isStrongPassword) {
        setError("Нууц үг хамгийн багадаа 8 оронтой, том, жижиг үсэг, тоо болон тусгай тэмдэгттэй байна уу.");
        return;
        }
    else {
        ctx.signupUser(email,password, phone, name);
        // alert("email check")
        
        // history.push("/verification")
    } 
    
};

   const login = () => {history.push("/")}
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen ">
           <img src={Logo} className="w-[190px] h-[90px] mb-10"/>
            {ctx.state.error && (
                    <div style={{color: "red"}}> {ctx.state.error}</div>
                )}
            {/* {ctx.state.userId && <Redirect to="/"/>} */}
           
                <div className="mb-5 flex flex-row relative justify-between items-center w-[276px] h-[40px] ">
                    <input 
                        className="w-full h-full text-center border border-baseColor 
                        rounded-[25px] transition ease-in-out duration-200
                         hover:bg-hpink/10"
                        type="text" placeholder="Нэр" value={name} onChange={e=> setName(e.target.value)} required/> 
                </div>
                
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

                <div className="mb-5 flex flex-row relative justify-between items-center w-[276px] h-[40px] ">
                    <AiTwotoneMail size={20} className="text-baseColor/70 left-4 absolute z-10 "/>
                    <input 
                         className="w-full h-full text-center border border-baseColor 
                         rounded-[25px] transition ease-in-out duration-200
                          hover:bg-hpink/10"
                       type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
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
                    {isStrongPassword ? (
                        <p className="text-green-600 text-center absolute top-10 text-sm">Strong Password</p>
                        ) : (
                        <p className="text-red-500 text-center absolute top-10 text-[10px]">Password must be at least 8 characters with uppercase, lowercase, number, and special character.</p>
                    )}
                </div>
              
                <div className="flex flex-col mb-8 relative justify-center items-center w-[276px] h-[40px] ">
                    <AiFillLock size={20} className="text-baseColor/70 left-4 absolute z-10 " />
                    <input
                        className="w-full h-full text-center border border-baseColor 
                        rounded-[25px] transition ease-in-out duration-200
                        hover:bg-hpink/10"
                        type={showPass2 ? "text" : "password"} 
                        placeholder="Нууц үгээ давтана уу" 
                        value={password2} 
                        onChange={handlePasswordChange2}/>

                    {showPass2 ? (
                        <AiFillEye size={20} 
                            className="text-baseColor/70 right-4 absolute z-10 " 
                            onClick={changePass2}/>
                    ) : (
                        <AiFillEyeInvisible size={20} 
                            className="text-baseColor/70 right-4 absolute z-10 " 
                            onClick={changePass2}/>
                    )}
                    {isStrongPassword2 ? (
                        <p className="text-green-600 top-10 text-center absolute text-sm">Strong Password</p>
                        ) : (
                        <p className="text-red-500 top-10 text-center absolute text-[10px]">Password must be at least 8 characters with uppercase, lowercase, number, and special character.</p>
                    )}  
                </div>
               
                {error && <div style={{color: "green"}}>{error}</div>}

                {ctx.state.logginIn && <Spinner/>}

                {/* <button onClick={sendOtp}>send otp</button>
                <div id="recaptcha"></div>
                <button onClick={verifyOtp}>verify otp</button> */}

                <button 
                    className="w-[276px] h-[40px] font-semibold text-center mt-6 bg-baseColor 
                    rounded-[25px] transition ease-in-out duration-200
                    text-hpink"
                    onClick={signupHandler} >Sign up</button>
                {/* <button className="btn p-2 bg-baseBlue  w-[200px] h-[40px] text-base hover:bg-blue-500 items-center" onClick={signupHandler} > Бүртгүүлэх</button> */}
                <button 
                    className="w-[276px] h-[40px] font-semibold text-center mt-2 bg-hpink 
                    rounded-[25px] transition ease-in-out duration-200
                    text-baseColor"
                    onClick={login} >Back</button>
            </div>
       
    )
}
export default SignUp;