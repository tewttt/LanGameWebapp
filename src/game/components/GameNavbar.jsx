import React , {useContext} from "react"

import UserContext from "../../context/UserContext"
import { FaCoins } from "react-icons/fa";
const GameNavbar = () => {
    const ctx = useContext(UserContext)
  
return (
    <div className="m-auto flex w-full justify-around items-center my-4 sm:w-[80%] md:w-[50%] xl:w-[30%] p-2 border-2 border-helpGray rounded-2xl">

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