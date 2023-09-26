import React from "react";
import { Switch , Route, useHistory } from "react-router-dom";
import Customer from "./Customer/Customer";
import Member from "./Member/Member";


const Users = () => {
    const history= useHistory();
    const customers = () => {
        history.push("/dashboard/users/")
    };
    const members = () => {
        history.push("/dashboard/users/members")
    };
    // console.log(history.location.pathname)
   
    return (
    <div className="flex flex-col mt-12">
        <div className="flex">
            <button className={`${history.location.pathname == '/dashboard/users' ? 'border mx-3 border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `} 
                onClick={customers}>Хэрэглэгчид </button>
            <button 
                className={`${history.location.pathname == '/dashboard/users/members' ? 'border mx-3 border-baseBlue bg-blue-700 text-white' : ''} flex justify-center items-center w-[100px] h-[30px]  bg-blue-50 p-1 border border-gray-600 rounded-[5px] text-[12px] hover:bg-blue-500  `}
                onClick={members}>Гишүүд</button>
            

        </div>
        <Switch>                 
            <Route path="/dashboard/users/members" component={Member} />
            <Route path="/dashboard/users/" component={Customer}/>
        </Switch>
       
    </div>
)}
export default Users;