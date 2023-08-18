import React from "react";
import zur from "../assets/img/1.jpg"
import Dice from "./Dice";
import Field from "./Field";
const Body = () => {
    return (
        <div className="flex h-[600px] justify-between">
            {/* left */}
            <div className=" flex flex-col w-[50px] justify-evenly">
                <div className="flex flex-col items-center">
                    <p className="text-[10px]">player1</p>
                    <img src={zur} className="w-[50px] h-[50px] border rounded-[50%] p-0"/>
                    <p className="text-[10px]">Level</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[10px]">player2</p>
                    <img src={zur} className="w-[50px] h-[50px] border rounded-[50%] p-0"/>
                    <p className="text-[10px]">Level</p>
                </div>
                <Dice/>
            </div>
             {/* field */}
             <Field/>
             {/* right */}
             <div className=" flex flex-col w-[50px] justify-evenly">
                <div className="flex flex-col items-center">
                    <p className="text-[10px]">player1</p>
                    <img src={zur} className="w-[50px] h-[50px] border rounded-[50%] p-0"/>
                    <p className="text-[10px]">Level</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[10px]">player2</p>
                    <img src={zur} className="w-[50px] h-[50px] border rounded-[50%] p-0"/>
                    <p className="text-[10px]">Level</p>
                </div>
            </div>
        </div>
    )
}

export default Body;