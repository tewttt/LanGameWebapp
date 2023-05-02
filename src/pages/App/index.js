import React from "react";
import css from "./style.module.css";
import {Switch , Route, Redirect} from "react-router-dom";
import LessonPage from "../LessonPage";
import { Fragment } from "react";
import Game from "../GamePage"
import { FetchLesssonStore } from "../../context/FetchLessonContext";
import Quiz from "../quiz";
import LudoGame from "../LudoGame";

import {SendLessonStore} from "../../context/sendLessonContext";
import Payment from "../Payment";
import LessonView from "../LessonView";
import Login from "../Login";
import SignUp from "../SignUp";
import Dashboard from "../../admin/Dashboard";
import UserContext from "../../context/UserContext";
import { useContext, useEffect } from "react";
import Logout from "../../components/Logout";
import AddLesson from "../../admin/AddLessonPage";


const App = () => {
    
const ctx = useContext(UserContext);
// console.log(ctx.logout)

// useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");
//     const expireDate = new Date(localStorage.getItem("expireDate"));
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (token) {
//       if (expireDate > new Date()) {
//         // Hugatsaa n duusaaagui token baina, avtomat login hiine
//         ctx.loginUserSucces(token, userId, expireDate, refreshToken);
    
//         // Token huchingui bolohod uldej baigaa hugatsaag tootsoolj
//         // Ter hugatsaanii daraa avtomataar logout hinpm 
return (
<div style={{color: "red"}}>

        
        <FetchLesssonStore>
           
            <SendLessonStore> 
            {/* userid: {ctx.state.userId } */}
            {ctx.state.userId ? (
            <Switch>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/lesson/:id" component={LessonView}/>
                    <Route path="/lesson" component={LessonPage}/>
                    <Route path="/wallet" component={Payment}/>
                    
                    <Route path="/addlesson" component={AddLesson}/>
                    <Route path="/game" component={Game}/>
                    <Route path="/logout" component={Logout}/>
                    
                    <Route path="/ludogame" component={LudoGame} />
                    <Route path="/quiz" component={Quiz}/>
                   
                   
            </Switch>

            ): (
                <Switch>
                     <Route path="/signup" component={SignUp}/>
                     <Route path="/" component={Login}/>
                     <Redirect to="/"/>
                </Switch>
            )}
         
         
            </SendLessonStore>
           
            </FetchLesssonStore>
        </div>
    )
}

export default App;