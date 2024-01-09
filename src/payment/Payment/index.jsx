import React , {useContext, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import { FaExchangeAlt } from "react-icons/fa";
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
            <div className="pt-14">
                <p>amount : {ctx?.currentUser?.amount}₮</p>
                <p>coins : {ctx?.currentUser?.coins}</p>
                <p>account ID : {ctx?.currentUser?.userID}</p>
            </div>
            <div className="bg-hpink text-baseColor mt-6 flex flex-col items-center w-[300px] h-[300px] m-auto p-6">
                <p className=" m-2">Currency converter</p>
                <div className="">
                    <p>Enter amount</p>
                    <input placeholder="" type="number"/>
                </div>
                <div className="flex justify-around my-3 items-center">
                    <div>
                        <p>From</p>
                    <select>
                        <option>coin</option>
                        <option>amount</option>

                    </select>
                    </div>
                    <FaExchangeAlt size={20} color=""/>
                    <div>
                        <p>To</p>
                    <select>
                        <option>coin</option>
                        <option>amount</option>
                    </select>
                    </div>
                </div>
                <p className="m-2"> = </p>
                <button className="w-[200px] bg-baseColor text-white m-auto rounded-2xl">Exchange</button>
            </div>
        </div>
    )
}

export default Payment;