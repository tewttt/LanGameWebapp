import React from "react";
import css from "./style.module.css";
import {Switch , Route} from "react-router-dom";
import LessonPage from "../LessonPage";
import AddLesson from "../AddLessonPage";
import Game from "../GamePage"
import { LesssonStore } from "../../context/FetchLessonContext";
import Quiz from "../quiz";


const App = () => {
    return (
        <div className={css.body}>
          <LesssonStore>
            <Switch>
                    <Route path="/lesson" component={LessonPage}/>
                    <Route path="/addlesson" component={AddLesson}/>
                    <Route path="/quiz" component={Quiz}/>

                    <Route path="/" component={Game}/>
            </Switch>
          </LesssonStore>
        </div>
    )
}

export default App;