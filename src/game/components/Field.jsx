import React, { useState } from "react";
import blueHorse from "../../assets/img/blueHorse.png";
import orangeHorse from "../../assets/img/orangeHorse.png";
import redHorse from "../../assets/img/redHorse.png";
import purpleHorse from "../../assets/img/purpleHorse.png";
import useGame from "../../hook/useGame";
import { useParams } from "react-router-dom";
import grass from '../../assets/game/grass.png'
import greenTree from "../../assets/game/greenTree.png"
import greenTwoTree from "../../assets/game/greenTwoTree.png"
import oneGrass from "../../assets/game/oneGrass.png"
import road from "../../assets/game/road.png"
import triangleTree from "../../assets/game/triangleTree.png"
import yellowOneTree from "../../assets/game/yellowOneTree.png"
import smallGrass from "../../assets/game/smallOneGrass.png"
import trianleTwoTree from "../../assets/game/triangleTwoTree.png"
import yellowTwoTree from "../../assets/game/yellowTwotree.png"

const positions = [
  { position: "absolute", top: 80, right: 175},
  { position: "absolute", top: 80, right: 140},
  { position: "absolute", top: 80, right: 105},
  { position: "absolute", top: 80, right: 70},
  { position: "absolute", top: 80, right: 35},
  { position: "absolute", top: 80, right: 0, borderTopRightRadius:30 },
  { position: "absolute", top: 115, right: 0 },
  { position: "absolute", top: 150, right: 0 },
  { position: "absolute", top: 185, right: 0, borderBottomRightRadius: 30 },
  { position: "absolute", top: 185, right: 35 },
  { position: "absolute", top: 185, right: 70 },
  { position: "absolute", top: 185, right: 105 },
  { position: "absolute", top: 185, right: 140 },
  { position: "absolute", top: 185, right: 175, },
  { position: "absolute", top: 185, left: 0, borderTopLeftRadius: 30},
  { position: "absolute", top: 220, left: 0 },
  { position: "absolute", top: 255, left: 0,  },
  { position: "absolute", top: 290, left: 0, borderBottomLeftRadius: 30 },
  { position: "absolute", top: 290, left: 35 },
  { position: "absolute", top: 290, left: 70 },
  { position: "absolute", top: 290, left: 105 },
  { position: "absolute", top: 290, left: 140,  },
  { position: "absolute", top: 290, left: 175,  },
  { position: "absolute", top: 290, right: 0, borderTopRightRadius: 30 },
  { position: "absolute", top: 325, right: 0,  },
  { position: "absolute", top: 360, right: 0 },
  { position: "absolute", top: 395, right: 0, borderBottomRightRadius: 30 },
  { position: "absolute", top: 395, right: 35  },
  { position: "absolute", top: 395, right: 70 },
  { position: "absolute", top: 395, right: 105,   },
  { position: "absolute", top: 395, right: 140, },
  { position: "absolute", top: 395, right: 175 },
  { position: "absolute", top: 395, left: 0 ,borderTopLeftRadius: 30 },
  { position: "absolute", top: 430, left: 0,  },
  { position: "absolute", top: 465, left: 0 },
  { position: "absolute", top: 495, left: 0, borderBottomLeftRadius: 30 },
  { position: "absolute", top: 495, left: 35,  },
  { position: "absolute", top: 495, left: 70,  },
  { position: "absolute", top: 495, left: 105 },
  { position: "absolute", top: 495, left: 140 },
  { position: "absolute", top: 495, left: 175 },
 
];

