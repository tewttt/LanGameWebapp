import React , {useContext, useEffect, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import { FaExchangeAlt } from "react-icons/fa";
import usePayment from "../../hook/usePayment";
import pattern from "../../assets/logo/patternWhite.png"
const Payment = () => {
    const {exchange} = usePayment()
    const [from, setFrom] = useState("")
    const [to , setTo] = useState("")
    const [enterValue , setEnterValue] = useState(1000)
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
    else if( from === "coin" && ctx?.currentUser?.coins >= enterValue){
        exchange(ctx?.currentUser?.authId , enterValue, from, to)
    } else {
        setError(`Not enough:  ${from} `  )
    }
 }
   
    return (
        <div className="relative flex text-white bg-baseBlack flex-col pt-6 px-6 pb-44 md:pt-0"> 
            <div 
                className="bg-cover bg-center opacity-10 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
            <div className="z-30"><ToolSidebar/></div>
            
            <div className="md:pt-20 z-20 md:w-[80%] lg:w-[60%] xl:w-[46%] w-full items-center m-auto">
                <div className="border border-helpGray rounded-2xl mt-2 w-full p-2">
                    <p className="text-lg text-center ">Орлого хийх заавар</p>
                    <div className="text-gray-400 p-2 ">
                        <p className="">Данс эзэмшигч: <span className="font-bold text-white text-lg">ГЭРЭЛМАА РАГЧАА</span></p>
                        <p>Дансны дугаар: <span className="font-bold text-lg text-white">824004542</span></p>
                        
                        <p>Утга : <span className="font-bold text-lg text-white">Утасны дугаар , account ID </span></p>
                        <p className="text-gray-400">Жишээ:   998xxx88 10010009</p>
                        
                    </div>
                    <div className="bg-helpGray py-2 px-6 rounded-2xl text-baseBlack my-2">
                        <p className="text-red-500 text-2xl text-center">АНХААР </p>
                        <p className="text-center">6000₮ доош гүйлгээ орохгүй тул 6000₮ буюу түүнээс дээш гүйлгээ хийнэ үү!!! 30-40 минутын дотор данс цэнэглэгдэнэ. </p>
                    </div>
                </div>
                <div className="sm:flex justify-center items-center w-full">
                    <div className="rounded-2xl w-full flex flex-col sm:mx-2 py-6 px-6">
                        <div className="flex my-1 justify-between ">
                            <p>Name</p>
                            <p className="font-bold">{ctx?.currentUser?.name}</p>
                        </div>
                        <div className="flex my-1 justify-between  ">
                            <p>Amount</p>
                            <p className="font-bold">{ctx?.currentUser?.amount}₮</p>
                        </div>
                        <div className="flex my-1 justify-between  ">
                            <p>Coin</p>
                            <p className="font-bold"> {ctx?.currentUser?.coins}</p>
                        </div>
                        <div className="flex my-1 justify-between  ">
                            <p>Account ID</p>
                            <p className="font-bold">{ctx?.currentUser?.userID}</p>
                        </div>
                        <div className="flex my-1 justify-between  ">
                            <p>Phone</p>
                            <p className="font-bold">{ctx?.currentUser?.phone}</p>
                        </div>
                        
                    </div>
                    <div className="flex flex-col w-full">
                        <p className="m-2 text-lg font-bold text-center">Currency converter</p>
                        <div className="border border-helpGray p-3 rounded-xl">
                            <div className="flex flex-col">
                                <p className="text-center mb-2">Enter amount</p>
                                <input 
                                className="rounded-lg py-1 text-center text-black px-10"
                                value={enterValue}
                                onChange={(e) => setEnterValue(e.target.value)} 
                                placeholder="write here" 
                                type="number"/>
                            </div>
                            <div className="flex justify-around my-3 items-center w-full">
                                <p>From</p>
                                <select 
                                    className="py-1 px-2 rounded-lg text-black"
                                    onChange={changeFrom}
                                    // value={from}
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
                            <p className="text-helpGreen mt-2 text-center">{error}</p>
                        ): (
                            <div className="m-2 text-2xl text-center font-bold">
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
                        className="my-4 w-[200px] bg-baseBlue1 hover:bg-baseBlue1/80 text-[24px] font-bold p-2 text-white m-auto rounded-2xl">Exchange</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Payment;