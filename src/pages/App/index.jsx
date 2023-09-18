import React, { useState, useContext} from "react";
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
import Teacher from "../../components/Teacher";
import AddLesson from "../../components/AddLesson";
import NewGame from "../../game/NewGame";
import MemberContext from "../../context/MemberContext";
import BackgroundAnimation from "../../UI/BackgroundAnimation";

const App = () => { 
     // const ctx= useContext(MemberContext)
    
     const [userId, setUserId] = useState()
     auth.onAuthStateChanged((user) => {
          if (user) {
               setUserId(user.uid)
          }
     });

return (
<div className="relatvie" >   
     <div className="absolute">  
          <BackgroundAnimation/> 
     </div>          
     {userId ? (
     <Switch>
          <Route path="/lesson/:id" component={LessonView}/>
          <Route path="/lesson" component={LessonPage}/>
          <Route path="/wallet" component={Payment}/>
          <Route path="/game" component={Game}/>
          <Route path="/newGame" component={NewGame}/>
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
     // ) :  ctx.memberList.role ? ( 
     //      <Switch>
     //           <Route path="/admin" component={AdminLogin}/> 
     //      </Switch>
     // ) : (
     //      <Switch>
     //           <Route path="/signup" component={SignUp}/>
     //           <Route path="/" component={Login}/>
     //      </Switch>
     // )
     }           
</div>
)}
export default App;


