import React, {useState, useContext, useEffect} from "react";
import { storage} from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LessonContext from "../../../context/LessonContext";

const ImageUpload = (props) => {
    const ctx = useContext(LessonContext)
    const [photo , setPhoto] = useState(""); 

    console.log(photo)
    useEffect(() => {
        setPhoto(props?.photo)
    },[props?.photo])
  
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

// function useQuery() {
//     const { search } = useLocation();
//     return React.useMemo(() => new URLSearchParams(search), [search]);
// }

  // let query = useQuery();
    // let lessonEditVideo = null
   
    
    // if(query.get("lang") == 'Англи хэл') {
    //     lessonEditVideo = ctx.englishList.find(
    //         // item => console.log(item + "item id")
    //         item =>  item.id === id
    //     );
    // }
    //  else if(query.get("lang") == 'Солонгос хэл') {
    //     lessonEditVideo = ctx.koreaList.find(
    //         item =>  item.id === id
    //     );
    // } else if(query.get("lang") == "Монгол хэл") {
    //     lessonEditVideo = ctx.mongoliaList.find(
    //         item =>  item.id === id
    //     );
    // }