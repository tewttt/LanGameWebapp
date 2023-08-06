import React from "react";
import css from "./style.module.css";
import Logo from "../General/Logo";
import Menu from "../Menu";
import Shadow from "../General/Shadow";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = (props) => {
    let classes = [css.Sidebar, css.Close];
    if(props.showSidebar) {
        classes = [css.Sidebar, css.Open]
    }

    return (
        <div>
            <Shadow show={props.showSidebar} onClick={props.toggleSidebar}/>

            <div  className={classes.join(" ")}>

                <div className={css.logo}>
                {/* <Logo/> */}
                {/* <AccountCircleIcon/> */}
                </div>
                <Menu/>
            
            </div>
        </div>
    )
}

export default Sidebar;