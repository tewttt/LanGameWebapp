import React, {useState, useContext} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { storage} from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";
const auth = getAuth();


const ImageUpload = (props) => {
    // console.log(props.lessonId)
    const ctx = useContext(LessonContext)
    const [photo , setPhoto] = useState(""); 

const editPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
}
const changePhoto = (e) => {
    setPhoto(e.target.files[0])
    // uploadImage();
  
};

        const uploadImage = () =>{
            if (photo == null) return;
            // const imageRef = ref(storage, `images/${photo.name + v4()}`);
            const imageRef = ref(storage, `images/${photo.name}`);
            uploadBytes(imageRef, photo).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    setPhoto(downloadURL)
                    ctx.saveImage(downloadURL)
                    
                })
               
            })
            alert("photo amjilttai") 
        }
    return (
    <div>
         <img src={photo} className="w-[300px] h-[300px] m-auto"/>
           <div className="flex items-center">
                <input onChange={changePhoto} 
                    className="w-[180px] h-[30px] text-[12px]"
                    required type="file" 
                    // hidden="hidden"  
                    id="imageInput" />
                 <button className="w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-center" onClick={uploadImage}>Image upload</button>
                    {/* <Tooltip title="Edit" placement="top">
                    <IconButton onClick={editPicture} >
                            <EditIcon color="primary"/>
                        </IconButton>
                    </Tooltip> */}
            </div>
            <div style={{display: "flex", flexDirection: "row" , justifyContent:"center", alignItems: "center"}}>
                {/* <div className={css.bar}>
                    <div className={css.progress}></div>
                </div>
                <div className={css.uploadPercentage}>0%</div> */}
               
            </div>
    </div>
      
    )
}

export default ImageUpload;