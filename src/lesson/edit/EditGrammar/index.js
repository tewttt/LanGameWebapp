import React, {useState, useContext, useEffect} from "react";
import css from "./style.module.css";
import { storage } from "../../../firebase";
import { ref,getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import {useParams,useHistory,useLocation } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";
import useLesson from "../../../hook/useLesson";
const Grammar = (props) => {
    const [images , setImages] = useState();
    const [prog, setProg] = useState("");
    const {languageId, topicId, lessonId} = useParams()
    const {grammar, grammarfun} = useLesson(languageId, topicId, lessonId)

    const history = useHistory();
    const ctx = useContext(LessonContext)
   
    useEffect(() => {grammarfun()} ,[])

    useEffect(() => {
        if(grammar?.grammar){
            setImages(grammar?.grammar)
        }  
    },[grammar?.grammar])

    const uploadFile =async () =>{
        if (images == null) return;
        for (let i = 0; i<images.length; i++) {
            const imageRef = ref(storage, `/grammar/${images[i].name}`);
            const uploadTask = uploadBytesResumable(imageRef, images[i])
           
            uploadTask.on("state_changed" , (snapshot) => {
                let progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
                progress = Math.trunc(progress)
                setProg(progress)
                // console.log(progress)
            }, (error) => {
                // console.log("error : ")
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    setImages(downloadURL)
                    ctx.saveGrammar(downloadURL)    
                    history.push(`/edit/${languageId}${topicId}${lessonId}/word`) 
                })
                // alert(" upload success")
            })
        }}

    return (
    <div className="text-white flex flex-col items-center mt-4">
        <div className={css.photo}>
            <img src={images} className="w-[200px] h-[200px] m-auto"/>
            <input 
                className="w-[190px] h-[30px] text-[12px]"
                onChange={(event) => {setImages(event.target.files)}}
                required type="file" 
                multiple
                id="imageInput" />
        </div>
        <div className="w-[200px] h-[20px]">
            <div style={{
                    backgroundColor: "grey",
                    borderRadius: 0,
                //  position: "absolute",
                    left: 0,
                    height: "100%",
                    right: 0,
                    width: `${prog}%`,
                    marginTop: 20,
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignItems: "center",
            }}>
                <div className={css.uploadPercentage}>{prog}%</div>
            </div>     
        </div>

        <button className="mt-10 bg-blue-500 py-2 px-8 m-auto rounded-2xl" onClick={uploadFile}>Grammar upload</button>
       
    </div>
      
)}

export default Grammar;