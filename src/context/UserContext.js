import React, {useState, useContext, useEffect, useRef} from "react";
import { collection, addDoc, getDocs, setDoc,doc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebase";
import {useHistory} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";

const auth = getAuth();

const UserContext = React.createContext();
const initialState = {
    logginIn: false,
    error: null,
    errorCode: null,
    token: null,
    userId: null,
    expireDate: null,
};
const initialData = {
  photo: "",
  name: "",
  phone: "",
  email: "",
  password: "",
  check: ""
}

export const UserStore = (props) => {
  const history = useHistory();
  const [state, setState] = useState(initialState);
  const [data, setData] = useState(initialData)
  const [userList, setUserList] = useState([])
  const [currentUser, setCurrentUser] = useState(null);
  const userInfo = useRef();
//  console.log(userList)

  const userRef = collection(db, "users");
    useEffect (() => {
      getUserList();
  }, []);

  const profilePhoto = (url) => {setData({...data, photo: url})}

  const updateProfile = async (id) =>{
  const updateUser = doc(db, "users" ,id)
  await updateDoc(updateUser, {state: state})
  alert(" update")
  getUserList();
  }
  const setTeacher = () => {

  }
  const setProfilePhoto = async ( id) => {
    const setUser = doc(db, "users" , id)
    setDoc(setUser, state, {merge: true})
    .then((res) => {console.log('success merge')})
    .catch((error) => {console.log("error" + error)})
    getUserList();
    console.log("update profile")
}
  const setProfile = async (state, id) => {
      const setUser = doc(db, "users" , id)
      setDoc(setUser, state, {merge: true})
      .then((res) => {console.log('success merge')})
      .catch((error) => {console.log("error" + error)})
      getUserList();
      console.log("update profile")
  }

  const getUserList = async () => {
    try {
      const data = await getDocs(userRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setUserList(filteredData)
    } catch (err) {
      console.log(err)
    }
  }
  const deleteUser = async (id) => {
    const User = doc(db, "users" , id);
    await deleteDoc(User);
    getUserList();

  }
  const logout = () => {
    return signOut(auth)
    // auth
    // .signOut()
    // .then(() => {
    // })
    // .catch(error => alert(error))
  }

  async function loginUser(email, password) {
    setState({...state, logginIn: true})
       try {
          await signInWithEmailAndPassword (auth, email,password);
          // alert("Амжилттай нэвтэрлээ")
          setState({...state,error: "",logginIn: false })
          // history.push("/lesson")
       } catch (error) {
          console.log(error)
          let message = error.message;
          if ( message === "Firebase: Error (auth/wrong-password).")
              message = "Нууц үг буруу байна";
          else if ( message === "Firebase: Error (auth/user-not-found).")
              message = "Имэйл хаягаа зөв оруулна уу";
          else if ( message === "Firebase: Error (auth/network-request-failed).")
            message = "Интернетээ шалгана уу"
          setState({...state,error: message,logginIn: false })
  }}
    
  async function signupUser(email, password, phone) {
       try {
          await createUserWithEmailAndPassword(auth, email, password);
          alert(" Амжилттай бүртгүүллээ")
          setState({...state,error: "",logginIn: false })
          addDoc(collection(db, "users" ), {
              email: email,
              password: password,
              phone: phone,
              authId: auth.currentUser.uid
          })
          .then(() => {
              console.log("amjilttai")
              setState({...state,error: "",logginIn: false })
          })
          .catch((error) => {
              console.log(error)
              setState({...state,error: "",logginIn: false })
          })
       } catch (error) {
          let message = error.message;
          if ( message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
              message = "Нууц үг хамгийн багадаа 6 оронтой байх хэрэгтэй";
          else if ( message === "Firebase: Error (auth/invalid-email).")
              message = "Имэйл хаягаа зөв бичнэ үү";
              setState({...state,error: message,logginIn: false })
       }
  };
    //  useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, async user => {
    //     setCurrentUser(user)
    //     setLoading(false)
    //   })
    //   return unsubscribe
    //  }, [])

    return (
        <UserContext.Provider  
        value={{ 
            state ,
            userList,
            signupUser,
            loginUser,
            logout,
            userInfo,
            currentUser,
            updateProfile,
            profilePhoto,
            setProfile,
            setProfilePhoto,
            deleteUser,
            setTeacher,
            // loginUserSucces,
            // autoRenewTokenAfterMillisec,
            // uploadImage
            }}
        >
            {props.children}
        </UserContext.Provider>
    );

};
export default UserContext;




// const loginUserSucces = (token, userId, expireDate, refreshToken) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("userId", userId);
//   localStorage.setItem("expireDate", expireDate);
//   localStorage.setItem("refreshToken", refreshToken);

//   setState({
//     ...state,
//     logginIn: false,
//     error: null,
//     errorCode: null,
//     token,
//     userId,
//     expireDate,
//   });
// };

// const logout = () => {
//   localStorage.setItem("token");
//   localStorage.setItem("userId");
//   localStorage.setItem("expireDate");
//   localStorage.setItem("refreshToken");
//   setState(initialState);
// }
// const autoRenewTokenAfterMillisec = (milliSec) => {
//   // token shinechleh code
//   axios
//     .post(
//       "https://securetoken.googleapis.com/v1/token?key=AIzaSyB5jrLASKEY0LyQ1HyyHY6rxfwTm1wkqqs",
//       {
//         grant_type: "refresh_token",
//         refresh_token: localStorage.getItem("refreshToken"),
//       }
//     )
//     .then((result) => {
//       console.log("Token refreshed .....", result.data);
//       const token = result.data.id_token;
//       const userId = result.data.user_id;
//       const expiresIn = result.data.expires_in;
//       const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
//       const refreshToken = result.data.refresh_token;

//       loginUserSucces(token, userId, expireDate, refreshToken);
//     })
//     .catch((err) => {
//       setState({
//         ...state,
//         logginIn: false,
//         error: err.message,
//         errorCode: err.code,
//         token: null,
//         userId: null,
//         expireDate: null,
//       });
//     });

//   // avtomat logout
//   setTimeout(() => {
//     // logout
//     autoRenewTokenAfterMillisec(3600000);
//   }, milliSec);
// };

// const loginUser = ( email, password) => {
//   setState({ ...state, logginIn: true});

//   const data = {
//       email,
//       password,
//       returnSecureToken: true,
//   };
//   axios
//   .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5jrLASKEY0LyQ1HyyHY6rxfwTm1wkqqs', data)
//   .then((result) => {
//       // console.log(result.data)
//       const token = result.data.idToken;
//       const userId = result.data.localId;
//       const expiresIn = result.data.expiresIn;
//       const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
//       const refreshToken = result.data.refreshToken;

//           //browser iin localstorage ruu token hadgalah heseg
//       localStorage.setItem("token", token);
//       localStorage.setItem("userId", userId);
//       localStorage.setItem("expireDate", expireDate);
//       localStorage.setItem("refreshToken", refreshToken);

//       // setState({ ...state, logginIn: false, error: null, errorCode: null, token, userId});
//       // console.log( result.data);
//       loginUserSucces(token, userId, expireDate, refreshToken);
//       // setState({ ...state, error:null })
//   })
//   .catch((err) => {
//       // console.log(err.response.data.error.message)
//       // console.log(err.response.data.error.code)
//       setState({ ...state, 
//           logginIn: false,
//            error: err.response.data.error.message, 
//            errorCode: err.response.data.error.code, 
//            token: null, 
//            userId: null,
//            expireDate: null,
//           });
//   })
// }


// const signupUser = (email, password) => {
//   setState({ ...state, saving: true});

//   const data = {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//   };

//       axios
//       // .post("/signup.json", data )
//       .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5jrLASKEY0LyQ1HyyHY6rxfwTm1wkqqs', data)
  
//       .then(result => { 
//           const token = result.data.idToken;
//           const userId = result.data.localId;

//           localStorage.setItem("token", token);  //browser dotor token hadgalagdana
//           localStorage.setItem("userId", userId);

//           setState({ ...state, saving: false, token, userId , error: null, errorCode: null});

//           // console.log(result.data);
//       })
//       .catch(err => {
         
//           setState({
//               ...state, saving: false, token:null, userId: null, error: err.response.data.error.message, errorCode: err.response.data.error.code,
//           });
//           // if (error = INVALID_EMAIL ) {
//           //     "Та имэйл хаягаа шалгана уу"
//           // } else {
//           //     "Нууцү үээ шалгана"
//           // }
//           // console.log("amjiltgvi" + err);
//       });
// };

// const uploadImage = (formData) => {
// axios.post("/user/image", formData)
// .then(res => {
// console.log("amjillta")
// })
// .catch(err => console.log(err))

// }