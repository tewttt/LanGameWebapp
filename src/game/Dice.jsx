import { useState } from "react";
import React from "react";
import zur from "../assets/img/1.jpg"
import dice1 from "../assets/img/11.png";
import dice2 from "../assets/img/2.png";
import dice3 from "../assets/img/3.png";
import dice4 from "../assets/img/4.png";
import dice5 from "../assets/img/5.png";
import dice6 from "../assets/img/6.png";

const Dice = () => {
    var dices = [
        dice1, dice2, dice3, dice4, dice5, dice6
    ]
    const [newDice, setNewDice] = useState(zur)
    const rollDice = () => {
        var random = Math.floor(Math.random() * 6) ;
        setNewDice(dices[random])
    }
   
    return (
        <div onClick={rollDice}>
            <img className="" src={newDice}></img>
        </div>
    )
}
export default Dice;