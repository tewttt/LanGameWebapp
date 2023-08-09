import React, {useState, useContext} from "react";
import { storage} from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LessonContext from "../../../context/LessonContext";
import {useParams, useHistory } from "react-router-dom";

const ImageUpload = (props) => {
    // console.log(props.lessonId)
    const ctx = useContext(LessonContext)
    const [photo , setPhoto] = useState(""); 
    const history = useHistory();
    const {id} = useParams();

    const lessonEditVideo = ctx.lessonList.find(
        item => item.id === id
    )
    // console.log(lessonEditVideo.state.image)
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
        <img src={lessonEditVideo.state.image} className="w-[300px] h-[300px] m-auto"/>
        <div className="flex items-center">
            <input onChange={changePhoto} 
                className="w-[180px] h-[30px] text-[12px]"
                required type="file" 
                // hidden="hidden"  
                id="imageInput" />
            <button className="w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-center" onClick={uploadImage}>Image upload</button>
        </div>
    </div>
      
)}

export default ImageUpload;