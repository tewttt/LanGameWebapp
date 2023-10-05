import React from "react";
import zur from "../assets/img/1.jpg"
import Dice from "./Dice";
import Field from "./Field";
import Horse  from './Horse'
const Body = () => {
    // Тоглогчид тоглох хүсэлт илгээх
    // Идэвхитэй 4 тоглогчыг 
    // Тоглогч дээр дарахад тоглогчын мэдээллийг харуулах. Оноо , нэр ...selection:
    // Асуултанд түрүүлж хариулсан дарааллыг тогтоох
    // Идэвхитэй тоглогчыг ялгаруулж харуулах
    // Асуултанд хариулсан дарааллаар Тоглогчид дарааллын дагуу шоо хаях

    // Шооны ээлжийг тогтоох, дараагын тоглогч руу шилжүүлэх
    // Тоглогчын морь шооны дагуу урагшаа нүүх

    // Дахин асуултанд хариулж шоо хаях дарааллыг тогтоох
    // Түрүүлж барианд орсон тоглогчыг тогтоох
    // Тоглоом дуусхад тоглогчдын оноо, байрыг харуулах

    // Busad toglogchiig 30sec hvleeh spinner vzvvleh
    // Game iin olon shiree vvsgeh
    // toglolt duussanii daraa shireeg tsewerleh
    // toglogchiin ner, zurgiiig haruulah
    // 4 toglogchiin medeelliig db tsugluulaad , haruulah
    // toglogchdiin medeelliig haruulah
    // Active toglogchiig haruulah
    // Active toglogch shoo hayh
    // Active toglogchiin moriig nvdnii dugaaar dr awaachih
    // Active toglogchiin onoog hadgalah , daraagiin togloltond haruulah

    return (
        <div className="flex h-[600px] justify-between mt-10 w-full">
            {/* left */}
            <div className=" flex flex-col w-[50px] justify-evenly">
                <div className="flex flex-col items-center ">
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
            <div className="flex flex-col justify-center items-center">
                <Field/>
                <Horse/>
            </div>
           
             {/* right */}
             <div className=" flex flex-col w-[50px] justify-evenly">
                <div className="flex flex-col items-center">
                    <p className="text-[10px]">player3</p>
                    <img src={zur} className="w-[50px] h-[50px] border rounded-[50%] p-0"/>
                    <p className="text-[10px]">Level</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-[10px]">player4</p>
                    <img src={zur} className="w-[50px] h-[50px] border rounded-[50%] p-0"/>
                    <p className="text-[10px]">Level</p>
                </div>
            </div>
        </div>
    )
}

export default Body;