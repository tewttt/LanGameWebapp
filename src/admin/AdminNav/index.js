import React from "react";
import css from "./style.module.css";
import AddLesson from "../AddLessonPage";
import AllLesson from "../AllLesson";

import Users from "../Users";
import Button from "../../components/Button";
import { NavLink, Switch , Route, useHistory } from "react-router-dom";

const AdminNav = () => {
    const history = useHistory();
    const admin_nav = [
        // {
        //     display: "Dashboard",
        //     path: "/dashboard"
        // },
        {
            display: "Add-Lesson",
            path: "/dashboard/addlesson"
        },
        {
            display: "All-Lesson",
            path: "/dashboard/alllesson"
        },
        {
            display: "Users",
            path: "/dashboard/users"
        }
    ]
    const addlesson = () => {
        history.push("/dashboard/addlesson");
    };
    const alllesson = () => {
        history.push("/dashboard/alllesson");
    };
    const users = () => {
        history.push("/dashboard/users");
    };
    return (
        <div className={css.body}>
        {/* {
            admin_nav.map((item,index )=> (
                <li className={css.adminMenuItem} key={index}>
                    <NavLink to={item.path}>{item.display}</NavLink>
                </li>
            ))
        } */}
        <div className={css.head}>
            <div className={css.box} onClick={addlesson}>Хичээл нэмэх</div>
            <div className={css.box} onClick={alllesson}>Бүх хичээл</div>
            <div className={css.box} onClick={users}>Хэрэглэгчид</div>
           
        </div>
         {/* <Button daragdsan={addlesson} text="Хичээл нэмэх " /> */}
             <Switch>
                   
                   <Route path="/dashboard/addlesson"  component={AddLesson}/>
                   <Route path="/dashboard/alllesson" component={AllLesson}/>
                   <Route path="/dashboard/users" component={Users} />
               </Switch>
        </div>
    )
}
export default AdminNav;