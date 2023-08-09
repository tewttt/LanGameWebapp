import React, {Fragment} from "react";
import Menuitem from "../MenuItem";
import {getAuth} from "firebase/auth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const auth = getAuth();
const Menu = () => {
  
    return (
        <div>
            <ul className="flex flex-col justify-center items-center">
                 {auth.currentUser?.uid ?
                ( 
                <Fragment>
                    <Menuitem link="/user"><AccountCircleIcon/></Menuitem> 
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