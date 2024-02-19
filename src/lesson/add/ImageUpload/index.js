import React, {useState, useContext} from "react";
import { storage} from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LessonContext from "../../../context/LessonContext";

const ImageUpload = () => {
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
// console.log(photo)
 
const uploadImage = () =>{
    if (photo == null) return;
    // const imageRef = ref(storage, `images/${photo.name + v4()}`);
    const imageRef = ref(storage, `images/${photo.name}`);
    uploadBytes(imageRef, photo).then((snapshot) => { 
        getDownloadURL(snapshot.ref).then((downloadURL) => {
            setPhoto(downloadURL)
            // console.log(downloadURL)
            ctx.saveImage(downloadURL)
        })        
    })
    alert("photo amjilttai") 
}
    return (
    <div className="my-3 py-2">
        <img src={photo} className="w-[300px] h-[300px] m-auto border border-gray-400"/>
        <div className="flex flex-row items-center my-2">
            <input onChange={changePhoto} 
                className="w-[180px] h-[20px] text-[10px] flex justify-center items-center"
                required type="file" 
                // hidden="hidden"  
                id="imageInput" />
                <button className="w-[150px] p-1 bg-blue-500 flex text-[12px] justify-center items-center" onClick={uploadImage}>Image upload</button>
             
        </div>          
    </div>
)}

export default ImageUpload;