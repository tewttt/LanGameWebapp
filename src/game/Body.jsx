import React from "react";
import zur from "../assets/img/1.jpg"
import Dice from "./Dice";
import Field from "./Field";
const Body = () => {
    // Тоглогчид тоглох хүсэлт илгээх
    // Идэвхитэй 4 тоглогчыг харуулах
    // Тоглогч дээр дарахад тоглогчын мэдээллийг харуулах. Оноо , нэр ...selection:
    // Асуултанд түрүүлж хариулсан дарааллыг тогтоох
    // Идэвхитэй тоглогчыг ялгаруулж харуулах
    // Асуултанд хариулсан дарааллаар Тоглогчид дарааллын дагуу шоо хаях
    // Шооны ээлжийг тогтоох, дараагын тоглогч руу шилжүүлэх
    // Тоглогчын морь шооны дагуу урагшаа нүүх
    // Дахин асуултанд хариулж шоо хаях дарааллыг тогтоох
    // Түрүүлж барианд орсон тоглогчыг тогтоох
    // Тоглоом дуусхад тоглогчдын оноо, байрыг харуулах

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