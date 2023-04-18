import React, { useEffect } from "react";
import css from "./style.module.css";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { Redirect} from "react-router-dom";

const Logout = () => {
    const ctx = useContext(UserContext);
    // console.log(ctx.logout)
    useEffect(() => {
        ctx.logout();
      
    }, []);
    return (
        <Redirect to="/"/>
    )
}
export default Logout;