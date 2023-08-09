import { useContext, useState } from "react";
import React from "react";
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Spinner from "../../components/General/Spinner";

const SignUp = () => {
    const ctx = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [err, setErr] = useState({
        phone: false
    })

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
        else if (password == password2) {
            setError("Нууц үг хоорондоо таарахгүй байна")
        } else {
            ctx.signupUser(email,password, phone);
            history.push("/")
        }
    };

   const login = () => {history.push("/")}
    return (
        <div className="flex flex-col justify-center items-center text-gray-700 max-w-[1540px] mx-auto">
            <div className="text-6xl font-bold text-[#1974C7] p-10">Мэдлэг</div>
            {/* {ctx.state.userId && <Redirect to="/"/>} */}
            <div className="flex flex-col bg-[#383030] w-[300px] h-[350px] border-2 border-[#1974C7] p-5 items-center rounded-[20px]">
                
                <input className="w-[250px] h-[30px] text-center bg-gray-300 m-2" type="number" placeholder="Phone" value={phone} onChange={e=> setPhone(e.target.value)} required/> 
                <input className="w-[250px] h-[30px] text-center bg-gray-300 m-2" type="email " placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/> 
                <input className="w-[250px] h-[30px] text-center bg-gray-300 m-2" type="password" placeholder="Нууц үг" value={password} onChange={e=>setPassword(e.target.value)}/>
                <input className="w-[250px] h-[30px] text-center bg-gray-300 m-2" type="password" placeholder="Нууц үгээ давтан оруулна уу" value={password2} onChange={e=>setPassword2(e.target.value)}/>
                {error && <div style={{color: "red"}}>{error}</div>}

                {ctx.state.error && (
                    <div style={{color: "red"}}> {ctx.state.error}</div>
                )}

                {ctx.state.logginIn && <Spinner/>}
                <button className="btn p-2 bg-[#1974C7]  w-[200px] h-[40px] text-base hover:bg-blue-500 items-center" onClick={signupHandler} > Бүртгүүлэх</button>
                <button className="bg-[#383030] text-base font-300 text-white hover:text-[#1974C7] w-[200px] h-[40px]" onClick={login} >Нэвтрэх</button>
            </div>
        </div>
    )
}
export default SignUp;