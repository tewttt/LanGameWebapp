import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  increment,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes,  getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router-dom";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPhoneNumber,
  sendPasswordResetEmail,

} from "firebase/auth";


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

export const UserStore = (props) => {
  const history = useHistory();
  const [state, setState] = useState(initialState);
  const [transaction , setTransaction] = useState([])
  const [currentUser, setCurrentUser] = useState("");
 const [photo, setPhoto] = useState()
  const [userList, setUserList] = useState([]);
  const userInfo = useRef()
  const [userIdCount, setUserIdCount] = useState("")
  

  const userRef = collection(db, "users");
// get userlist data
  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      let list = [];
      snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
      setUserList(list);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // curretUSer iin Posts data
  useEffect(() => {
    if (auth?.currentUser?.uid) {
      const docRef = doc(db, "users", auth?.currentUser?.uid);
      onSnapshot(docRef, (doc) => {
      setCurrentUser(doc.data(), doc.id)
      });

      const trRef =collection(db, `users/${auth?.currentUser?.uid}/transaction`)
    
      onSnapshot(trRef, (snapshot) => {
        let list = [];
        snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
        setTransaction(list);
      });
    }

    const userRef = doc(db, `report/user`)
      onSnapshot(userRef, (doc) => {
        // console.log(doc.data())
        setUserIdCount(doc.data())
      })


  }, [auth?.currentUser?.uid]);

  const updateProfile = async (state, id) => {
    const updateUser = doc(db, "users", id);
    await updateDoc(updateUser, { state: state });
    alert(" update");
    // getUserList();
  };

 
 
  const setProfilePhoto = async (state, id) => {
    // console.log(state)
    const setUser = doc(db, "users", id);
    await setDoc(setUser, state, { merge: true })
      .then((res) => {
        console.log("success merge");
      })
      .catch((error) => {
        console.log("error" + error);
      });
    // getUserList();
    console.log("update profile");
  };

  const deleteUser = async (id) => {
    // console.log(id)
    const User = doc(db, "users", id);
    await deleteDoc(User);
    // getUserList();
  };
  const setProfile = async (data, id) => {
    // console.log(data )
    const setUser = doc(db, "users", id);
    await updateDoc(setUser, data)
    // await setDoc(setUser, data, { merge: true })

      .then((res) => {
        console.log("success merge");
      })
      .catch((error) => {
        console.log("error" + error);
      });
    console.log("update profile");
  };
  const logout = () => {
    signOut(auth);
    history.push("/")
    
    // auth
    // .signOut()
    // .then(() => {
    // })
    // .catch(error => alert(error))
  };
 
  async function loginUser(email, password) {
    setState({ ...state, logginIn: true });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log(auth?.currentUser.uid , email, password)
      // alert("Амжилттай нэвтэрлээ")
      setState({ ...state, error: "", logginIn: false });
      // history.push("/lesson")
    } catch (error) {
      console.log(error);
      let message = error.message;
      if (message === "Firebase: Error (auth/wrong-password).") {
        message = "Нууц үг буруу байна"
        setState({ ...state, error: message, logginIn: false });
      }
      else if (message === "Firebase: Error (auth/user-not-found).")
      {
        message = "Имэйл хаяг олдсонгүй";
        setState({ ...state, error: message, logginIn: false });
      }
      else if (message === "Firebase: Error (auth/network-request-failed).")
      {
        message = "Интернетээ шалгана уу";
        setState({ ...state, error: message, logginIn: false });
      }
        
      else if (message === "Firebase: Error (auth/invalid-login-credentials).") {
        message = "Алдаа"
        setState({ ...state, error: message, logginIn: false });
      }
       
    }
  }

  const download = () => {
    const photoname = "profile.jpg"
    const photoRef = ref(storage, `test/${photoname}`);
   
    getDownloadURL(photoRef)
      .then((url) => {
        setPhoto(url)
        // console.log(url);
      })
      .catch((error) => {
        console.error('Error getting download URL:', error);
      });
  };

 
  useEffect(() => {
    download()
  } ,[])
 
 
  async function signupUser(email, password, phone, name ) {
    try {
     const {user} = await createUserWithEmailAndPassword(auth, email, password);
      // download()
      // send email verification
     
      await sendEmailVerification(user);
      alert("Email check")
      setDoc(doc(db, "users", auth.currentUser?.uid), {
        // addDoc(collection(db, "users"), {
        email: email,
        password: password,
        phone: phone,
        authId: auth.currentUser?.uid,  
        name: name,
        status: false,
        coins: 2000,  
        amount: 0,
        statusCoin: false, 
        photo,
        winGame: 0,
        matchGame: 0,
        gender: "",
        age: "",
        role: "user"
      });

      const oneRef = collection(db, `users/${auth?.currentUser?.uid}/transaction`);
      await addDoc(oneRef , {
        createDate: serverTimestamp(),  
      })
      history.push("/login")
    } catch (error) {
      console.log(error);
      let message = error.message;
      if (
        message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      )
        message = "Нууц үг хамгийн багадаа 6 оронтой байх хэрэгтэй";
      else if (message === "Firebase: Error (auth/invalid-email).")
        message = "Зөв имэйл бичнэ.";
      else if (message === "Firebase: Error (auth/email-already-in-use).")
        message = "Бүртгэлтэй имэйл байна";
      else if (message === "Firebase: Error (auth/network-request-failed).")
        message = "Интернетээ шалгана уу";
      setState({ ...state, error: message, logginIn: false });
    }
  }
  

  const forgotPassword = async (email) => {
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);

      // console.log('Password reset email sent successfully');
      alert('Check your email for password reset instructions.');
      history.push("/login")
  
    } catch (error) {
      // Handle errors
      // console.error('Error sending password reset email:', error);
      alert('Error sending password reset email. Please try again.');
    }
  };
  

  

  //  useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged( async user => {
  //     if(user) {
  //       setCurrentUser(user)
  //       // setLoading(false)
  //     }

  //   })
  //   return unsubscribe
  //  }, [])

  return (
    <UserContext.Provider
      value={{
        state,
        userList,
        signupUser,
        loginUser,
        logout,
        userInfo,
        currentUser,
        updateProfile,
        setProfile,
        setProfilePhoto,
        deleteUser,
        transaction,
        forgotPassword,
      
       
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;

// async function loginUserPhone(phone, password) {
//   setState({ ...state, logginIn: true });
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//     // console.log(auth?.currentUser.uid , email, password)
//     // alert("Амжилттай нэвтэрлээ")
//     setState({ ...state, error: "", logginIn: false });
//     // history.push("/lesson")
//   } catch (error) {
//     console.log(error);
//     let message = error.message;
//     if (message === "Firebase: Error (auth/wrong-password).") {
//       message = "Нууц үг буруу байна"
//       setState({ ...state, error: message, logginIn: false });
//     }
//     else if (message === "Firebase: Error (auth/user-not-found).")
//     {
//       message = "Имэйл хаяг олдсонгүй";
//       setState({ ...state, error: message, logginIn: false });
//     }
//     else if (message === "Firebase: Error (auth/network-request-failed).")
//     {
//       message = "Интернетээ шалгана уу";
//       setState({ ...state, error: message, logginIn: false });
//     }
      
//     else if (message === "Firebase: Error (auth/invalid-login-credentials).") {
//       message = "Алдаа"
//       setState({ ...state, error: message, logginIn: false });
//     }
     
//   }
// }


// async function signupUserPhone(password, phone,) {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     // send email verification
    
//     await sendEmailVerification(userCredential.user);
  
//     setState({ ...state, error: "", logginIn: false });
   
//     alert(" Амжилттай бүртгүүллээ");
//     // console.log(db)
//     setDoc(doc(db, "users", auth.currentUser?.uid), {
//       // addDoc(collection(db, "users"), {
//       email: email,
//       password: password,
//       phone: phone,
//       authId: auth.currentUser?.uid,  
//       name: name,
//       photo: "",
//       status: false,
//       coins: 0,
//       amount: 0,
//       statusCoin: false,
//       photo: "../assets/img/ironman.png",
//       winGame: 0,
//       matchGame: 0,
    
//       // userID: increment(countUserID)
//     });

//     const oneRef = collection(db, `users/${auth?.currentUser?.uid}/transaction`);
//     await addDoc(oneRef , {
//       createDate: serverTimestamp(),  
//     })
//     alert("Email check")
//     history.push("/verification")

//   } catch (error) {
//     console.log(error);
//     let message = error.message;
//     if (
//       message ===
//       "Firebase: Password should be at least 6 characters (auth/weak-password)."
//     )
//       message = "Нууц үг хамгийн багадаа 6 оронтой байх хэрэгтэй";
//     else if (message === "Firebase: Error (auth/invalid-email).")
//       message = "Зөв имэйл бичнэ.";
//     else if (message === "Firebase: Error (auth/email-already-in-use).")
//       message = "Бүртгэлтэй имэйл байна";
//     else if (message === "Firebase: Error (auth/network-request-failed).")
//       message = "Интернетээ шалгана уу";
//     setState({ ...state, error: message, logginIn: false });
//   }
// }

// const loginFacebook = async() => {
  
// }
  
// const signupFacebook = async() => {
//   console.log("facebook")
//   console.log(auth)
//   console.log(providerFacebook)
//   signInWithPopup(auth, providerFacebook)
//   .then((result) => {
//     console.log(result)
//     // The signed-in user info.
//     const user = result.user;

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;

//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   })
//   .catch((error) => {
//     console.log(error)
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = FacebookAuthProvider.credentialFromError(error);

//     // ...
//   });
// }
// const signupGmail = async() => {
//   console.log("gmail")
//   signInWithPopup(auth, providerGoogle)
//   .then((result) => {
//     console.log(result)
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     console.log(error)
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
// }



// const addCoins = async(coins) => {
  //   // console.log(coins)
  //   const PlayersRef = doc(db, "users", auth?.currentUser?.uid);
  //   await updateDoc(PlayersRef, { coins: increment(coins) });
  //   // alert("coin nemegdlee");
  // }

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
