import React, {useEffect, useState} from "react";
import {DefaultPlayer as Video} from "react-html5video";
import "react-html5video/dist/styles.css";
import {useParams, useLocation } from "react-router-dom";
import { ref,  getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { storage, db } from "../../../firebase";
import LessonContext from "../../../context/LessonContext";
import { useContext } from "react";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
// https://www.youtube.com/watch?v=wuArhMaD5Hc&t=26s
// upload video lesson
const VideoUpload = () => {

    const [video , setVideo] = useState("");
    const [prog, setProg] = useState("")
    const ctx =useContext(LessonContext)
    const {id} = useParams();
    console.log(video)
  
    let query = useQuery();
    let lessonEditVideo = null

    if(query.get("lang") == 'Англи хэл') {
        lessonEditVideo = ctx.englishList.find(
            // item => console.log(item + "item id")
            item =>  item.id === id
        );
    } else if(query.get("lang") == 'Солонгос хэл') {
        lessonEditVideo = ctx.koreaList.find(
            item =>  item.id === id
        );
        
    } else if(query.get("lang") == "Монгол хэл") {
        lessonEditVideo = ctx.mongoliaList.find(
            item =>  item.id === id
        );
    }
       
    useEffect(() => {
        setVideo(lessonEditVideo.state.video)
    },[lessonEditVideo])

    const changeVideo = (e) => {
        setVideo(e.target.files[0]);
        // uploadVideo();
    }
    const uploadVideo = () => {
    if (video === null) return;
    const videoRef = ref(storage, `videos/${video.name}`)
    const uploadTask = uploadBytesResumable(videoRef, video)

    uploadTask.on("state_changed" , (snapshot) => {
        let progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100

        progress = Math.trunc(progress)
        setProg(progress)
    }, (error) => {
        console.log("error : ")
    }, () => {
        
        console.log("success")
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            
            setVideo(downloadURL)
            // console.log(downloadURL)
            ctx.saveVideo(downloadURL)
        })
        alert("video upload success")
    })
}

return (
    <div className="flex flex-col border border-gray-400 p-3 rounded-lg justify-center">
        <div className="border border-gray-400 rounded-xl md:w-[400px]">
                <Video 
                    // autoPlay loop 
                    // poster={photo} 
                    on>
                        <source
                        src={video}
                        type="video/webm"
                        />
                </Video>
        </div>
        <div className="flex my-2 items-center h-[40px] justify-between ">
            <input 
                className="w-[180px] h-[40px] text-[12px]"
                onChange={changeVideo}
                required type="file" 
                name="video" 
                id="videoInput" 
                // hidden="hidden"
                />
            <button className="w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-center" onClick={uploadVideo}>Video upload</button>
        </div>
              
        <div style={{
                backgroundColor: "gray",
                borderRadius: 0,
            //  position: "absolute",
                height: 40,
                width: `${prog}%`,
                display: "flex",
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
                marginLeft:5
        }}>
                <div className="">{prog}%</div>
        </div>
    </div>
    )
}

export default VideoUpload;