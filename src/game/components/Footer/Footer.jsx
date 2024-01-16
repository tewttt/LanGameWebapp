import React, { useState } from "react";
import go from "../../../assets/game/Go 1.png"
import shield from "../../../assets/game/Shield 1.png"
import back from "../../../assets/game/Back 1.png"
import css from './style.module.css'
import Modal from "../../../components/General/Modal"
import dice1 from "../../../assets/game/one.png"
import dice2 from "../../../assets/game/two.png"
import dice3 from "../../../assets/game/tree.png"
import dice4 from "../../../assets/game/four.png"
import dice5 from "../../../assets/game/five.png"
import dice6 from "../../../assets/game/six.png"
import useGame from "../../../hook/useGame";


const dices = [dice1, dice2, dice3, dice4, dice5, dice6]

const Footer = ({currentUser, answerPlayerId , currentUserId , getPower, selectedPower}) => {
 const [showGo ,setShowGo] = useState(false)
  const [diceIndex, setDiceIndex] = useState("")
  // console.log(diceIndex)
 const getShield = () => {
  getPower("shield", null)
  // getPower({power: "shield", index: null })
 }

 const getBack = () => {
  getPower("back", null)
  // getPower({power: "back", index: null })
 }
const getGo = (i) => {
  setShowGo(false)
  // setDiceIndex(i)
  // getPower({power: "go", index: null })
  getPower("go", i)
}

 const showGoModal = () => {
  setShowGo(true)
  // getPower({power: "go", index: null })
  // getPower(selectedPower === go ? '' : "go")
  // getPower("go", null)
 }
 const closeGoModal = () => {
  setShowGo(false)
  getPower("", null)
  // getPower({power: "", index: null })
 }
 return (
    <div className="h-full w-full">
      {answerPlayerId === currentUserId ? (
       <div className="h-full m-auto rounded-[30px] flex justify-around items-center w-[350px] bg-white">
      
        <div onClick={getShield} className=" flex flex-col items-center relative">
          <div 
          
            className={`${selectedPower === "shield" ? css.neon : ""}   bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]`}
          >
            <img src={shield} 
            className=" h-[40px] w-[40px]"
            />
          </div>
          <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
            {currentUser?.shield}
          </div>
        </div>

        <div onClick={ showGoModal} className="flex flex-col items-center relative">
          <div  className={`${selectedPower === "go" ? css.neon : ""}  bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]`}>
            <img src={go} className="h-[40px] w-[40px]"/>
          </div>
          <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
            {currentUser?.go}
          </div>
        </div>

        <div onClick={getBack} className="flex flex-col items-center relative">
          <div  className={`${selectedPower === "back" ? css.neon : ""}  bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]`}>
            <img src={back} className="h-[50px] w-[48px]"/>
          </div>
          <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
            {currentUser?.back}
          </div>
        </div>  
        <Modal show={showGo} closeConfirm={closeGoModal}>
          <div className="grid grid-cols-3 place-items-center">
            {dices.map((e, i) => {
              // console.log(i)
              return (
                <div
                  onClick={() => getGo(i)} 
                  className="bg-baseColor w-[40px] my-3 h-[40px] hover:bg-hpink">
                  <img src={e} className="w-full h-full"/>
                </div>
              )
            })}
          </div>
        </Modal>

      </div>
     ) : (
      <div className="h-full m-auto rounded-[30px] flex justify-around items-center w-[350px] bg-white">
        <div className="flex flex-col items-center relative">
          <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
            <img src={shield} className="h-[40px] w-[40px]"/>
          </div>
          <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
            {currentUser?.shield}
          </div>
        </div>
        
        
        
        <div className="flex flex-col items-center relative">
          <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
            <img src={go} className="h-[40px] w-[40px]"/>
          </div>
          <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
            {currentUser?.go}
          </div>
        </div>

        <div className="flex flex-col items-center relative">
          <div className="bg-baseColor flex justify-center items-center w-[52px] h-[35px] rounded-[23px]">
            <img src={back} className="h-[50px] w-[48px]"/>
          </div>
          <div className="absolute -top-1 -right-2 text-white bg-red-500 w-[20px] h-[20px] rounded-[50%] flex justify-center items-center">
            {currentUser?.back}
          </div>
        </div>

      </div>
     )}
    </div>
  );
};

export default Footer;
