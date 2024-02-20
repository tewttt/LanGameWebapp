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
import OneAds from "../../advertise/ads/oneAds";
import TranslateView from "../../lesson/view/translateView";
import ExamView from "../../lesson/view/examView";
import WordView from "../../lesson/view/wordView";
import GrammarView from "../../lesson/view/grammarView";
import WordViewExam from "../../lesson/view/wordViewExam";


const App = () => { 
     const [authId, setAuthId] = useState()
     auth?.onAuthStateChanged((user) => {
          if (user) {
               setAuthId(user?.uid)
          }
     });

return (
<div className="relatvie z-10" >   

     {authId ? (
     <Switch>
          <Route path="/lesson/:languageId/:topicId/:lessonId" component={LessonView}/>
          <Route path="/lesson" component={LessonPage}/>
          <Route path="/translate/:languageId/:topicId/:lessonId" component={TranslateView}/>
          <Route path="/exam/:languageId/:topicId/:lessonId" component={ExamView}/>
          <Route path="/word/:languageId/:topicId/:lessonId" component={WordView}/>
          <Route path="/wordExam/:languageId/:topicId/:lessonId" component={WordViewExam}/>
          <Route path="/grammar/:languageId/:topicId/:lessonId" component={GrammarView}/>
          <Route path="/wallet" component={Payment}/>
          <Route path="/gameHome" component={GameHome}/>
          <Route path="/game" component={Game}/>
          <Route path="/newGame/:id" component={GameDetail}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/addLesson" component={AddLesson}/>
          <Route path="/teacher" component={Teacher}/>
          <Route path="/edit/:languageId/:topicId/:lessonId" component={EditLesson}/>
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
          <Route path="/forgot" component={Forgot}/>
          {/* <Route path="/verification" component={Verification}/> */}
          <Route path="/" component={Login}/>
     </Switch>
     )}    
    
</div>
)}
export default App;


