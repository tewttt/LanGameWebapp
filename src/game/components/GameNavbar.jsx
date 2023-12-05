import React , {useContext} from "react"
import zur from "../../assets/img/earth.jpg"
import UserContext from "../../context/UserContext"

const GameNavbar = () => {
    const ctx = useContext(UserContext)
  
return (
    <div className="flex justify-between">
        <div className="h-14 w-14 relative rounded-[50%] border border-green-400">
            <p className="text-[10px] absolute -top-3 left-4">name</p>
            <img src={zur} className="absolute p-0 top-0 left-0 w-full h-full rounded-[50%]" />
        </div>
        <div>coin {ctx.currentUser.coins}</div>
    </div>
)
}
export default GameNavbar;