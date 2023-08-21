import React, { useState, useContext } from "react";
import ToolSidebar from "./ToolSidebar";
import {auth} from "../firebase";
import UserContext from "../context/UserContext";

const Teacher = () => {
    console.log(auth.currentUser.uid)
    const ctx = useContext(UserContext)
    const profile = ctx.userList.find(
        // item => console.log(item.authId)
        item => item.authId === auth.currentUser.uid
    )
    // const id = profile.id
    // console.log(id)
    const [teacher, setTeacher] = useState(false)
    const add = () => {
        setTeacher(true)
        // ctx.setTeacher(id,teacher)

    }
    return (
        <div>
            <ToolSidebar/>
            <div className="text-white">Хэрэглэгч хичээл нэмэх</div>
            <button 
                onClick={add}
                className="border border-baseBlue text-white p-2 rounded-xl hover:bg-baseBlue ">Багш болох хүсэлт илгээх</button>
        </div>
    )
}

export default Teacher;