import { MdOutlineCancel } from "react-icons/md";
import { useHistory } from "react-router-dom";
import React, {useContext,  useEffect , useState} from "react"
import UserContext from "../../context/UserContext";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import video from "../../../src/assets/video/1.mp4"


const TIME = 3
let intervalIds = [];

export default function WatchAdvertise () {
    const [time, setTime] = useState(TIME)
    const [showTime , setShowTime] = useState(false)
    const ctx = useContext(UserContext)
    const history = useHistory();
    const data = {
        coin: 100,
        label: "watch video",
        labelType: "ads",
        type: "deposit"
    }
        
    useEffect(() => {
        intervalIds.push( setInterval(startTimer, 1000))
         return ()=>{
          clearIntervals() 
        }
    }, []);

    const clearIntervals = () => {
    intervalIds.map(i=>clearInterval(i))
    intervalIds = [];
    }

    useEffect(() => {
        if (showTime)
        ctx.putTransaction(data)
     },[showTime])

    const startTimer = () => {
        setTime(prev =>{
            let next = prev - 1; 
            if(next <= 0) {
              next = 0
              setShowTime(true)
            }
            return next;
          }) 
    }
  
    return (
        <div className=" relative h-screen flex flex-col justify-center items-center">
            <div className="flex absolute top-0 left-0 w-full justify-between">
                <div>
                 {showTime && <MdOutlineCancel size={30} color="blue" onClick={() =>history.push("/gameHome")}/>}   
                </div>
                {!showTime &&  <div>second {time}</div>}
               
                <div>coin 100</div>
            </div>
            {/* <button onClick={() => ctx.transaction(100, "ads" )}>add coin</button> */}
            <div className="flex bg-red-300">
                <Video>
                    <source src={video}/>
                </Video>
            </div>
        </div>
    ) 
}

