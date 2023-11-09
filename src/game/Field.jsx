import React, { useState } from "react";
import blueHorse from "../assets/img/blueHorse.png";
import orangeHorse from "../assets/img/orangeHorse.png";
import redHorse from "../assets/img/redHorse.png";
import purpleHorse from "../assets/img/purpleHorse.png";
import useGame from "../hook/useGame";
import { useParams } from "react-router-dom";

const Field = (props) => {
  const horses = {
    blue: blueHorse,
    orange: orangeHorse,
    red: redHorse,
    purple: purpleHorse,
  };
  const { id } = useParams();
  const { players } = useGame(id);
  const [field, setField] = useState(Array(60).fill(null));

  const fieldUsers = (fieldNum) => {
    const playersFil = players?.filter(
      (item) => item.point == fieldNum
      // console.log(item.point)
    );
    return playersFil;
  };

  return (
    <div className=" grid grid-cols-5 w-[300px] pl-3 ml-2">
      {field.map((value, i) => {
        const players = fieldUsers(i);
        return (
          <div className="w-[40px] h-[40px] bg-green-800 shadow hover:shadow-gray-900 text-white text-sm  rounded-[50%]">
            {i}
            {players?.map((e, i) => {
              return (
                <img src={horses[e.color]} className="w-20 h-18 p-0" key={i} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Field;


// <div>
//   {horses.map((e, i) => {
//     <img src={e} className="w-20 h-18 p-0" key={i} />;
//   })}
// </div>

// if (i == 0) {
//   <img src={blueHorse} className="w-20 h-18 p-0" key={i} />;
// } else if (i == 1) {
//   <img src={redHorse} className="w-20 h-18 p-0" key={i} />;
// } else if (i == 2) {
//   <img src={orangeHorse} className="w-20 h-18 p-0" key={i} />;
// } else {
//   <img src={purpleHorse} className="w-20 h-18 p-0" key={i} />;
// }

// return (
//   <div className="w-[40px] h-[40px] bg-green-800 shadow hover:shadow-gray-900  rounded-[50%]">
//     {horses.map((e, i) => {
//       // 1. Adilhan onootoi toglogchdiig olno
//       // fieldUsers(e)
//       // props.playerId === i && (
//       //   <img src={e} className="w-20 h-18 p-0" key={i} />
//       // );
//       // console.log(e);
//       return <img src={e} className="w-20 h-18 p-0" key={i} />;
//     })}
//   </div>
// );
