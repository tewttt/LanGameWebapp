import React, {useState, useContext, useEffect} from "react";
import { storage} from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LessonContext from "../../../context/LessonContext";
import {useParams, useHistory, useLocation } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ImageUpload = (props) => {
    // console.log(props.lessonId)
    const ctx = useContext(LessonContext)
    const [photo , setPhoto] = useState(""); 
    const history = useHistory();
    const {id} = useParams();

    let query = useQuery();
    
    let lessonEditVideo = null
   
    
    if(query.get("lang") == 'Англи хэл') {
        lessonEditVideo = ctx.englishList.find(
            // item => console.log(item + "item id")
            item =>  item.id === id
        );
    }
     else if(query.get("lang") == 'Солонгос хэл') {
        lessonEditVideo = ctx.koreaList.find(
            item =>  item.id === id
        );
    } else if(query.get("lang") == "Монгол хэл") {
        lessonEditVideo = ctx.mongoliaList.find(
            item =>  item.id === id
        );
    }
    useEffect(() => {
        setPhoto(lessonEditVideo.state.image)
    })
  
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
                ctx.saveImage(downloadURL)  
            })
        })
        alert("photo amjilttai") 
    }

    return (
    <div className="border border-gray-400 rounded-lg p-3 mx-5 flex flex-col ">
        <img 
        
        src={photo} className="w-[250px] h-[250px] border border-gray-400 rounded-lg m-auto"/>
        <div className="flex items-center">
            <input onChange={changePhoto} 
                className="w-[180px] h-[40px] text-[12px]"
                required type="file" 
                // hidden="hidden"  
                id="imageInput" />
            <button className="w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-center" onClick={uploadImage}>Image upload</button>
        </div>
    </div>
      
)}

export default ImageUpload;