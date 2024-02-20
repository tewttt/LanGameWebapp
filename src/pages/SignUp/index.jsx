import { useContext, useState } from "react";
import {useHistory} from "react-router-dom";

import UserContext from "../../context/UserContext";
import {AiFillEye, AiFillEyeInvisible, AiFillLock, AiTwotoneMail, AiFillPhone} from "react-icons/ai"
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

import Spinner from "../../components/General/Spinner";
import Logo from "../../assets/logo/Typo Logo SVG Blue.svg"
import { Colors } from "../../constants/Colors";
import backImage from "../../assets/logo/backgroundSmall.png"

const SignUp = () => {
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const [valid, setValid] = useState("")
    const [isStrongPassword, setIsStrongPassword] = useState("")
    const [isStrongPassword2, setIsStrongPassword2] = useState(false)

    const changePass =()=> {
     setShowPass(!showPass)  
    }
    const changePass2 =()=> {
        setShowPass2(!showPass2)  
    }

    const changePhone =async (value) => {
        setPhone(value)
        setValid(validatePhone(value))
    }
    const validatePhone = (phone) => {
        const phoneNumberPattern = /^\d{11}$/;
        return phoneNumberPattern.test(phone)
    }

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
        setError(" Утасны дугаараа оруулна уу")
        return;
    }
    else if (email.length === 0) {
        setError("Имэйл хаягаа оруулна уу")
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
        ctx.signupUser(email, password, phone, name);
        // alert("email check")
        // history.push("/verification")
    } 
    
};

const login = () => {history.push("/")}

return (
    <div className="flex  flex-col relative text-baseBlack justify-center items-center w-screen h-screen ">
        <div 
            className="bg-cover absolute top-0 left-0 -z-10 opacity-90 w-screen h-screen"
            style={{backgroundImage: `url(${backImage})`}}>
        </div>

        <img src={Logo} className="w-[300px] h-[100px] mb-10"/>
        {ctx.state.error && (
                <div style={{color: "red"}}> {ctx.state.error}</div>
        )}
        {/* {ctx.state.userId && <Redirect to="/"/>} */}
        
        <div className="mb-5 flex flex-row relative justify-between items-center w-[276px] h-[40px] ">
            <input 
                className="w-full h-full text-center border border-baseBlue1 
                rounded-[25px] transition ease-in-out duration-200
                    hover:bg-hpink/10"
                type="text" placeholder="Нэр" value={name} onChange={e=> setName(e.target.value)} required/> 
        </div>
        
        <div className="mb-5 flex flex-col relative justify-between items-center w-[276px] h-[40px] ">
            <PhoneInput
                country={"mn"}
                className="absolute z-50 "
                placeholder="phone number"
                value={phone}
                onChange={changePhone}
                inputProps={{
                    required: true
                }}
                inputStyle={{width: "276px", borderColor: Colors.baseBlue1, borderRadius: "20px", height: "40px"}}
            />
            {valid === false && <p className="text-red-500 text-xs">Please enter a valid phone number</p>}
        </div>

        <div className="mb-5 flex flex-row relative justify-between items-center w-[276px] h-[40px] ">
            <AiTwotoneMail size={20} className="text-baseBlue1 left-4 absolute z-10 "/>
            <input 
                    className="w-full h-full text-center border border-baseBlue1 
                    rounded-[25px] transition ease-in-out duration-200
                    hover:bg-blue-700"
                type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
        </div>
        
        <div className=" flex flex-col mb-8 relative justify-center items-center w-[276px] h-[40px] ">
            <AiFillLock size={20} className="text-baseBlue1 left-4 absolute z-10 " />
            <input 
                className="w-full h-full text-center border border-baseBlue1 
                rounded-[25px] transition ease-in-out duration-200"
                type={showPass ? "text" : "password"} 
                placeholder="Нууц үг" 
                value={password} 
                onChange={handlePasswordChange}
            />
            {showPass ? (
                <AiFillEye size={20}  className="text-baseBlue1 right-4 absolute z-10 " onClick={changePass}/>
            ) : (
                <AiFillEyeInvisible size={20}  className="text-baseBlue1 right-4 absolute z-10 " onClick={changePass}/>
            )}

            {password ? 
                isStrongPassword ? (
                    <p className="text-green-600 text-center absolute top-10 text-sm">Strong Password</p>
                    ) : (
                    <p className="text-red-500 text-center absolute top-10 text-[10px]">Password must be at least 8 characters with uppercase, lowercase, number, and special character.</p>
                )
                : (null)}
            
        </div>
        
        <div className="flex flex-col mb-8 relative justify-center items-center w-[276px] h-[40px] ">
            <AiFillLock size={20} className="text-baseBlue1 left-4 absolute z-10 " />
            <input
                className="w-full h-full text-center border border-baseBlue1 
                rounded-[25px] transition ease-in-out duration-200
                hover:bg-hpink/10"
                type={showPass2 ? "text" : "password"} 
                placeholder="Нууц үгээ давтана уу" 
                value={password2} 
                onChange={handlePasswordChange2}/>

            {showPass2 ? (
                <AiFillEye size={20} 
                    className="text-baseBlue1 right-4 absolute z-10 " 
                    onClick={changePass2}/>
            ) : (
                <AiFillEyeInvisible size={20} 
                    className="text-baseBlue1 right-4 absolute z-10 " 
                    onClick={changePass2}/>
            )}
            {password2 ? 
                isStrongPassword2 ? (
                    <p className="text-green-600 text-center absolute top-10 text-sm">Strong Password</p>
                    ) : (
                    <p className="text-red-500 text-center absolute top-10 text-[10px]">Password must be at least 8 characters with uppercase, lowercase, number, and special character.</p>
                )
                : (null)}

        </div>
        
        {error && <div style={{color: "red"}}>{error}</div>}

        {ctx.state.logginIn && <Spinner/>}
        <button 
            className="w-[276px] h-[40px] font-semibold text-center mt-6 bg-baseBlue1 
            rounded-[25px] transition ease-in-out duration-200 hover:bg-blue-700
            text-hpink"
            onClick={signupHandler} >Sign up
        </button>
        
        <button 
            className="w-[276px] h-[40px] font-semibold text-center mt-2 bg-helpGray 
            rounded-[25px] hover:bg-gray-200 transition ease-in-out duration-200
            "
            onClick={login} >Back
        </button>
    </div>
    
)
}
export default SignUp;

