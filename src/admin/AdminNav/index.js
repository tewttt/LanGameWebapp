import React from "react";
import AddLesson from "../AddLessonPage";
import AllLesson from "../AllLesson";
import Users from "../Users";
import { Switch , Route, useHistory } from "react-router-dom";

const AdminNav = () => {
    const history = useHistory();
   
    const addlesson = () => {
        history.push("/dashboard");
    };
    const alllesson = () => {
        history.push("/dashboard/alllesson");
    };
    const users = () => {
        history.push("/dashboard/users");
    };
    // console.log(history.location)
    return ( 
        <div className="flex flex-col md:flex md:flex-row ">
            <div className="flex m-2 justify-between md:justify-start md:ml-0 md:flex-col md:border-r md:border-r-gray-400 md:px-5 ">
                <div className={`${history.location.pathname == '/dashboard' ? 'border border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `} 
                    onClick={addlesson}>Хичээл нэмэх</div>
                <div 
                    className={`${history.location.pathname == '/dashboard/alllesson' ? 'border border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `}
                    onClick={alllesson}>Бүх хичээл</div>
                <div 
                    className={`${history.location.pathname == '/dashboard/users' ? 'border border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `}
                    onClick={users}>Хэрэглэгчид</div>
            </div>
            <Switch> 
                <Route path="/dashboard/alllesson" component={AllLesson}/>
                <Route path="/dashboard/users" component={Users} />
                <Route path="/dashboard"  component={AddLesson}/>
            </Switch>
        </div>
)}
export default AdminNav;