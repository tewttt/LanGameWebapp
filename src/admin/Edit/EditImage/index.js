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
import { EditAttributesTwoTone } from "@mui/icons-material";
const auth = getAuth();


const EditImage = (props) => {
    console.log(props.data)
    const ctx = useContext(LessonContext)
  
    const [photo , setPhoto] = useState("");




const editPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
}
const changePhoto = (e) => {
    setPhoto(e.target.files[0])
  
};

        const uploadImage = () =>{
            if (photo == null) return;
            // const imageRef = ref(storage, `images/${photo.name + v4()}`);
            const imageRef = ref(storage, `images/${photo.name}`);
            uploadBytes(imageRef, photo).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setPhoto( url)
                    ctx.saveImage(url)
                    
                })
               
            })
            alert("photo amjilttai") 
        }
    return (
    <div className={css.body}>
       
           
           <div className={css.photo}>
               
                <img src={props.data} className={css.image}/>
               
                <input onChange={changePhoto} 
                    required type="file" 
                    // hidden="hidden"  
                    id="imageInput" />

               <Tooltip title="Edit" placement="top">
                <IconButton onClick={editPicture} >
                        <EditIcon color="primary"/>
                    </IconButton>
               </Tooltip>

              
            </div>
        <div style={{display: "flex", flexDirection: "row" , justifyContent:"center", alignItems: "center"}}>
            {/* <div className={css.bar}>
                <div className={css.progress}></div>
            </div>
            <div className={css.uploadPercentage}>0%</div> */}
            <Button text="Image Upload" daragdsan={uploadImage}></Button>
        </div>
    </div>
      
    )
}

export default EditImage;