import React from "react";
import css from "./style.module.css";
import {Switch , Route} from "react-router-dom";
import LessonPage from "../LessonPage";
import AddLesson from "../AddLessonPage";
import Game from "../GamePage"
import { FetchLesssonStore } from "../../context/FetchLessonContext";
import Quiz from "../quiz";
import LudoGame from "../LudoGame";

import {SendLessonStore} from "../../context/sendLessonContext";

const App = () => {
    return (
        <div className={css.body}>
        <FetchLesssonStore>
            <SendLessonStore>           
         
            <Switch>
            <Route path="/ludogame" component={LudoGame} />
                    <Route path="/lesson" component={LessonPage}/>
                  
                    <Route path="/addlesson" component={AddLesson}/>
               
                    <Route path="/quiz" component={Quiz}/>

                    <Route path="/" component={Game}/>
                   
            </Switch>
            </SendLessonStore>
            </FetchLesssonStore>
         
         
        </div>
    )
}

export default App;