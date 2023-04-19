import React, {Fragment} from "react";
import css from "./style.module.css";
import UserContext from "../../context/UserContext";
import Menuitem from "../MenuItem";
import { useContext } from "react";

const Menu = () => {
    const ctx = useContext(UserContext);
    return (
        <div>
            
            <ul className={css.Menu}>
                {ctx.state.userId ? 
                (
                <Fragment>
                <Menuitem link="/dashboard">Admin</Menuitem> 
               
                <Menuitem link="/">Гарах</Menuitem> 
               
               
                </Fragment>
                ) : ( 
                <Fragment>
                <Menuitem active link="/">Нэвтрэх</Menuitem>
                <Menuitem active link="/signup">Бүртгүүлэх</Menuitem>
                </Fragment>
                )}


              
                
           
            </ul>
        </div>
    )
}
export default Menu;