import React, {useContext, useState} from "react";
import UserContext from "../../context/UserContext";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"
import Modal from "../../components/General/Modal";



const Customer = () => {
    const ctx = useContext(UserContext) 
    const [name, setName] = useState("dd")
    const [email, setEmail] = useState("h@gmail.com")
    const [phone, setPhone] = useState("44")
    const [password, setPassword] = useState("123456")
    const [password2, setPassword2] = useState("123456")
    const [confirm , setConfirm] = useState(false);
    const [error, setError] = useState("");
//    console.log(password + "  " + password2)
//    console.log(ctx.signupUser)
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
            ctx.signupUser(name, email, phone, password)
            alert("add")
        }
      
      }
 
    // console.log(ctx.userList.id)
    const remove =  () => {
        alert("deeeleete")
    //    ctx.deleteUser(id)
    }
    const view = () => {
        // history.push(`/lesson/${props.lesson.id}`)
    }
    const edit = () => {
    // history.push(`/edit/${props.lesson.id}` )
   }
    // console.log(ctx.userList)
    return (
    <div className="flex flex-col text-white">
        <button onClick={showConfirm} className="border border-gray-300 w-[200px] rounded-xl  m-1 hover:border-baseBlue hover:text-baseBlue">Хэрэглэгч нэмэх</button>
        <Modal closeConfirm={closeConfirm} show={confirm}>
            <div className="flex flex-col items-center ">
               <p>Хэрэглэгч бүртгэх kkkkkkkk</p>
               <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="name" placeholder="Нэр" value={name} onChange={e=> setName(e.target.value)}/> 
               <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="email " placeholder="Имэйл" value={email} onChange={e=> setEmail(e.target.value)}/> 
               <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="phone " placeholder="Утасны дугаар" value={phone} onChange={e=> setPhone(e.target.value)}/> 
                 <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="password" placeholder="Нууц үг" value={password} onChange={e=> setPassword(e.target.value)}/>
                    <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="password" placeholder="Нууц үгээ давтана уу" value={password2} onChange={e=> setPassword2(e.target.value)}/> 
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
                // console.log(el.id)
                <div key={el.id} className="border border-gray-500 rounded-[6px] w-[350px] md:w-[450px]  h-[30px] my-1 mx-4 flex justify-between items-center " >
                    <img src={el.photo} className="w-[25px] h-[25px]"/>
                    <div className="mx-1">{el.email}</div>
                    <div className="mx-1">user id:</div>
                    <div className="mx-1">{el.phone}</div>
                   
                    <AiFillDelete size={20} className="hover:text-baseBlue hover:rotate-12" onClick={remove} />
                    <AiFillEdit  size={20} className="hover:text-baseBlue  hover:scale-125" onClick={edit}/>
                   
                </div>
            ))}
        </div>
    </div>
)}
export default Customer;