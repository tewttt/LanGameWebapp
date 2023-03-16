import React, {useContext} from "react";
import css from "./style.module.css";
import {Switch , Route} from "react-router-dom";
import LessonPage from "../LessonPage";
import Game from "../GamePage";
import { LesssonStore } from "../../context/FetchLessonContext";


const App = () => {
    return (
        <div>
          <LesssonStore>
            <Switch>
                    <Route path="/lesson" component={LessonPage}/>
                    <Route path="/" component={Game}/>
            </Switch>
          </LesssonStore>
        </div>
    )
}

export default App;