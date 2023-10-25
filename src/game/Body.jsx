import React, { useEffect, useState, useContext } from "react";
import zur from "../assets/img/1.jpg";
import Dice from "./Dice";
import Field from "./Field";
import Horse from "./Horse";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import GameContext from "../context/GameContext";
const auth = getAuth();

const Body = (props) => {
  // console.log(props);
  const ctx = useContext(GameContext);
  const [game, setGame] = useState({});
  const { id } = useParams();
  const [point, setPoint] = useState("");

  const positions = [
    { position: "absolute", top: 100, left: 0 },
    { position: "absolute", top: 100, right: 0 },
    { position: "absolute", bottom: 100, right: 0 },
    { position: "absolute", bottom: 100, left: 0 },
  ];

  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState("");

  const autoTurn = () => {
    setTurn((prev) => {
      let next = prev + 1;
      if (next > 2) next = 0;
      return next;
    });
  };
  const onDiceChange = (val) => {
    // console.log(val);
    // setDice(val);
    ctx.addPoint(props.id, val);
    // shoo hayna
    // 1. Nuudel
    // 2. Eeljee shiljiilne
    // autoTurn();
  };

  return (
    // <div className="flex flex-col m-auto  ">
    <div className="relative w-full h-full">
      {props?.players?.map((e, i) => {
        return (
          <>
            <div
              id={e}
              style={{ ...positions[i] }}
              className="flex flex-col items-center "
              key={i}
            >
              <p className="text-[10px]">{e.state.name}</p>
              <img src={zur} className="w-[50px] h-[50px] rounded-[50%] " />
              <p className="text-[10px]">Level</p>

              {turn === i && <Dice id={i} onDiceChange={onDiceChange} />}
            </div>
          </>
        );
      })}
      <div className="absolute top-6 left-11">
        <Field players={props?.players} />
      </div>
    </div>

    // </div>
  );
};

export default Body;

// useEffect(() => {
//   if (ctx.games) {
//     const game = ctx.games.find((item) => item.id === id);
//     setGame(game);
//   }
// }, [ctx.games]);

{
  /* {turn === i && (
              <div className="absolute top-6 left-11">
                <Field point={e.point} playerId={i} />
              </div>
            )} */
}
{
  /* <Field dice={dice} /> */
}
{
  /* <Horse move={move}/> */
}
// Тоглогчид тоглох хүсэлт илгээх
// Идэвхитэй 4 тоглогчыг
// Тоглогч дээр дарахад тоглогчын мэдээллийг харуулах. Оноо , нэр ...selection:
// Асуултанд түрүүлж хариулсан дарааллыг тогтоох
// Идэвхитэй тоглогчыг ялгаруулж харуулах
// Асуултанд хариулсан дарааллаар Тоглогчид дарааллын дагуу шоо хаях

// Шооны ээлжийг тогтоох, дараагын тоглогч руу шилжүүлэх
// Тоглогчын морь шооны дагуу урагшаа нүүх

// Дахин асуултанд хариулж шоо хаях дарааллыг тогтоох
// Түрүүлж барианд орсон тоглогчыг тогтоох
// Тоглоом дуусхад тоглогчдын оноо, байрыг харуулах

// Busad toglogchiig 30sec hvleeh spinner vzvvleh
// Game iin olon shiree vvsgeh
// toglolt duussanii daraa shireeg tsewerleh
// toglogchiin ner, zurgiiig haruulah
// 4 toglogchiin medeelliig db tsugluulaad , haruulah
// toglogchdiin medeelliig haruulah
// Active toglogchiig haruulah
// Active toglogch shoo hayh
// Active toglogchiin moriig nvdnii dugaaar dr awaachih
// Active toglogchiin onoog hadgalah , daraagiin togloltond haruulah

// useEffect(() => {
//     if(props.game.players){
//         setPlayers(props.game.players)
//     }
// }, [props.game.players])

// console.log(players)

// const redPlayer = {
//   bg: "red",
//   path: [1, 2, 3, 4],
//   currentPosition: 0,
//   curretStep: null,
//   // control: "#",
// };
// const bluePlayer = {
//   bg: "blue",
//   path: [1, 2, 3, 4],
//   currentPosition: 1,
//   curretStep: null,
//   // control: "#",
// };
// const purplePlayer = {
//   bg: "purple",
//   path: [1, 2, 3, 4],
//   currentPosition: 2,
//   curretStep: null,
//   // control: "#",
// };
// const orangePlayer = {
//   bg: "orange",
//   path: [1, 2, 3, 4],
//   currentPosition: 3,
//   curretStep: null,
//   // control: "#",
// };
