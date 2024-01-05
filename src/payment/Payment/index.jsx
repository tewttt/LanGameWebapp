import React , {useContext, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
// TO DO
// amount -s coins -ru swith hiih
// Орлого хийх заавар
// Зарлага хийх 

const Payment = () => {
    const ctx = useContext(UserContext)
    console.log(ctx.currentUser)
    return (
        <div>
            <ToolSidebar/>
            <div className="pt-14 text-white">
                <p>amount : {ctx?.currentUser?.amount}₮</p>
                <p>coins : {ctx?.currentUser?.coins}</p>
                <p>account ID : {ctx?.currentUser?.userID}</p>
            </div>
        </div>
    )
}

export default Payment;