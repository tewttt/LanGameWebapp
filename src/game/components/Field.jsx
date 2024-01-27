import React, { useState } from "react";
import blueHorse from "../../assets/shagai/blue.svg";
import orangeHorse from "../../assets/shagai/orange.svg";
import redHorse from "../../assets/shagai/red.svg";
import purpleHorse from "../../assets/shagai/purple.svg";
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
import { CloseFullscreen } from "@mui/icons-material";
import { FaFlagCheckered } from "react-icons/fa";
const positions = [
  { position: "absolute", top: 60, right: 120},
  { position: "absolute", top: 60, right: 80},
  { position: "absolute", top: 60, right: 40},
  { position: "absolute", top: 60, right: 0, borderTopRightRadius:30 },
  { position: "absolute", top: 100, right: 0 },
  { position: "absolute", top: 140, right: 0, borderBottomRightRadius: 30 },
  { position: "absolute", top: 140, right: 40,  },
  { position: "absolute", top: 140, right: 80 },
  { position: "absolute", top: 140, right: 120 },
  { position: "absolute", top: 140, right: 160 },
  { position: "absolute", top: 140, right: 200 , borderTopLeftRadius: 30 },
  { position: "absolute", top: 180, right: 200},
  { position: "absolute", top: 220, left: 0, borderBottomLeftRadius: 30},
  { position: "absolute", top: 220, left: 40 },
  { position: "absolute", top: 220, left: 80,  },
  { position: "absolute", top: 220, left: 120,  },
  { position: "absolute", top: 220, left: 160 },
  { position: "absolute", top: 220, left: 200, borderTopRightRadius: 30 },
  { position: "absolute", top: 260, left: 200 },
  { position: "absolute", top: 300, left: 200,borderBottomRightRadius: 30  },
  { position: "absolute", top: 300, left: 160},
  { position: "absolute", top: 300, right: 80},
  { position: "absolute", top: 300, right: 120,  },
  { position: "absolute", top: 300, right: 160 },
  { position: "absolute", top: 300, right: 200 , borderTopLeftRadius: 30},
  { position: "absolute", top: 340, right: 200  },
  { position: "absolute", top: 380, right: 200, borderBottomLeftRadius: 30 },
  { position: "absolute", top: 380, right: 160 },
  { position: "absolute", top: 380, right: 120, },
  { position: "absolute", top: 380, right: 80 },
  { position: "absolute", top: 380, right: 40},
  { position: "absolute", top: 380, right: 0, borderTopRightRadius: 30},
  { position: "absolute", top: 420, left: 200 },
  { position: "absolute", top: 460, left: 200, borderBottomRightRadius: 30 },
  { position: "absolute", top: 460, left: 160,  },
  { position: "absolute", top: 460, left: 120,  },
  { position: "absolute", top: 460, left: 80 },
  { position: "absolute", top: 460, left: 40 },
  { position: "absolute", top: 460, left: 0, borderTopLeftRadius: 30  },
  { position: "absolute", top: 500, left: 0, borderBottomLeftRadius: 30 },
  { position: "absolute", top: 520, left: 40, background: "white", width: 50, height: 50, borderRadius: 40 },
];

const Field = ({ power , chooseHorse , selectedPower , currentUserId , currentUser}) => {
  const horses = {
    blue: blueHorse,
    orange: orangeHorse,
    red: redHorse,
    purple: purpleHorse,
  };
 
  const { id } = useParams();
  const { players , isBegin} = useGame(id );
  const [field, setField] = useState(Array(41).fill(null));
  // console.log(currentUserData.entryCoin)
  // player's horse's position
  const horsePosition = (fieldNum) => {
    const playersFil = players?.filter(
      (item) => item.point == fieldNum
    );
    return playersFil;
  };
 
  const getHorse= (e) => {
    chooseHorse(e)
  }

  return (
    <div className="w-full h-full relative">
       
      <img src={greenTree} className="absolute top-[100px] left-[24px] w-[32px] h-[40px]"/>
      <img src={oneGrass} className="absolute top-[100px] left-[120px] w-[45px] h-[36px]"/>
      <img src={yellowOneTree} className="absolute top-[180px] right-[20px] w-[48px] h-[56px]"/>
      <img src={triangleTree} className="absolute top-[30px] right-[20px] w-[37px] h-[53px]"/>
      <img src={smallGrass} className="absolute top-[190px] right-[170px] w-[36px] h-[28px]"/>
      <img src={grass} className="absolute top-[270px] right-[100px] z-10 w-[52px] h-[24px]"/>
      <img src={road} className="absolute top-[260px] right-[100px] w-[100px] h-[42px]"/>
      <img src={greenTwoTree} className="absolute top-[330px] z-10 left-[160px] w-[48px] h-[52px]"/>
      <img src={yellowTwoTree} className="absolute top-[480px] z-10 left-[60px] w-[60px] h-[58px]"/>
      <img src={trianleTwoTree} className="absolute top-[410px] right-[80px] z-10 w-[48px] h-[52px]"/>

      <div className="relative ml-28 w-[240px]">
        {field.map((value, i) => {
          const playersHorsePosition = horsePosition(i);
          const currentPower = power[i]    
          // console.log(currentPower)
          return (
            <div 
              key={i}
              style={{...positions[i]}} 
              // className="w-[45px] h-[45px] bg-[#4C3F1C] relative"
              className={`${
                playersHorsePosition.length > 1 ? "grid grid-cols-2" 
               : 'flex justify-center items-center'} 
 w-[40px] h-[40px] bg-[#4C3F1C] relative border border-[#5b5032]`}
            >
              {/* {i} */}
              {playersHorsePosition.length === 0 && currentPower ? <img className="w-full h-full" src={currentPower} alt="power"/> : null}
              {playersHorsePosition.map((e, index) => {
                // beginHorse(e)
                return (
                <div  
                //when no shield , choose back horse  
                  key={index}
                  onClick={() => {
                    if (!(e.id === currentUserId && e.activatedShield)) {
                      getHorse(e);
                    }
                  }}
                  className="flex justify-center items-center"
                  >
                  
                  <img src={horses[e.color]} 
                   
                    className={`${e.id === currentUserId && e.activatedShield  ? "drop-shadow-[0_35px_35px_[#E2CFEA]]" :""} absolute p-0 w-full h-full`}  
                    
                    key={index} 
                  />
                </div>
                );
              })}
            </div>
          );
        })}
       
      </div>
      <FaFlagCheckered 
        size={30}
        className="absolute z-10 text-red-700 right-[176px] bottom-[140px]"/>
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


