import React, { useContext, useEffect, useState } from "react";
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
import { MdOutlineLogout } from "react-icons/md";
import shield from "../../assets/game/Shield 1.png"
import go from "../../assets/game/Go 1.png"
import back from "../../assets/game/Back 1.png"
import Footer from "./Footer";
import UserContext from "../../context/UserContext";
const Field = (props) => {

  const horses = {
    blue: blueHorse,
    orange: orangeHorse,
    red: redHorse,
    purple: purpleHorse,
  };
  const ctx = useContext(UserContext)
  const { id } = useParams();
  const { players } = useGame(id);
  const [field, setField] = useState(Array(40).fill(null));
  const [power, setPower] = useState({})
  const [playerPoint , setPlayerPoint] = useState("")
  const [ran1 , setRan1] = useState("")
  const [ran2 , setRan2] = useState("")
  const [ran3 , setRan3] = useState("")

  // player iin point
  useEffect(() => {
    const point = players?.find(
      item => item.id === ctx?.currentUser?.authId
    )
    // setPlayerPoint(point?.point)

    if (point?.point === ran1) {
        console.log(" go point 1")
    } else if (point?.point === ran2) {
      console.log(" go point 2")
    } else  {
      console.log(" go point 3")
    }
  },[ran1 , ran2, ran3])

//  console.log(playerPoint + "player point")
//  console.log(ran1 + "random 1")
//  console.log(ran2 + "random 2")
//  console.log(ran3 + "random 3")


  const fieldUsers = (fieldNum) => {
    const playersFil = players?.filter(
      (item) => item.point == fieldNum
    );
    // console.log(playersFil)
    return playersFil;
  };
 

  // const power = {
  //   1: go,
  //   5: shield,
  //   10: back
  // }

  //TO DO
  //  {/* firebase dr power uudiig hadgalna */}
 //  power iin toog nemne
// power dr niit poweriin too haruulna
 // setShieldPoint()
          // player iin horsiin field iin index awah
          // power iin field iin index awah random iin utga hed we
          // ene 2 tentvv baiwal power dr onoo nemeh

  useEffect(() => {
    var random1 = Math.floor(Math.random() * 40)
    var random2 = Math.floor(Math.random() * 40)
    var random3 = Math.floor(Math.random() * 40)
    setPower({  [random1]: go , [random2]: shield  , [random3]: back  })
    setRan1(random1)
    setRan2(random2)
    setRan3(random3)
  },[]) 

  const positions = [
    { position: "absolute", top: 80, right: 0},
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
    { position: "absolute", top: 495, right: 0 , borderTopRightRadius: 30},
    { position: "absolute", top: 530, right: 0,  },
  
    
  ];

  

  return (
    <div className="w-full h-full relative">
       
      <img src={greenTree} className="absolute top-[100px] left-[36px] w-[32px] h-[40px]"/>
      <img src={oneGrass} className="absolute top-[130px] left-[140px] w-[45px] h-[36px]"/>
      <img src={yellowOneTree} className="absolute top-[200px] right-[20px] w-[48px] h-[56px]"/>
      <img src={triangleTree} className="absolute top-[380px] right-[24px] w-[37px] h-[53px]"/>
      <img src={smallGrass} className="absolute top-[230px] right-[100px] w-[32px] h-[24px]"/>
      <img src={grass} className="absolute top-[308px] right-[104px] z-10 w-[52px] h-[24px]"/>
      <img src={road} className="absolute top-[300px] right-[100px] w-[100px] h-[42px]"/>
      <img src={greenTwoTree} className="absolute top-[470px] left-[100px] w-[38px] h-[42px]"/>
      <img src={yellowTwoTree} className="absolute top-[570px] left-[80px] w-[38px] h-[42px]"/>
      <img src={trianleTwoTree} className="absolute top-[570px] right-[80px] w-[38px] h-[42px]"/>


      <div className="relative ml-28 w-[245px]">
        {field.map((value, i) => {
          const players = fieldUsers(i);
          const currentPower = power[i]   
          return (
            <div 
              key={i}
              style={{...positions[i]}} 
              className="flex w-[35px] h-[35px] bg-[#4C3F1C] shadow hover:shadow-gray-900 
              text-white text-sm"
            >
              {/* {i} */}
              {players.length === 0 && currentPower ? <img src={currentPower}/> : null}
              {players?.map((e, i) => {
                // setPlayerPoint(e.point)
                return (
                  // {currentPower ? '' : "" }
                  <img src={horses[e.color]} className="w-20 h-18 p-0" key={i} />
                );
              })}
            </div>
          );
        })}
     
      </div>

      <div className="absolute z-10 w-full h-[68px] bottom-[60px]">
        <Footer />
      </div> 
      
    </div>
   
    
  );
};
export default Field;



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