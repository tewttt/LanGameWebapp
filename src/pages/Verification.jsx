import React, { useState, useContext, useEffect } from "react";
import Logo from "../assets/logo/Typo Logo SVG Blue.svg"
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import {AiFillPhone} from "react-icons/ai";
import OTPInput , {ResendOTP} from "otp-input-react"
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updatePhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";

const auth = getAuth();

export default function Verification() {
  const ctx = useContext(UserContext);
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verId, setVerId] = useState(true)
  const [showCaptcha, setShowCaptcha] = useState(true)
  const [error , setError] = useState("")

 useEffect(()=> {
    setPhone("+" + ctx?.currentUser?.phone)
    signUpdate("+" + ctx?.currentUser?.phone)
 } ,[ctx?.currentUser])

  const signUpdate = async (number) => {
   const fuser = auth?.currentUser
// console.log(fuser.phone) 
   if(fuser && fuser.phoneNumber !== phone) {
      try {
          const verifier = new RecaptchaVerifier('recaptcha-container', {
              // callback: (response) => console.log('callback', response),
              // size: 'invisible',
          }, auth);
          const provider = new PhoneAuthProvider(auth);
           const verificationId = await provider.verifyPhoneNumber(number, verifier);
           setVerId(verificationId)
           setShowCaptcha(false)
      } catch(error) {
        let message = error.message
          // console.error(error);
        setError(message)
      }
    } 
  }

  const sendCode = async() => {
    try{
      await updatePhoneNumber(
        auth.currentUser,
        PhoneAuthProvider.credential(verId, code));
        alert("lucky")
        history.push("/profile")
    } catch (error) {
      let message = error.message
      setError(message)
    }
    
  }

  // sign in phone number
  const signin = async() => {
    console.log(phone)
    // console.log('auth',auth);
    window.recaptchaVerifier = new RecaptchaVerifier(  'recaptcha-container', {
  // 'size': 'normal',
  // 'callback': (response) => {
  //   console.log(response)
  //   // reCAPTCHA solved, allow signInWithPhoneNumber.
  //   // ...
  // },
  // 'expired-callback': () => {
  //   // Response expired. Ask user to solve reCAPTCHA again.
  //   // ...
  // }
  },auth);

    const appVerifier = window.recaptchaVerifier;
    // if (phone === "" || phone.length < 10) return;
    if (phone === "") return;


    signInWithPhoneNumber(auth, phone, appVerifier)
    .then((confirmationResult) => {
      console.log(confirmationResult )
      // setVer(false)
      window.confirmationResult = confirmationResult;
    }).catch((error) => {
      console.log(error)
    });  
};

// console.log(showCaptcha)

  return (
    <div className="flex flex-col bg-white justify-center items-center w-screen h-screen">
     <img src={Logo} className="w-[190px] h-[80px] mb-10"/>
        {error && (
          <div style={{color: "red"}}> {error}</div>
        )}

        <div className="my-5 border
         border-baseBlue1 flex flex-row relative rounded-2xl items-center w-[276px] h-[40px] ">
          <AiFillPhone size={20} className=" absolute left-4 text-baseBlue1" />
          {/* <p className="text-black text-center absolute left-[60px]">{phone}</p> */}
          <input
            className="w-full h-full text-center border border-baseBlue1 
            rounded-[25px] transition ease-in-out duration-200
             hover:bg-hpink/10"
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

      {showCaptcha === true ? (
        <div 
         className="w-[276px]"
         id="recaptcha-container"
         >
        </div>
      ) : (
        <div className="bg-helpGray m-2 p-1 w-[300px]">           
          <OTPInput value={code} 
          // onChange={setOTP} 
          className=""
          onChange={ setCode}
          autoFocus 
          OTPLength={6} 
          otpType="number" 
          disabled={false} 
            // secure
          />
           <button 
            onClick={sendCode}
            className="w-full p-2 font-semibold text-center mt-6 bg-baseBlue1 
            rounded-[25px] transition ease-in-out duration-200 text-white"
            >Send verification code 
          </button>
        </div>  
      )}  
     
      

       <button 
            onClick={() => history.push("/profile")}
            className="w-[276px] h-[40px] font-semibold text-center mt-6 bg-baseBlue1 
            rounded-[25px] transition ease-in-out duration-200 text-white"
        >Back
       </button>
    </div>
  );
}

