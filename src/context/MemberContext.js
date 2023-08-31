import React, {useState, useContext, useEffect} from "react";
import { collection, addDoc, getDocs, setDoc,doc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebase";
import {useHistory} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";

const auth = getAuth();
// console.log(auth.currentUser)
const MemberContext = React.createContext();
const initialState = {
    logginIn: false,
    error: null,
    errorCode: null,
    token: null,
    userId: null,
    expireDate: null,
};

const initialData = {
    phone: "",
    email: "",
    password: "",
    
  }

export const MemberStore = (props) => {
    const [state, setState] = useState(initialState);

    async function signupMember(email, name, phone, password) {
     
        try {
           await createUserWithEmailAndPassword(auth, email, password);
         
           alert("Гишүүн Амжилттай бүртгүүллээ")
           setState({...state,error: "",logginIn: false })
           addDoc(collection(db, "members" ), {
               email: email,
               name: name,
               password: password,
               phone: phone,
               authId: auth.currentUser?.uid
           })
           .then(() => {
               console.log("amjilttai")
               setState({...state,error: "",logginIn: false })
           })
           .catch((error) => {
               console.log(error)
               setState({...state,error: "",logginIn: false })
               console.log(error)
           })
        } catch (error) {
           let message = error.message;
           if ( message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
               message = "Нууц үг хамгийн багадаа 6 оронтой байх хэрэгтэй";
           else if ( message === "Firebase: Error (auth/invalid-email).")
               message = "Зөв имэйл бичнэ үү";
               setState({...state,error: message,logginIn: false })
        }
   };
    return (
        <MemberContext.Provider  
        value={{ 
            signupMember,
            state
            }}
        >
            {props.children}
        </MemberContext.Provider>
    );

};
export default MemberContext;




