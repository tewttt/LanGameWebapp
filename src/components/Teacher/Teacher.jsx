import React, { useState, useContext, useEffect } from "react";
import ToolSidebar from "../ToolSidebar";
import { getAuth } from "firebase/auth";
import UserContext from "../../context/UserContext";
import css from "./style.module.css"
import { Switch , Route, useHistory } from "react-router-dom";
import Translate from "../../admin/component/Translate";
import Exam from "../../admin/component/Exam";
import Grammar from "../../admin/component/Grammar";
import Word from "../../admin/component/Word";
import LessonBase from "../../admin/component/LessonBase"

// Багш болох хүсэлтийг админаа зөвшөөрөх
// Хүсэлт зөвшөөрсөн үед Хичээл нэмэх хэсгийг харуулах
// Тухайн багшийн хичээлүүдийг харуулах .. Яаж датагаас олон хичээлийг шүүх вэ?

const auth = getAuth();
const Teacher = () => {
    const history = useHistory();
    const [id , setId] = useState("")
    const [state, setState] =useState({
        teacher: false
    })
    const [teacher, setTeacher] = useState(false)

   
    const ctx = useContext(UserContext)

    useEffect(() => {
        const profile = ctx.userList.find(
            // item => console.log(item.authId)
            item => item.authId === auth.currentUser.uid
        )
 
        setId(profile.id)
       }, [])
  

    const add = () => {
        // setId(state.id)
        setTeacher(true)
        // setState({...state, teacher:true})
        // ctx.setTeacher(state,id)
        ctx.setTeacher(teacher,id)

    }
    const baseInfo = () => {
        history.push("/teacher/lessonbase");
    };
    const translate = () => {
        history.push("/teacher/translate");
    };
    const exam= () => {
        history.push("/teacher/exam");
    };
    const word= () => {
        history.push("/teacher/word");
    };
    const grammar= () => {
        history.push("/teacher/grammar");
    };
   
    return (
        <div className="text-white ">
            <ToolSidebar/>
           
            {teacher ? (
                 <div className="flex flex-col pt-20 text-white ">
                    <div>Хичээл нэмэх</div>
                    <div className="flex">
                        <button onClick={baseInfo} 
                        className={`${history.location.pathname == "/teacher/lessonbase" ? "bg-blue-700 text-white" : ""} mx-1  w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                        Мэдээлэл</button>
                        <button onClick={translate} 
                            className={`${history.location.pathname == "/teacher/translate" ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                            Орчуулга</button>
                        <button onClick={exam} 
                            className={`${history.location.pathname == "/teacher/exam" ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                            Шалгалт</button>
                        <button onClick={grammar}  
                            className={`${history.location.pathname == "/teacher/grammar" ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >Дүрэм</button>
                        <button onClick={word} 
                        className={`${history.location.pathname == "/teacher/word" ? "bg-blue-700 text-white" : ""} mx-1 w-[70px] h-[30px] bg-blue-50 flex justify-center items-center text-[12px] text text-black hover:bg-blue-500 rounded-sm`} >
                        Шинэ үг</button>
                    </div>
                </div>
            ) : (
                <div className="pt-20 flex flex-col items-center justify-center">
                    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium hic magni nemo dolore assumenda architecto perferendis vitae vero omnis! Quam!</div>
                    <button 
                        onClick={add}
                        className={css.towch}
                        >Багш болох хүсэлт илгээх
                    </button>
                </div>
            )}
            <button 
                        onClick={add}
                        className={css.towch}
                        >Багш болох хүсэлт илгээх
                    </button>

        <Switch>
            <Route path="/teacher/translate"  component={Translate}/>
            <Route path="/teacher/exam" component={Exam}/>
            <Route path="/teacher/grammar" component={Grammar} />
            <Route path="/teacher/word" component={Word} />
            <Route path="/teacher/lessonbase" component={LessonBase} />
        </Switch>
            
        </div>
    )
}

export default Teacher;