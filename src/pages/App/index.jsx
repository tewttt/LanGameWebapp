import React from "react";
import {Switch , Route, Redirect} from "react-router-dom";
import {getAuth} from "firebase/auth";

import LessonPage from "../LessonPage";
import Game from "../../game/GamePage"
import Quiz from "../quiz";
import LudoGame from "../LudoGame";
import Payment from "../Payment";
import LessonView from "../LessonView";
import Login from "../Login";
import SignUp from "../SignUp";
import Dashboard from "../../admin/Dashboard";
import Logout from "../../components/Logout";
import ProfilePage from "../ProfilePage";
import AdminLogin from "../../admin/AdminLogin";
import EditLesson from "../../admin/Edit/EditLessonPage";

const auth = getAuth();
const App = () => {

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
<div >      
     {auth.currentUser?.uid ? (
     <Switch>
          <Route path="/lesson/:id" component={LessonView}/>
          <Route path="/lesson" component={LessonPage}/>
          <Route path="/wallet" component={Payment}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/edit/:id" component={EditLesson}/>
          <Route path="/game" component={Game}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/ludogame" component={LudoGame} />
          <Route path="/quiz" component={Quiz}/>
          <Route path="/user" component={ProfilePage}/>
     </Switch>
     ) : (
     <Switch>
          <Route path="/admin" component={AdminLogin}/> 
          <Route path="/signup" component={SignUp}/>
          <Route path="/" component={Login}/>
          {/* <Redirect to="/"/> */}
     </Switch>
     )}           
</div>
)}
export default App;