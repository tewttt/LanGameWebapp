import React from "react";
import { NavLink } from "react-router-dom";


const MenuItem = (props) => {
    return (
        <div>
            <li className="w-[80px] h-[40px] flex justify-center items-center bg-gray-500 border border-blue-200 hover:bg-blue-500 ">
                <NavLink exact={props.exact} 
                    ClassName="bg-red-600"
                    to={props.link}>
                    {props.children}
                </NavLink>
            </li>
        </div>
    )
}
export default MenuItem;