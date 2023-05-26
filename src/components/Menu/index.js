import React, {Fragment} from "react";
import css from "./style.module.css";
import UserContext from "../../context/UserContext";
import Menuitem from "../MenuItem";
import { useContext } from "react";
import {getAuth} from "firebase/auth";


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const auth = getAuth();
const Menu = () => {
    const ctx = useContext(UserContext);
    return (
        <div>
             {/* <ul className={css.Menu}>
                <Fragment>
                    <Menuitem link="/dashboard">Admin</Menuitem> 
                    <Menuitem link="/">Гарах</Menuitem> 
                </Fragment>
            </ul> */}
            
            <ul className={css.Menu}>
                 {auth.currentUser?.uid ?
                ( 
                <Fragment>

                <Menuitem link="/user"><AccountCircleIcon/></Menuitem> 
                {/* <Menuitem link="/admin">Admin</Menuitem>  */}
                <Menuitem link="/logout">Гарах</Menuitem> 
               
               
                </Fragment>
                ) : ( 
                <Fragment>
                <Menuitem  link="/">Нэвтрэх</Menuitem>
                <Menuitem active link="/signup">Бүртгүүлэх</Menuitem>
                </Fragment>
                 )} 
           
            </ul>

            
        </div>
    )
}
export default Menu;