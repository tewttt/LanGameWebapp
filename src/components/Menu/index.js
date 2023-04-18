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
               
               
                <Menuitem link="/">Гарах</Menuitem> 
                </Fragment>
                )
                 : ( <Menuitem active link="/">Нэвтрэх</Menuitem>)}
           
                
           
            </ul>
        </div>
    )
}
export default Menu;