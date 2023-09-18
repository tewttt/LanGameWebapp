import React, {useContext, useState, useEffect} from "react";
import UserContext from "../../../context/UserContext";
import Modal from "../../../components/General/Modal";
import CustomerList from "./CustomerList";

const Customer = () => {
    const ctx = useContext(UserContext) 
    const [name, setName] = useState("dd")
    const [email, setEmail] = useState("h@gmail.com")
    const [phone, setPhone] = useState("44")
    const [password, setPassword] = useState("123456")
    const [password2, setPassword2] = useState("123456")
    const [confirm , setConfirm] = useState(false);
    const [error, setError] = useState("");


    const showConfirm = () => {
       setConfirm(true)
      };
      const closeConfirm = () => {
       setConfirm(false)
      };
      const addCustomer = () => {
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
            ctx.signupUser( email, password, phone)
            alert("add")
            closeConfirm();
        }}

    return (
    <div className="flex flex-col text-white">
        <button onClick={showConfirm} className="border border-gray-300 w-[200px] rounded-xl  m-1 hover:border-baseBlue hover:text-baseBlue">Хэрэглэгч нэмэх</button>
        <Modal closeConfirm={closeConfirm} show={confirm}>
            <div className="flex flex-col items-center  ">
                <p className="mb-3">Хэрэглэгч бүртгэх</p>
                <div className="flex flex-col">
                        <p className="text-[12px]">Хэрэглэгчийн нэр</p>
                        <input 
                            className="mb-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                            type="name" placeholder="Нэр" value={name} onChange={e=> setName(e.target.value)}/> 
                </div>
                <div className="flex flex-col">
                        <p className="text-[12px]">Имэйл хаяг</p>
                        <input 
                            className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                            type="email " placeholder="Имэйл" value={email} onChange={e=> setEmail(e.target.value)}/> 
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px]">Утасны дугаар</p>
                    <input 
                        className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                        type="phone " placeholder="Утасны дугаар" value={phone} onChange={e=> setPhone(e.target.value)}/> 
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px]">Нууц үг</p>
                    <input 
                        className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                        type="password" placeholder="Нууц үг" value={password} onChange={e=> setPassword(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <p className="text-[12px]">Нууц үгээ давтана уу</p>
                    <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="password" placeholder="Нууц үгээ давтана уу" value={password2} onChange={e=> setPassword2(e.target.value)}/> 
                </div>
                <div className="flex mt-5">
                    <button onClick={closeConfirm} className="mx-3 p-2 rounded-2xl border border-gray-400 hover:border-baseBlue hover:bg-baseBlue hover:text-white">Болих</button>
                    <button onClick={addCustomer} className="mx-3 p-2 rounded-2xl border border-gray-400 hover:border-baseBlue hover:bg-baseBlue hover:text-white">Хэрэглэгч нэмэх</button>
                </div>
               {error && <div style={{color: "red"}}>{error}</div>}
               {ctx.state.error && (
                  <div style={{color: "red"}}> {ctx.state.error}</div>
               )}
            </div>
         </Modal>
       
        <div className="text-white my-1 text-[12px] grid  lg:grid-cols-3 ">
            {Object(ctx.userList).map(el => (
                  <CustomerList key={el.id} data={el}/>
               
            ))}
        </div>
    </div>
)}
export default Customer;