const Field = ({power}) => {
  const horses = {
    blue: blueHorse,
    orange: orangeHorse,
    red: redHorse,
    purple: purpleHorse,
  };

  const { id } = useParams();
  const { players } = useGame(id);
  const [field, setField] = useState(Array(40).fill(null));
  

  // player's horse's position
  const horsePosition = (fieldNum) => {
    const playersFil = players?.filter(
      (item) => item.point == fieldNum
    );
    return playersFil;
  };

  return (
    <div className="w-full h-full relative">
       
      <img src={greenTree} className="absolute top-[100px] left-[20px] w-[32px] h-[40px]"/>
      <img src={oneGrass} className="absolute top-[130px] left-[120px] w-[45px] h-[36px]"/>
      <img src={yellowOneTree} className="absolute top-[220px] right-[20px] w-[48px] h-[56px]"/>
      <img src={triangleTree} className="absolute top-[30px] right-[24px] w-[37px] h-[53px]"/>
      <img src={smallGrass} className="absolute top-[250px] right-[100px] w-[36px] h-[28px]"/>
      <img src={grass} className="absolute top-[348px] right-[104px] z-10 w-[52px] h-[24px]"/>
      <img src={road} className="absolute top-[340px] right-[100px] w-[100px] h-[42px]"/>
      <img src={greenTwoTree} className="absolute top-[340px] left-[120px] w-[48px] h-[52px]"/>
      <img src={yellowTwoTree} className="absolute top-[500px] left-[60px] w-[60px] h-[58px]"/>
      <img src={trianleTwoTree} className="absolute top-[420px] right-[60px] z-10 w-[48px] h-[52px]"/>

      <div className="relative ml-28 w-[245px]">
        {field.map((value, i) => {
          const playersHorsePosition = horsePosition(i);
          // console.log(playersHorsePosition.length)
          const currentPower = power[i]   
          return (
            <div 
              key={i}
              style={{...positions[i]}} 
              className={`${
                playersHorsePosition.length === 2 ? "bg-yellow-300 " 
              : playersHorsePosition.length === 3 ? "bg-pink-300"
              : playersHorsePosition.length === 4 ? "to-blue-300" : ''} 
               w-[35px] h-[35px] bg-[#4C3F1C]`}
             
            >
              {/* {i} */}
              {playersHorsePosition.length === 0 && currentPower ? <img src={currentPower} alt="power"/> : null}
              {/* {players.length === 0 && currentPower ? <img src={currentPower}/> : null} */}

              {playersHorsePosition?.map((e, index) => {
                return (
                  <img src={horses[e.color]} className="p-0" alt={`horse_${index}`} key={index} />
                );
              })}

              
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Field;

  // <div>
                //   {i ?  <img src={horses[e.color]} className="w-20 h-18 p-0" key={i} /> :  <img src={horses} className="w-20 h-18 p-0" key={i} />}
                // </div>

// const power = {
  //   1: go,
  //   5: shield,
  //   10: back
  // }


// <div className=" grid grid-cols-5 w-[300px] pl-3 ml-2">
    //   {field.map((value, i) => {
    //     const players = fieldUsers(i);
    //     return (
    //       <div 
    //       key={i}
    //       // style={{...position[i]}} 
    //       className="w-[40px] h-[40px] bg-green-800 shadow hover:shadow-gray-900 text-white text-sm  rounded-[50%]">
    //         {i}
    //         {players?.map((e, i) => {
    //           return (
    //             <img src={horses[e.color]} className="w-20 h-18 p-0" key={i} />
    //           );
    //         })}
    //       </div>
    //     );
    //   })}
    // </div>

    // ... (other imports and code)

// const Field = ({ power }) => {
//   // ... (existing code)

//   return (
//     <div className="w-full h-full relative">
//       {/* ... (existing code for background images) */}
      
//       <div className="relative ml-28 w-[245px]">
//         {field.map((value, i) => {
//           const playersHorsePosition = horsePosition(i);
//           const currentPower = power[i];

//           return (
//             <div
//               key={i}
//               style={{ ...positions[i] }}
//               className={`${
//                 playersHorsePosition.length === 2 ? "bg-yellow-300 "
//                   : playersHorsePosition.length === 3 ? "bg-pink-300"
//                     : playersHorsePosition.length === 4 ? "to-blue-300" : ''
//                 } w-[35px] h-[35px] bg-[#4C3F1C]`}
//             >
//               {playersHorsePosition.length === 0 && currentPower ? <img src={currentPower} alt="power" /> : null}

//               {playersHorsePosition?.map((player, index) => (
//                 <img src={horses[player.color]} key={index} alt={`horse_${index}`} />
//               ))}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };


