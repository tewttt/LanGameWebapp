import React from "react";
import { NavLink } from "react-router-dom";
import css from "./style.module.css";

const MenuItem = (props) => {
    return (
        <div>
            <li className={css.MenuItem}>
            <NavLink exact={props.exact} activeClassName={css.active} to={props.link}>
            {props.children}
            </NavLink>

               {/* <a
                className={props.active ? css.active : null} 
                 href={props.link}> {props.children}</a> */}
            </li>
        </div>
    )
}
export default MenuItem;