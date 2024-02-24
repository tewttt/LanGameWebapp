import { useState } from "react";
import React from "react";
import zur from "../../assets/game/l.png";
import dice1 from "../../assets/game/1.png";
import dice2 from "../../assets/game/2.png";
import dice3 from "../../assets/game/3.png";
import dice4 from "../../assets/game/4.png";
import dice5 from "../../assets/game/5.png";
import dice6 from "../../assets/game/6.png";

const Dice = (props) => {
  var dices = [dice1, dice2, dice3, dice4, dice5, dice6];
  const [newDice, setNewDice] = useState(zur);
  const rollDice = () => {
    var random = Math.floor(Math.random() * 6);
    setNewDice(dices[random]);
    // props.onDiceChange(dices[random])
    props.onDiceChange(random);
  };

  return (
    <div>
      <div onClick={rollDice} id="dice">
        <img className="w-11 h-11" src={newDice}></img>
      </div>
    </div>
  );
};
export default Dice;
