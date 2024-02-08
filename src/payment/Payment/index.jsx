import React , {useContext, useEffect, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import { FaExchangeAlt } from "react-icons/fa";
import usePayment from "../../hook/usePayment";
import backImage from "../../assets/logo/backgroundSmall.png"
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
        <div className="bg-baseBlack h-screen relative"> 
            <ToolSidebar/>
            <div 
                className="bg-cover absolute top-0 left-0 -z-20 opacity-80 w-screen h-screen"
                style={{backgroundImage: `url(${backImage})`}}>
            </div>
            <div className="md:pt-14">
                <div className="rounded-2xl text-white w-[300px] mt-4 px-10 py-4 flex flex-col m-auto">
                    <div className="flex my-1 justify-between border py-2 px-6 rounded-xl border-helpGray">
                        <p>name</p>
                        <p className="font-bold">{ctx?.currentUser?.name}</p>
                    </div>
                    <div className="flex my-1 justify-between border py-2 px-6 rounded-xl border-helpGray">
                        <p>amount</p>
                        <p className="font-bold">{ctx?.currentUser?.amount}₮</p>
                    </div>
                    <div className="flex my-1 justify-between border py-2 px-6 rounded-xl border-helpGray">
                        <p>coins</p>
                        <p className="font-bold"> {ctx?.currentUser?.coins}</p>
                    </div>
                    <div className="flex my-1 justify-between border py-2 px-6 rounded-xl border-helpGray">
                        <p>account ID</p>
                        <p className="font-bold">{ctx?.currentUser?.userID}</p>
                    </div>
                    
                </div>
                <div className="text-white mt-6 flex flex-col items-center w-[300px] h-[300px] m-auto p-4">
                    <p className="m-2 text-lg font-bold">Currency converter</p>
                    <div className="border border-helpGray p-3 rounded-xl">
                        <div className="flex flex-col">
                            <p className="text-center mb-2">Enter amount</p>
                            <input 
                            className="rounded-lg py-1 text-center text-black px-10"
                            onChange={(e) => setEnterValue(e.target.value)} placeholder="" type="number"/>
                        </div>
                        <div className="flex justify-around my-3 items-center w-[260px]">
                            <p>From</p>
                            <select 
                                className="py-1 px-2 rounded-lg text-black"
                                onChange={changeFrom}
                            >
                                <option>choose</option>
                                <option>coin</option>
                                <option>₮</option>
                            </select>
                            <FaExchangeAlt size={20} color=""/>
                            <p>To</p>
                            <p>{to}</p>
                        </div>
                    </div>

                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ): (
                        <div className="m-2 text-lg font-bold">
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
                    className="w-[200px] bg-baseBlue1 p-2 text-white m-auto rounded-2xl">Exchange</button>
                </div>
            </div>
        </div>
    )
}

export default Payment;