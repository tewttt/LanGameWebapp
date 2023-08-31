import React , {useState, useContext} from "react"
import Modal from "../../components/General/Modal";
import MemberContext from "../../context/MemberContext";
import UserContext from "../../context/UserContext";


const Member = () => {
   const ctx = useContext(MemberContext) ;
   // const ctx = useContext(UserContext) ;
   console.log(ctx)
   const [email, setEmail] = useState("yt@gmail.com");
   const [name, setName] = useState("dd");
   const [phone, setPhone] = useState("4");
   const [password, setPassword] = useState("123456");
   const [password2, setPassword2] = useState("123456");
   const [error, setError] = useState("");
   const [showPass, setShowPass] = useState(password)
 
   const [confirm , setConfirm] = useState(false)
   const showConfirm = () => {
      setConfirm(true)
     };
     const closeConfirm = () => {
      setConfirm(false)
     };

     const addMember = () => {
      if (name.length === 0) {
         // setErr({... err, phone: text.lenght < 8})
         setError(" Утасны дугаараа оруулна уу")
         return;
     }
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
      else if (password === password2) {
          setError("Нууц үг хоорондоо таарахгүй байна")
      } 
      else {
         alert("add")
         ctx.signupMember(email,password, phone,name);
        
         //  ctx.signupUser(email,password, phone);
      }
  };

   //   const addMember = () => {
   //    ctx.signupUser(email,password, phone);
   //    // ctx.signupMember(email, name, phone, password)
   //    alert("add")
   //   }
 return (
    <div className="text-white">
         <button onClick={showConfirm} className="border border-gray-300 w-[200px] rounded-xl text-white m-1 hover:border-baseBlue hover:text-baseBlue">Гишүүн нэмэх</button>
         <Modal closeConfirm={closeConfirm} show={confirm}>
            <div className="flex flex-col items-center ">
               <p>Шинэ гишүүн бүртгэх</p>
               <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="name" placeholder="Нэр" value={name} onChange={e=> setName(e.target.value)}/> 
               <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="email " placeholder="Имэйл" value={email} onChange={e=> setEmail(e.target.value)}/> 
               <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="number" placeholder="Утасны дугаар" value={phone} onChange={e=> setPhone(e.target.value)}/> 
                    <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="password" placeholder="Нууц үг" value={password} onChange={e=> setPassword(e.target.value)}/> 
                    <input 
                    className="my-2 w-[250px] h-[30px] text-center bg-blue-50 border rounded-[12px] transition ease-in-out duration-200 hover:border-blue-500  hover:border-[2px] hover:bg-blue-100"
                    type="password" placeholder="Нууц үгээ давтана уу" value={password2} onChange={e=> setPassword2(e.target.value)}/> 
               <div className="flex mt-5">
                  <button onClick={closeConfirm} className="mx-3 p-2 rounded-2xl border border-gray-400 hover:border-baseBlue hover:bg-baseBlue hover:text-white">Болих</button>
                  <button onClick={addMember} className="mx-3 p-2 rounded-2xl border border-gray-400 hover:border-baseBlue hover:bg-baseBlue hover:text-white">Гишүүнээр нэмэх</button>
               </div>
           
               {error && <div style={{color: "red"}}>{error}</div>}
               {ctx.state.error && (
                  <div style={{color: "red"}}> {ctx.state.error}</div>
               )}
            </div>

         </Modal>
         <p>Гишүүд</p>
    </div>
 )
}

export default Member;