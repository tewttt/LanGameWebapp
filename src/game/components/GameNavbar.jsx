import React , {useContext} from "react"
import zur from "../../assets/img/earth.jpg"
import UserContext from "../../context/UserContext"

const GameNavbar = () => {
    const ctx = useContext(UserContext)
  
return (
    <div className="flex justify-between mt-6 mx-6 rounded-xl px-6 bg-white items-center">
        <div className="h-14 w-14 flex items-center rounded-[50%]">
            
            <img src={ctx?.currentUser?.photo} className=" w-full h-full rounded-[50%]" />
            <p className="text-[10px] ">{ctx?.currentUser?.name}</p>
        </div>
        <div>coin {ctx?.currentUser?.coins}</div>
    </div>
)
}
export default GameNavbar;