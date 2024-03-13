import React , {useContext} from "react"

import UserContext from "../../context/UserContext"
import { FaCoins } from "react-icons/fa";
const GameNavbar = () => {
    const ctx = useContext(UserContext)
  
return (
    <div className="m-auto flex w-full justify-around items-center my-4 sm:w-[80%] md:w-[50%] xl:w-[30%] p-2  rounded-2xl">

        <div className="flex flex-col items-center text-lg">
            <img src={ctx?.currentUser?.photo} className=" w-14 h-14 rounded-[50%]" />
            <p className="">{ctx?.currentUser?.name}</p>
        </div>
        <div className="flex ">
            <FaCoins className="text-yellow-400 mx-3" size={26}/>
            <p className="text-2xl"> {ctx?.currentUser?.coins}</p>
        </div>
    </div>
)
}
export default GameNavbar;