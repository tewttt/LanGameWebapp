import React from "react";
import AddLesson from "../../page/AddLessonPage/index.jsx";
import AllLesson from "../../page/AllLesson/index.js";
import Users from "../../Users/User.jsx";
import Ads from "../../page/Ads.jsx";
import { Switch , Route, useHistory } from "react-router-dom";
import Teacher from "../../page/Teacher.jsx";

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
    const ads = () => {
        history.push("/dashboard/ads");
    };
    const teacher = () => {
        history.push("/dashboard/teacher");
    };
    // console.log(history.location)
    return ( 
        <div className="flex flex-col md:flex md:flex-row ">
            <div className="flex m-2 mt-12 justify-between md:justify-start md:ml-0 md:flex-col md:border-r md:border-r-gray-400 md:px-5 ">
                <div className={`${history.location.pathname == '/dashboard' ? 'border border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `} 
                    onClick={addlesson}>Хичээл нэмэх</div>
                <div 
                    className={`${history.location.pathname == '/dashboard/alllesson' ? 'border border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `}
                    onClick={alllesson}>Бүх хичээл</div>
                <div 
                    className={`${history.location.pathname == '/dashboard/users' ? 'border border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `}
                    onClick={users}>Хэрэглэгчид</div>
                <div 
                    className={`${history.location.pathname == '/dashboard/ads' ? 'border border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `}
                    onClick={ads}>Advertise
                </div>
                <div 
                    className={`${history.location.pathname == '/dashboard/teacher' ? 'border border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `}
                    onClick={teacher}>Teacher
                </div>
            </div>
            <Switch> 
                <Route path="/dashboard/alllesson" component={AllLesson}/>
                <Route path="/dashboard/users" component={Users} />
                <Route path="/dashboard/ads" component={Ads}/>
                <Route path="/dashboard/teacher" component={Teacher}/>
                <Route path="/dashboard"  component={AddLesson}/>
            </Switch>
        </div>
)}
export default AdminNav;