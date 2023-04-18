import React, {useState} from "react";
import axios from "../axios";

const UserContext = React.createContext();

const initialState = {
    saving: false,
    logginIn: false,
  
    error: null,
    errorCode: null,
    token: null,
    userId: null,
    expireDate: null,
};

export const UserStore = (props) => {
    const [state, setState] = useState(initialState);

    const loginUserSucces = (token, userId, expireDate, refreshToken) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);
    
        setState({
          ...state,
          logginIn: false,
          error: null,
          errorCode: null,
          token,
          userId,
          expireDate,
        });
      };

    const logout = () => {
        localStorage.setItem("token");
        localStorage.setItem("userId");
        localStorage.setItem("expireDate");
        localStorage.setItem("refreshToken");
        setState(initialState);
    }
    const autoRenewTokenAfterMillisec = (milliSec) => {
        // token shinechleh code
        axios
          .post(
            "https://securetoken.googleapis.com/v1/token?key=AIzaSyB5jrLASKEY0LyQ1HyyHY6rxfwTm1wkqqs",
            {
              grant_type: "refresh_token",
              refresh_token: localStorage.getItem("refreshToken"),
            }
          )
          .then((result) => {
            console.log("Token refreshed .....", result.data);
            const token = result.data.id_token;
            const userId = result.data.user_id;
            const expiresIn = result.data.expires_in;
            const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
            const refreshToken = result.data.refresh_token;
    
            loginUserSucces(token, userId, expireDate, refreshToken);
          })
          .catch((err) => {
            setState({
              ...state,
              logginIn: false,
              error: err.message,
              errorCode: err.code,
              token: null,
              userId: null,
              expireDate: null,
            });
          });
    
        // avtomat logout
        setTimeout(() => {
          // logout
          autoRenewTokenAfterMillisec(3600000);
        }, milliSec);
      };

    const loginUser = ( email, password) => {
        setState({ ...state, logginIn: true});

        const data = {
            email,
            password,
            returnSecureToken: true,
        };
        axios
        .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5jrLASKEY0LyQ1HyyHY6rxfwTm1wkqqs', data)
        .then((result) => {
            // console.log(result.data)
            const token = result.data.idToken;
            const userId = result.data.localId;
            const expiresIn = result.data.expiresIn;
            const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
            const refreshToken = result.data.refreshToken;

                //browser iin localstorage ruu token hadgalah heseg
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("expireDate", expireDate);
            localStorage.setItem("refreshToken", refreshToken);

            // setState({ ...state, logginIn: false, error: null, errorCode: null, token, userId});
            // console.log( result.data);
            loginUserSucces(token, userId, expireDate, refreshToken);
        })
        .catch((err) => {
            // console.log(err.response.data.error.message)
            // console.log(err.response.data.error.code)
            setState({ ...state, 
                logginIn: false,
                 error: err.response.data.error.message, 
                 errorCode: err.response.data.error.code, 
                 token: null, 
                 userId: null,
                 expireDate: null,
                });
        })
    }
  

    const signupUser = (email, password) => {
        setState({ ...state, saving: true});

        const data = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

            axios
            // .post("/signup.json", data )
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5jrLASKEY0LyQ1HyyHY6rxfwTm1wkqqs', data)
        
            .then(result => { 
                const token = result.data.idToken;
                const userId = result.data.localId;

                localStorage.setItem("token", token);  //browser dotor token hadgalagdana
                localStorage.setItem("userId", userId);

                setState({ ...state, saving: false, token, userId , error: null, errorCode: null});

                // console.log(result.data);
            })
            .catch(err => {
               
                setState({
                    ...state, saving: false, token:null, userId: null, error: err.response.data.error.message, errorCode: err.response.data.error.code,
                });
                // if (error = INVALID_EMAIL ) {
                //     "Та имэйл хаягаа шалгана уу"
                // } else {
                //     "Нууцү үээ шалгана"
                // }
                // console.log("amjiltgvi" + err);
            });
    };

    

    return (
        <UserContext.Provider  
        value={{ 
            state ,
            signupUser,
            loginUser,
            logout,
            loginUserSucces,
            autoRenewTokenAfterMillisec,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );

};
export default UserContext;