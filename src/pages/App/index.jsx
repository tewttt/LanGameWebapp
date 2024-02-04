import React, { useState} from "react";
import {Switch , Route} from "react-router-dom"
import { auth } from "../../firebase";
import LessonPage from "../../lesson/page/LessonPage";
import Game from "../../game/page/GamePage"
import Payment from "../../payment/Payment";
import LessonView from "../../lesson/page/LessonView";
import Login from "../Login";
import SignUp from "../SignUp";
import Logout from "../../components/Logout";
import ProfilePage from "../ProfilePage";
import AddLesson from "../../lesson/add/AddLessonPage";
import EditLesson from "../../lesson/edit/EditLessonPage";
import Teacher from "../Teacher/Teacher";
import GameDetail from "../../game/page/GameDetail/GameDetail";
import BackgroundAnimation from "../../UI/BackgroundAnimation";
import GameHome from "../../game/page/GameHome";
import WatchAdvertise from "../../advertise/ads/watchAdvertise";
import Advertise from "../../advertise/ads/Advertise";
import AddPost from "../../advertise/post/addPost";
import AddAdvertise from "../../advertise/ads/addAdvertise";
import EditPost from "../../advertise/post/editPost";
import AllAds from "../../advertise/ads/allAds";
import EditAdvertise from "../../advertise/ads/editAds";
import Forgot from "../forgot";
import Verification from "../Verification";
import SignUpChoose from "../SignUpChoose";
import LoginChoose from "../LoginChoose";
import SignUpPhone from "../SignUpPhone";
import LoginPhone from "../LoginPhone";
import OneAds from "../../advertise/ads/oneAds";

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
          <Route path="/edit/:id" component={EditLesson}/>
          {/* <Route path="/watchAds" component={WatchAdvertise}/> */}
          <Route path="/watchAds/:id" component={WatchAdvertise}/>
          <Route path="/ads" component={Advertise} />
          <Route path="/addAds/:id" component={AddAdvertise} />
          <Route path="/allAds" component={AllAds} />
          <Route path="/post" component={AddPost} />
          <Route path="/editpost/:id" component={EditPost} />
          
          <Route path="/verification" component={Verification}/>
          <Route path="/oneAds/:id" component={OneAds}/>
          <Route path="/oneEdit/:id" component={EditAdvertise} />
          <Route path="/" component={LessonPage}/>
     </Switch>
     ) : (
     <Switch>
          <Route path="/signup" component={SignUp}/>
          <Route path="/signupPhone" component={SignUpPhone}/>
          {/* <Route path="/signupChoose" component={SignUpChoose}/> */}
          <Route path="/forgot" component={Forgot}/>
          {/* <Route path="/login" component={Login}/> */}
          {/* <Route path="/loginPhone" component={LoginPhone}/> */}
          <Route path="/verification" component={Verification}/>
          <Route path="/" component={Login}/>
     </Switch>
     )}    
    
</div>
)}
export default App;


