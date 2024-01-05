import React, {useState, useContext} from "react";
import css from "./style.module.css";
import { storage } from "../../../firebase";
import { ref,getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import { useHistory } from "react-router-dom";
import LessonContext from "../../../context/LessonContext";

const Grammar = () => {
    const [images , setImages] = useState();
    const [prog, setProg] = useState("");
    const history = useHistory();
    const ctx = useContext(LessonContext)
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
                    history.push("/addlesson/word");
                })
                // alert(" upload success")
            })
        }}

    return (
    <div className="text-white flex flex-col border border-gray-400 m-2 p-2 rounded-lg">
        <div className="flex flex-col justify-center items-center">
            <img src={images} className="w-[120px] h-[120px]"/>
            <input 
            className="w-[190px] h-[40px] text-[12px]"
                onChange={(event) => {setImages(event.target.files)}}
                required type="file" 
                multiple
                id="imageInput" />
        </div>
        <div className={css.bar}>
            <div style={{
                    backgroundColor: "grey",
                    borderRadius: 0,
                //  position: "absolute",
                    left: 0,
                    height: "30px",
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
        <button className="w-[150px] h-[20px] bg-blue-400 hover:bg-blue-500 flex text-[12px] justify-center items-center m-auto" onClick={uploadFile}>Grammar upload</button>
    </div>
)}

export default Grammar;