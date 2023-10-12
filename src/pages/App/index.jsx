import React, { useState} from "react";
import {Switch , Route} from "react-router-dom"
import { auth } from "../../firebase";
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
import Teacher from "../../components/Teacher/Teacher";
import AddLesson from "../../components/AddLesson";
import GameDetail from "../../game/GameDetail";
import BackgroundAnimation from "../../UI/BackgroundAnimation";

const App = () => { 
     const [authId, setAuthId] = useState()
     // console.log(authId)
     auth.onAuthStateChanged((user) => {
          if (user) {
               setAuthId(user.uid)
          }
     });
    
return (
<div className="relatvie z-10" >   
     <div className="absolute -z-10">  
          <BackgroundAnimation/> 
     </div>
     
     {authId ? (
     <Switch>
          <Route path="/lesson/:id" component={LessonView}/>
          <Route path="/lesson" component={LessonPage}/>
          <Route path="/wallet" component={Payment}/>
          <Route path="/game" component={Game}/>
          <Route path="/newGame/:id" component={GameDetail}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/profile" component={ProfilePage}/>
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
     </Switch>
     )
    
     }    
    
</div>
)}
export default App;


