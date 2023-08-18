import React, { useEffect, useState} from "react";
import {Switch , Route, Redirect} from "react-router-dom"
import { auth } from '../../firebase'
import LessonPage from "../LessonPage";
import Game from "../../game/GamePage"
import Payment from "../Payment";
import LessonView from "../LessonView";
import Login from "../Login";
import SignUp from "../SignUp";
import Dashboard from "../../admin/Dashboard";
import Logout from "../../components/Logout";
import ProfilePage from "../ProfilePage";
import AdminLogin from "../../admin/AdminLogin";
import EditLesson from "../../admin/Edit/EditLessonPage";
import Teacher from "../../components/Teacher";
import AddLesson from "../../components/AddLesson";

const App = () => {
     const [userId, setUserId] = useState()

     auth.onAuthStateChanged((user) => {
          if (user) {
               setUserId(user.uid)
          }
     });

return (
<div >      
     {userId ? (
     <Switch>
          <Route path="/lesson/:id" component={LessonView}/>
          <Route path="/lesson" component={LessonPage}/>
          <Route path="/wallet" component={Payment}/>
          <Route path="/game" component={Game}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/user" component={ProfilePage}/>
          <Route path="/addLesson" component={AddLesson}/>
          <Route path="/teacher" component={Teacher}/>
          {/* admin */}
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/edit/:id" component={EditLesson}/>
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