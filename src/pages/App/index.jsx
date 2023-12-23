import React, { useState} from "react";
import {Switch , Route} from "react-router-dom"
import { auth } from "../../firebase";
import LessonPage from "../LessonPage";
import Game from "../../game/page/GamePage"
import Payment from "../Payment";
import LessonView from "../LessonView";
import Login from "../Login";
import SignUp from "../SignUp";
import Dashboard from "../../admin/page/Dashboard";
import Logout from "../../components/Logout";
import ProfilePage from "../ProfilePage";
import AdminLogin from "../../admin/page/AdminLogin"
import EditLesson from "../../admin/Edit/EditLessonPage";
import Teacher from "../Teacher/Teacher";
import AddLesson from "../AddLesson";
import GameDetail from "../../game/page/GameDetail";
import BackgroundAnimation from "../../UI/BackgroundAnimation";
import GameHome from "../../game/page/GameHome";
import WatchAdvertise from "../../game/page/watchAdvertise";
import Advertise from "../../advertise/page/Advertise";
import AddPost from "../../advertise/page/addPost";
import AddAdvertise from "../../advertise/page/addAdvertise";

const App = () => { 
     // console.log(auth?.currentUser?.uid)
     const [authId, setAuthId] = useState()
     // console.log(authId)
     auth?.onAuthStateChanged((user) => {
          // console.log(user?.uid)
          if (user) {
               setAuthId(user?.uid)
          }
     });
//     console.log(authId)
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
          <Route path="/gameHome" component={GameHome}/>
          <Route path="/game" component={Game}/>
          <Route path="/newGame/:id" component={GameDetail}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/addLesson" component={AddLesson}/>
          <Route path="/teacher" component={Teacher}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/edit/:id" component={EditLesson}/>
          <Route path="/watchAdvertise" component={WatchAdvertise}/>
          <Route path="/advertise" component={Advertise} />
          <Route path="/addPost" component={AddPost} />
          <Route path="/addAds/:id" component={AddAdvertise} />
          <Route path="/" component={LessonPage}/>
     </Switch>
     ) : (
     <Switch>
          {/* <Route path="/admin" component={AdminLogin}/>  */}
          <Route path="/signup" component={SignUp}/>
          <Route path="/" component={Login}/>
     </Switch>
     )}    
    
</div>
)}
export default App;


