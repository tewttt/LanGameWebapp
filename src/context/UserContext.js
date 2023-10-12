import React, { useState, useContext, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
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
  const [currentUser, setCurrentUser] = useState("");
  const [userList, setUserList] = useState([]);
  const userInfo = useRef();
  // console.log(userList)

  const userRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      let list = [];
      snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
      setUserList(list);
      // setLoading(false)
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // const docRef = doc(db, "users", "53CgOTXwY3auugcojSDQzh8nVKE2");

  useEffect(() => {
    // console.log(auth?.currentUser?.uid);
    if (auth?.currentUser) {
      const docRef = doc(db, "users", auth?.currentUser?.uid);
      onSnapshot(docRef, (doc) => {
      setCurrentUser(doc.data(), doc.id)
    });
    }

    // getDoc(docRef)
    //   .then((doc) => {
    //     console.log(doc.data(). doc.id)
    //   // setOneUser(doc.data(), doc.id)
    // })
    
  }, [auth?.currentUser]);

  const updateProfile = async (state, id) => {
    const updateUser = doc(db, "users", id);
    await updateDoc(updateUser, { state: state });
    alert(" update");
    // getUserList();
  };
  const setTeacher = (teacher, id) => {
    console.log(teacher);
    // const setUser = doc(db, "users" , id)
    // setDoc(setUser, teacher, {merge: true})
    // .then((res) => {console.log('success merge')})
    // .catch((error) => {console.log("error" + error)})
    // getUserList();
    // console.log("update profile teacher")
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
  const setProfile = async (state, id) => {
    const setUser = doc(db, "users", id);
    await setDoc(setUser, state, { merge: true })
      .then((res) => {
        console.log("success merge");
      })
      .catch((error) => {
        console.log("error" + error);
      });
    console.log("update profile");
  };

  const logout = () => {
    return signOut(auth);
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
      // alert("Амжилттай нэвтэрлээ")
      setState({ ...state, error: "", logginIn: false });
      // history.push("/lesson")
    } catch (error) {
      console.log(error);
      let message = error.message;
      if (message === "Firebase: Error (auth/wrong-password).")
        message = "Нууц үг буруу байна";
      else if (message === "Firebase: Error (auth/user-not-found).")
        message = "Имэйл хаяг олдсонгүй";
      else if (message === "Firebase: Error (auth/network-request-failed).")
        message = "Интернетээ шалгана уу";
      else if (message === "Firebase: Error (auth/invalid-login-credentials).")
        // message = "Интернетээ шалгана уу"
        setState({ ...state, error: message, logginIn: false });
    }
  }

  async function signupUser(email, password, phone, name) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setState({ ...state, error: "", logginIn: false });
      alert(" Амжилттай бүртгүүллээ");
      // console.log(db)
      setDoc(doc(db, "users", auth.currentUser?.uid), {
        // addDoc(collection(db, "users"), {
        email: email,
        password: password,
        phone: phone,
        authId: auth.currentUser?.uid,
        name: name,
      });
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
        // profilePhoto,d
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
