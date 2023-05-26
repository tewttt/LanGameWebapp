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

const initialState= {
    imageLink: "",
    imageName: ""
,}
const ImageUpload = (props) => {
    // console.log(props.lessonId)
    const ctx = useContext(LessonContext)
    const [confirm , setConfirm] = useState(false);
    const [stateImage , setState] = useState(initialState);
  


//    useEffect (() => {
//     const uploadFile = () => {
//         const name = new Date().getTime() + photo.name
//         const storageRef = ref(storage, photo.name)
//         const uploadTask = uploadBytesResumable(storageRef, photo);

//         uploadTask.on('state_changed', 
//         (snapshot) => {
           
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//             case 'paused':
//                 console.log('Upload is paused');
//                 break;
//             case 'running':
//                 console.log('Upload is running');
//                 break;
//             }
//         }, 
//         (error) => {
//            console.log(error)
//         }, 
//         () => {
           
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 // setPhoto(downloadURL)
//           setPhoto((prev) => [{...prev, photo: downloadURL}])
//             });
//         }
//         );
//     };
//     photo && uploadFile();
//    }, [photo]);
       

const editPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
}
const changePhoto = (e) => {
    setState({...stateImage, imageLink: e.target.files[0]})
  
};
const changeImageName = (e) => {
    setState({...stateImage, videoName: e.target.value})
}

        const uploadImage = () =>{
            if (stateImage.imageLink == null) return;
            // const imageRef = ref(storage, `images/${photo.name + v4()}`);
            const imageRef = ref(storage, `images/${stateImage.imageLink.name}`);
            uploadBytes(imageRef, stateImage.imageLink).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setState({...stateImage, imageLink: url})
                    ctx.saveImage(stateImage)
                    
                })
               
            })
            alert("photo amjilttai") 
        }
    return (
    <div className={css.body}>
       
           
           <div className={css.photo}>
               
                <img src={stateImage.imageLink} className={css.image}/>
                <input placeholder="video name" type="text" onChange={changeImageName} required/>
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

export default ImageUpload;