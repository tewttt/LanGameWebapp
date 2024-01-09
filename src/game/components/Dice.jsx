import { useState } from "react";
import React from "react";
import zur from "../../assets/game/base.png";
import dice1 from "../../assets/game/one.png";
import dice2 from "../../assets/game/two.png";
import dice3 from "../../assets/game/tree.png";
import dice4 from "../../assets/game/four.png";
import dice5 from "../../assets/game/five.png";
import dice6 from "../../assets/game/six.png";

const Dice = (props) => {
  
  var dices = [dice1, dice2, dice3, dice4, dice5, dice6];
  const [newDice, setNewDice] = useState(zur);

  const rollDice = () => {
    var random = Math.floor(Math.random() * 6);
    setNewDice(dices[random]);
    // props.onDiceChange(dices[random]);
    // console.log(random)
    props.onDiceChange(random);
  };

  return (
    <div>
      <div onClick={rollDice} id="dice">
        <img className="w-12 h-12" src={newDice}></img>
      </div>
    </div>
  );
};
export default Dice;
