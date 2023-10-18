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
  const ctx = useContext(GameContext);
  const [game, setGame] = useState({});
  const { id } = useParams();

  const redPlayer = {
    bg: "red",
    path: [1, 2, 3, 4],
    currentPosition: 0,
    curretStep: null,
    // control: "#",
  };
  const bluePlayer = {
    bg: "blue",
    path: [1, 2, 3, 4],
    currentPosition: 1,
    curretStep: null,
    // control: "#",
  };
  const purplePlayer = {
    bg: "purple",
    path: [1, 2, 3, 4],
    currentPosition: 2,
    curretStep: null,
    // control: "#",
  };
  const orangePlayer = {
    bg: "orange",
    path: [1, 2, 3, 4],
    currentPosition: 3,
    curretStep: null,
    // control: "#",
  };
  useEffect(() => {
    if (ctx.games) {
      const game = ctx.games.find((item) => item.id === id);
      setGame(game);
    }
  }, [ctx.games]);

  const positions = [
    { position: "absolute", top: 100, left: -45 },
    { position: "absolute", top: 100, right: -45 },
    { position: "absolute", top: 300, right: -45 },
    { position: "absolute", bottom: 10, left: -45 },
  ];

  const [active, setActive] = useState();
  const [turn, setTurn] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("");

  const autoTurn = () => {
    let i = 0;
    for (i = 0; i < 4; i++) {
      if (currentPlayer === 0) {
        console.log("dd");
        break;
      }
    }
  };
  const onDiceChange = (val) => {
    console.log(val);
    // 1. Nuudel
    // 2. Eeljee shiljiilne
  };

  return (
    <div className="flex flex-col m-auto  ">
      <div className="relative">
        {game?.players?.map((e, i) => {
          console.log(e);
          return (
            <div
              id={e}
              style={{ ...positions[i] }}
              className="flex flex-col items-center "
              key={i}
            >
              <p className="text-[10px]">{e.state.name}</p>
              <img
                src={zur}
                style={{ ...redPlayer }}
                className="w-[50px] h-[50px] rounded-[50%] "
              />
              <p className="text-[10px]">Level</p>

              {turn === i && <Dice id={i} onDiceChange={onDiceChange} />}
            </div>
          );
        })}
      </div>
      <Field />
      <Horse />
    </div>
  );
};

export default Body;

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
