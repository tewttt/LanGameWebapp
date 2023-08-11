import React, { useEffect } from "react";

import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { Redirect, useHistory} from "react-router-dom";

const Logout = () => {
    const ctx = useContext(UserContext);
    const history = useHistory();
   
    useEffect(() => {
        ctx.logout();
        history.push("/")
    }, []);

    return (
        <Redirect to="/"/>
    )
}
export default Logout;