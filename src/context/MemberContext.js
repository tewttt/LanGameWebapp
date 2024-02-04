import React, {useState, useContext, useEffect} from "react";
import { collection, addDoc, onSnapshot, getDocs, setDoc,doc, updateDoc, deleteDoc} from "firebase/firestore";
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
    const [memberList, setMemberList] = useState([])

    const memberRef = collection(db, "members");

    useEffect (() => {
        const unsubscribe  = onSnapshot(memberRef, (snapshot) => {
          let list = []
          snapshot.docs.map((doc) => list.push({...doc.data(), id: doc.id}))
          setMemberList(list)
          // setLoading(false)
      })
      return ()=>{
        unsubscribe();
        
      }
      },[]);

   

    // const getMemberList = async () => {
    // try {
       
    //     const data = await getDocs(memberRef);
    //     const filteredData = data.docs.map((doc) => ({
    //     ...doc.data(), 
    //     id: doc.id
    //     }))
    //     setMemberList(filteredData)
    // } catch (err) {
    //     console.log(err)
    //     let message = err.message;
    //     if ( message === "FirebaseError: Quota exceeded.")
    //         message = "Квот хэтэрсэн";
    
    //     setState({...state, error: message,logginIn: false })
    // }}
     
    const deleteMember = async (id) => {
        // console.log(id)
        const Member = doc(db, "members" , id);
        await deleteDoc(Member);
        // getMemberList();
    
    }
    async function loginMember (email, password) {
        setState({...state, logginIn: true})
           try {
              await signInWithEmailAndPassword (auth, email,password);
              alert("Амжилттай нэвтэрлээ")
              setState({...state,error: "",logginIn: false })
              // history.push("/lesson")
           } catch (error) {
              console.log(error)
              let message = error.message;
              if ( message === "Firebase: Error (auth/wrong-password).")
                  message = "Нууц үг буруу байна";
              else if ( message === "Firebase: Error (auth/user-not-found).")
                  message =  "Имэйл хаяг олдсонгүй";
              else if ( message === "Firebase: Error (auth/network-request-failed).")
                message = "Интернетээ шалгана уу"
              setState({...state,error: message,logginIn: false })
      }}

    async function signupMember(email,name,phone,password, role) {
     
        try {
           await createUserWithEmailAndPassword(auth, email, password);
         
           alert("Гишүүн Амжилттай бүртгүүллээ")
           setState({...state,error: "",logginIn: false })
           addDoc(collection(db, "members" ), {
                email: email,
                name: name,
                phone: phone,
                password: password,
                role: role,
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
            state,
            memberList,
            deleteMember,
            loginMember
            }}
        >
            {props.children}
        </MemberContext.Provider>
    );

};
export default MemberContext;




