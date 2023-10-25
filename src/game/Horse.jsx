import React, { useState } from "react";
import redHorse from "../assets/img/redHorse.png";
import blueHorse from "../assets/img/blueHorse.png"
import orangeHorse from "../assets/img/orangeHorse.png"
import purpleHorse from "../assets/img/purpleHorse.png"
const Horse = (props) => {
    // console.log(props.move)

    const [step, setStep ] = useState("")
    const [road, setRoad] = useState("")
   
    return (
        <div className="flex">
            <img src={blueHorse} className="w-10 h-10  p-0 " />
            <img src={orangeHorse} className="w-10 h-10  p-0 " />
            <img src={purpleHorse} className="w-10 h-10  p-0 " />
            <img src={redHorse} className="w-10 h-10  p-0 " />
        </div>

    )
}
export default Horse; 