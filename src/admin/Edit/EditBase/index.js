import React, {useState, useContext, useEffect} from "react";
import css from "./style.module.css";
import ButtonCmp from "../../../components/Button";
import { Button } from "@mui/material";
import Modal from "../../../components/General/Modal";
import { useHistory, useParams } from "react-router-dom";



import fairy from "../../../assets/video/1.mp4"
import VideoUpload from "../../../admin/component/VideoUpload";
import ImageUpload from "../../../admin/component/ImageUpload";
import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";
import EditNewWord from "../EditNewword";
import EditGrammar from "../EditGrammar";
import EditVideo from "../EditVideo";
import EditImage from "../EditImage";
const auth = getAuth();

const EditBase = (props) => {
    const ctx = useContext(LessonContext)
    const {id} = useParams()
    const lessonEditbase = ctx.lessonList.find(
        item =>  item.id === id
       );
    const lessonId = lessonEditbase.id
    // console.log(lessonEditbase)

    
    
    const history = useHistory();
    const [confirm , setConfirm] = useState(false);
    const [addlesson, setAddLesson] = useState(
        {
        language: "",
        level: "",
        lessonNumber: "",
        name: "", 
    }); 
    const updateDB = () => {
        const base = {
                    language: addlesson.language,
                    level: addlesson.level,
                    lessonNumber: addlesson.lessonNumber,
                    name: addlesson.name,
        };
        // alert("Үндсэн мэдээллийн хэсгийг амжилттай хадгаллаа"); 
        ctx.saveBase(base);
        ctx.updateDB(id)
        closeConfirm()
        // history.push("/dashboard/addlesson/translate");
    }
    const save = () => {
       updateDB();
    }
   const showConfirm = () => {
    setConfirm(true)
   };
   const closeConfirm = () => {
    setConfirm(false)
   };

    const changeLanguage = (e) => {
        setAddLesson({ ...addlesson, language: e.target.value});
    };
    const changeLevel = (e) => {
        setAddLesson({ ...addlesson, level: e.target.value});
    };
    const changeLessonNumber = (e) => {
        setAddLesson({ ...addlesson, lessonNumber: e.target.value});
    };
    const changeName = (e) => {
        setAddLesson({ ...addlesson, name: e.target.value});
    };
   
    
   return(
    <div>jkjkj
        <input placeholder="kkk" type="text"/>
    </div>
   )
   

    // return (
    // <div className={css.body}>
        
    //     <Modal closeConfirm={closeConfirm} show={confirm} >
    //         <div style={{display: "flex", flexDirection: "column"}}>
    //         Хадгалахдаа итгэлтэй байна уу
    //         <div >
    //             <ButtonCmp btn="Cont" text="Тийм" daragdsan={save}/>
    //             <ButtonCmp  text="Үгүй" daragdsan={closeConfirm}/>
    //         </div>
          
    //         </div>
    //     </Modal>
        
    //         <div style={{color: "white", fontSize: "30px"}}> МЭДЭЭЛЭЛ</div>
    //         <div className={css.row} >
    //             {/* language: {props.filBase.state.base.language}  */}
    //             <br/>
    //             {/* <input onChange={changeLanguage} type="text" name="Хэл" placeholder="Хэл сонгох"/> */}
    //             <select onChange={changeLanguage}>
    //                 {/* <option>{props.filBase.state.base.language}</option> */}
    //                 <option>Англи хэл</option>
    //                 <option>Бусад</option>
                
    //             </select>
    //             <br/>  <br/>
    //         </div>

    //         <div className={css.row}>
    //             {/* level: {props.filBase.state.base.level} */}
    //             <select onChange={changeLevel}>
    //                 {/* <option>{props.filBase.state.base.level}</option>  */}
    //                 <option>A1</option>
    //                 <option>A2</option>
    //                 <option>B1</option>
    //                 <option>B1+</option>
    //                 <option>B2</option>
    //                 <option>B2+</option>
                
    //             </select>
    //             <br/>  <br/>
          
    //         </div>

    //         <div className={css.row}>
    //         {/* lessonNumber: {props.filBase.state.base.lessonNumber} <br/> */}
    //         {/* <input onChange={changeLessonNumber} defaultValue={props.filBase.state.base.lessonNumber}  type="text" name="Хичээлийн дугаар" placeholder="хичээлийн нэр"/> */}
    //         </div>
 
    //         <div className={css.row}>
    //         {/* name: {props.filBase.state.base.name} <br/> */}
    //         {/* <input onChange={changeName}  type="text"  placeholder={props.filBase.state.base.name}/> */}
    //         </div>
            
    //         <div className={css.row}> 
        
    //         {/* <EditVideo data={props.filBase.state.video}/> */}
    //         <div style={{display: "flex", flexDirection: 'row'}}>
    //             {/* <EditImage data={props.filBase.state.image}/> */}
            
    //             {/* <EditGrammar data={props.filBase.state.grammar}/> */}
    //             {/* <EditNewWord data={props.filBase.state.newWord}/> */}
    //         </div>
           
               
               
    //         </div>
    //         <Button onClick={showConfirm} className={css.towch}>Мэдээлэл засах</Button>
                                
       
          
    // </div>
      
    // )
}

export default EditBase;