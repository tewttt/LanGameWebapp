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
        <div className="flex flex-col md:flex md:flex-row ">
        {/* {
            admin_nav.map((item,index )=> (
                <li className={css.adminMenuItem} key={index}>
                    <NavLink to={item.path}>{item.display}</NavLink>
                </li>
            ))
        } */}
            <div className="flex m-2 justify-center md:justify-start md:ml-0 md:flex-col md:border-r ">
                <div className="md:m-2 mx-1 flex justify-center items-center w-[100px] h-[30px]  bg-gray-200 p-1 rounded-[5px] text-[12px] hover:bg-blue-500  " 
                    onClick={addlesson}>Хичээл нэмэх</div>
                <div 
                    className="md:m-2 mx-1 flex justify-center items-center w-[100px] h-[30px]  bg-gray-200 p-1 rounded-[5px] text-[12px] hover:bg-blue-500  "
                    onClick={alllesson}>Бүх хичээл</div>
                <div 
                    className="md:m-2 mx-1 flex justify-center items-center w-[100px] h-[30px]  bg-gray-200 p-1 rounded-[5px] text-[12px] hover:bg-blue-500  " 
                    onClick={users}>Хэрэглэгчид</div>
            
            </div>
       
             <Switch>
                   
                   <Route path="/dashboard/addlesson"  component={AddLesson}/>
                   <Route path="/dashboard/alllesson" component={AllLesson}/>
                   <Route path="/dashboard/users" component={Users} />
               </Switch>
        </div>
    )
}
export default AdminNav;