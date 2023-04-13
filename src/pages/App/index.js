import React, { useContext } from "react";
import css from "./style.module.css";
import {Switch , Route} from "react-router-dom";
import LessonPage from "../LessonPage";
import AddLesson from "../../admin/AddLessonPage";
import Game from "../GamePage"
import { FetchLesssonStore } from "../../context/FetchLessonContext";
import Quiz from "../quiz";
import LudoGame from "../LudoGame";
import Admin from "../../admin/AdminNav";
import {SendLessonStore} from "../../context/sendLessonContext";
import Payment from "../Payment";
import LessonView from "../LessonView";
import Home from "../Home";

import SignUp from "../SignUp";

import Dashboard from "../../admin/Dashboard";


const App = () => {
    return (
        <div className={css.body}>
        <FetchLesssonStore>
            <SendLessonStore>           
         
            <Switch>
            <Route path="/ludogame" component={LudoGame} />
                    
                    <Route path="/lesson/:id" component={LessonView}/>
                    <Route path="/lesson" component={LessonPage}/>
                    
                    
                   
                  
                    <Route path="/wallet" component={Payment}/>
                    <Route path="/quiz" component={Quiz}/>
                 
                    <Route path="/admin" component={Admin}/>
                 
                    <Route path="/game" component={Game}/>

                  
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/" component={Home}/>
                   
            </Switch>
            </SendLessonStore>
            </FetchLesssonStore>
         
         
        </div>
    )
}

export default App;