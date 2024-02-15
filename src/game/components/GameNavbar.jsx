import React , {useContext} from "react"

import UserContext from "../../context/UserContext"
import { FaCoins } from "react-icons/fa";
const GameNavbar = () => {
    const ctx = useContext(UserContext)
  
return (
    <div className="flex w-full md:w-[50%] md:pt-20  
    border-2 border-helpGray text-white
    m-auto justify-between rounded-xl px-6 py-2 items-center">
        <div className="h-14 w-14 flex items-center rounded-[50%]">
            <img src={ctx?.currentUser?.photo} className=" w-full h-full rounded-[50%]" />
            <p className="text-[10px] ">{ctx?.currentUser?.name}</p>
        </div>
        <div className="flex ">
            <FaCoins className="text-yellow-400 mx-3" size={20}/>
            <p> {ctx?.currentUser?.coins}</p>
        </div>
    </div>
)
}
export default GameNavbar;