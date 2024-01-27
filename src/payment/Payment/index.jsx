import React , {useContext, useEffect, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import { FaExchangeAlt } from "react-icons/fa";
import usePayment from "../../hook/usePayment";
// TO DO

// Орлого хийх заавар
// Зарлага хийх 

const Payment = () => {
    const {exchange} = usePayment()
    const [from, setFrom] = useState("")
    const [to , setTo] = useState("")
    const [enterValue , setEnterValue] = useState("")
    const [totalValue , setTotalValue] = useState("")
    const [error, setError] = useState("")
    const ctx = useContext(UserContext)

    const changeFrom = (e) => {
     if( e.target.value === "coin"){
        setFrom(e.target.value)
        setTo("₮")
     } else {
        setFrom(e.target.value)
        setTo("coin")
     }}

useEffect(() => {
    if(from === "₮" && to === "coin") {
    // amonut hasaaad , coin nemne 
    // amount- entervalue
    // coin + total
        const total =  enterValue*40
        setTotalValue(total)
        setError("")
     } else if (from === "coin" && to === "₮" ) {
    // coin hasaad , amount nemne
    // coin - entervalue
    // amount + total
        const tot = enterValue/40
        setTotalValue(tot)
        setError("")
     } else {
         setError("choose the correct value")
     }
} ,[from , to , enterValue])

const chahngeExchange = () => {
    if( from === "₮" &&  ctx?.currentUser?.amount >= enterValue){
        exchange(ctx?.currentUser?.authId , enterValue, from, to)
    } 
    else if( from === "coin" && ctx?.currentUser?.coins > enterValue){
        exchange(ctx?.currentUser?.authId , enterValue, from, to)
    } else {
        setError(`Not enough:  ${from} `  )
    }
 }
   
    return (
        <div>
            <ToolSidebar/>
            <div className="pt-14">
                <p>name : {ctx?.currentUser?.name}</p>
                <p>amount : {ctx?.currentUser?.amount}₮</p>
                <p>coins : {ctx?.currentUser?.coins}</p>
                <p>account ID : {ctx?.currentUser?.userID}</p>
            </div>
            <div className="bg-hpink text-baseColor mt-6 flex flex-col items-center w-[300px] h-[300px] m-auto p-6">
                <p className=" m-2">Currency converter</p>
                <div className="">
                    <p>Enter amount</p>
                    <input onChange={(e) => setEnterValue(e.target.value)} placeholder="" type="number"/>
                </div>
                <div className="flex justify-around my-3 items-center">
                    <div>
                        <p>From</p>
                    <select 
                      onChange={changeFrom}
                    >
                        <option>choose</option>
                        <option>coin</option>
                        <option>₮</option>
                    </select>
                    </div>
                    <FaExchangeAlt size={20} color=""/>
                    <div>
                        <p>To</p>
                        <p>{to}</p>
                    </div>
                </div>
                {error ? (
                    <p>{error}</p>
                ): (
                     <div className="m-2">
                        {from === "coin" ? (
                            <div>
                                {enterValue} coin =   {totalValue} ₮
                            </div>
                        ) : (
                            <div>
                                {totalValue} coin = {enterValue} ₮
                            </div>
                        )}
                   </div>
                )}
               
                <button 
                onClick={chahngeExchange}
                className="w-[200px] bg-baseColor text-white m-auto rounded-2xl">Exchange</button>
            </div>
        </div>
    )
}

export default Payment;