import React, {useState} from "react";
import css from "./style.module.css";



import Button from "../../components/Button"

const Game = (props) => {
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


   const lesson = () => {
        props.history.push("/lesson");
   };
   const addlesson = () => {
    props.history.push("/addlesson");
    };
    const quiz = () => {
        props.history.push("/quiz");
    };

//    console.log(props)
    return (
        <div className={css.body}>
            <div className={css.left}>
                <div className={css.playerGeneral}>
                   <div>

                 
                        <p className={css.playerText}>Тоглогч 2</p>
                        <div>zurag</div>
                        <p>level</p>
                    </div>
                    <Button text="Шоо хаях" btn="Danger"/>  
                </div>

                <div className={css.playerGeneral}>
                    <div>
                        <p>Тоглогч 3</p>
                        <div>zurag</div>
                        <p>level</p>
                    </div>
                    <Button text="Шоо хаях" btn="Danger"/>
                </div>

                
            </div>


            <div className={css.right}>
                
                <div className={css.text}>setting</div>
                <div className={css.text}>account</div>
                <div className={css.text}>wallet</div>
                
                <div className={css.f1}>
                        <div className={css.playerGeneral}>
                            
                                <p>Тоглогч 4</p>
                                <div>zurag</div>
                                <p>level</p>
                        
                        
                        </div>
                        <Button className={css.button} text="Шоо хаях" btn="Danger"/>
                </div>
                    
               
                <div className={css.playerGeneral}>
                    <div className={css.playerInner}>
                        <p>Тоглогч 5</p>
                        <div className={css.photo}>zurag</div>
                        <p>level</p>
                    </div>
                    <Button text="Шоо хаях" btn="Danger"/>
                </div>
            </div>
           
        

          
            <div>
                <div className={css.field}>талбар</div>
            </div>

          
                
                <div className={css.footer1}>
                    <div className={css.f1}>
                        <div className={css.playerGeneral}>
                            
                                <p>Тоглогч 1</p>
                                <div>zurag</div>
                                <p>level</p>
                        
                        
                        </div>
                        <Button className={css.button} text="Шоо хаях" btn="Danger" onClick={clickDice}/>
                    </div>

                    <div className={css.baseTools}>
                        <div className={css.tools}>tools</div>
                        <div className={css.tools}>tools</div>
                        <div className={css.tools}>tools</div>
                    </div>
                    
                </div>

                <div className={css.footer2}>
                    <div>

                   
                        <div className={css.chat}>chat</div>
                        <div className={css.wallet}>wallet</div>
                    </div>
                    <div className={css.buttons}>
                        <Button daragdsan={lesson} text="Хичээл үзэх"/>
                        <Button daragdsan={addlesson} text="Хичээл нэмэх"/>
                        <Button daragdsan={quiz} text="Quiz"/>
                    </div>
                </div>
           
           
        </div>

    )
}

export default  Game;