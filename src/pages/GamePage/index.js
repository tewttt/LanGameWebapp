import React from "react";
import css from "./style.module.css";



import Button from "../../components/Button"

const Game = (props) => {

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
                        <p>Тоглогч 2</p>
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
                <div className={css.playerGeneral}>Тоглогч 1
                    <Button className={css.button} text="Шоо хаях" btn="Danger"/>
                </div>
            </div>


            <div className={css.right}>
                
                <div className={css.text}>setting</div>
                <div className={css.text}>account</div>
                <div className={css.text}>wallet</div>
                <div className={css.playerGeneral}>Тоглогч 4
                    <Button text="Шоо хаях" btn="Danger"/>
                </div>
                <div className={css.playerGeneral}>Тоглогч 5
                    <Button text="Шоо хаях" btn="Danger"/>
                </div>
            </div>
           
          
            <div>
                <div className={css.field}>талбар</div>
            </div>

          
                
                <div className={css.footer}>
                    <div className={css.tools}>tools</div>
                    <Button daragdsan={lesson} text="Хичээл үзэх"/>
                    <Button daragdsan={addlesson} text="Хичээл нэмэх"/>
                    <Button daragdsan={quiz} text="Quiz"/>

                    
                    <div className={css.chat}>chat</div>
                    <div className={css.wallet}>wallet</div>
       
               
                </div>
           
           
        </div>

    )
}

export default  Game;