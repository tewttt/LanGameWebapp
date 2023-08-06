import React, {useState} from "react";
import css from "./style.module.css";
import Button from "../../components/Button"
import ToolSidebar from "../../components/ToolSidebar";
import AddLesson from "../../admin/AddLessonPage";
import dice1 from "../../assets/img/11.png";
import zur from "../../assets/img/1.jpg"
import orange from "../../assets/img/orange.png";
import green from "../../assets/img/green.png";
import blue from "../../assets/img/blue.png";
import red from "../../assets/img/red.png"
import WalletIcon from '@mui/icons-material/Wallet';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { alertClasses } from "@mui/material";

const Game = (props) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
   
    // Тоглогчын ээлжийг хадгалах хувьсагч

    var activePlayer = 1;
// Тоглогчын морийг нүүлгэх
// Шооны аль талаар буусныг хадгалах хувьсагч
const [dice, setDice] = useState("");
const clickDice = () => {
    let newDice = Math.floor(Math.random() * 6) + 1;
    setDice(newDice);
    console.log(newDice)
}
// console.log("shoo" + dice)
const diceClick = () => {
   
    // const dice = document.getElementById("dice");
    dice.click();
    console.log("dice")
}
// const dicer = document.querySelector(".dice").style.display= "none"

 

    const quiz = () => {
        props.history.push("/quiz");
    };
    const ludogame = () => {
        props.history.push("/ludogame");
    };
    const wallet = () => {
        alert("wallet")
        // props.history.push("/wallet");
    };
    const addlesson = () => {
        props.history.push("/addlesson");
    };
    const chat = () => {
        alert("chat")
    }

//    console.log(props)
    return (
        <div style={{marginTop: "70px"}}>
            <ToolSidebar/>
      
            <div className={css.body}>
                
                <div className={css.left}>
                    <div className={css.playerGeneral}>
                        <p className={css.playerText}>Тоглогч 2</p> 
                        <img src={zur} className={css.circle2}/>
                        <p className={css.level}>level</p>
                    </div>
                    <div className={css.playerGeneral}>
                        <p className={css.playerText}>Тоглогч 1</p> 
                        <img src={zur} className={css.circle1}/>
                        <p className={css.level}>level</p>
                        
                        <img id="dice" onClick={diceClick} src={dice1}  className={css.dice}/>
                       
                    </div>
                </div>

                <div className={css.right}>
                    
                    <div className={css.playerGeneral}>
                            <p className={css.playerText}>Тоглогч 3</p> 
                            <img src={zur} className={css.circle3}/>
                            <p className={css.level}>level</p>
                        </div>
                        <div className={css.playerGeneral}>
                            <p className={css.playerText}>Тоглогч 4</p> 
                            <img src={zur} className={css.circle4}/>
                            <p className={css.level}>level</p>
                        </div>
                </div>
                        
                <div>
                    <div className={css.field}>
                       
                        <div className={css.base}>
                            <div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}>
                                    <div className={css.horses}>
                                        <div style={{margin: "5"}}>
                                            <img src={orange} className={css.horse}/>
                                            <img src={blue} className={css.horse}/>
                                        </div>
                                        <div>
                                            <img src={red} className={css.horse}/>
                                            <img src={green} className={css.horse}/>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                            </div>
                            <div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                            </div>
                            <div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                            </div>
                            <div>
                                <div className={css.step}>End</div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                                <div className={css.step}></div>
                            </div>
                        </div>
                       
                    </div>

                   
                </div>
        
                <div className={css.footer}>
                    <div className={css.baseTools}>
                        <div className={css.tools}><img src={zur}/></div>
                        <div className={css.tools}><img src={zur}/></div>
                        <div className={css.tools}><img src={zur}/></div>
                    </div>
                        
                    <div className={css.icons}>
                            <div className={css.chat} onClick={chat}><ChatBubbleIcon/></div>
                            <div className={css.wallet} onClick={wallet}><WalletIcon/></div>
                    </div>    
                </div>        
            </div>
        </div>

    )
}

export default  Game;