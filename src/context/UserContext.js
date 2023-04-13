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
};

export const UserStore = (props) => {
    const [state, setState] = useState(initialState);

    const logout = () => {
        localStorage.setItem("token");
        localStorage.setItem("userId");
        localStorage.setItem("expireDate");
        localStorage.setItem("refreshToken");
        setState(initialState);
    }

    const loginUser = ( email, password) => {
        setState({ ...state, logginIn: true});

        const data = {
            email,
            password,
            returnSecureToken: true,
        };
        axios
        .post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCI0w2bZucN4Vex3U0DJpXPAL_-6GUlbEg', data)
        .then((result) => {
            const token = result.data.idToken;
            const userId = result.data.localid;
            const expiresIn = result.data.expiresIn;
            const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
            const refreshToken = result.data.refreshToken;

                //browser iin localstorage ruu token hadgalah heseg
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("expireDate", expireDate);
            localStorage.setItem("refreshToken", refreshToken);

            setState({ ...state, logginIn: false, error: null, errorCode: null, token, userId});
            console.log("amjilttai newterlee" + result.data);
        })
        .catch((err) => {
            setState({ ...state, logginIn: false, error: err.message, errorCode: err.code, token: null, userId: null});
        })
    }
  

    const signupUser = (email, password) => {
        setState({ ...state, saving: true});

        const data = {
            email,
            password,
            returnSecureToken: true,
        };

            axios
            // .post("/signup.json", data )
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCI0w2bZucN4Vex3U0DJpXPAL_-6GUlbEg', data)
        
            .then(result => { 
                const token = result.data.idToken;
                const userId = result.data.localid;

                localStorage.setItem("token", token);  //browser dotor token hadgalagdana
                localStorage.setItem("userId", userId);

                setState({ ...state, saving: false, token, userId , error: null, errorCode: null});

                console.log("amjilttai " + result.data);
            })
            .catch(err => {
                setState({
                    ...state, saving: false, token:null, userId: null, error: err.message, errorCode: err.code 
                });
                // console.log("amjiltgvi" + err);
            });
    };

    

    return (
        <UserContext.Provider  
        value={{ 
            state ,
            signupUser,
            loginUser,
            logout
            }}
        >
            {props.children}
        </UserContext.Provider>
    );

};
export default UserContext;