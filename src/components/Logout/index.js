import React, { useEffect } from "react";
import css from "./style.module.css";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { Redirect, useHistory} from "react-router-dom";
import {getAuth} from "firebase/auth";
const auth = getAuth();


const Logout = () => {
    const ctx = useContext(UserContext);
    const history = useHistory();
    // console.log(ctx.logout)
    useEffect(() => {
        ctx.logout();
        history.push("/")
    }, []);

    return (
        <Redirect to="/"/>
    )
}
export default Logout;