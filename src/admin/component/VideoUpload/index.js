import React, {useState} from "react";
import css from "./style.module.css";
import {DefaultPlayer as Video} from "react-html5video";
import "react-html5video/dist/styles.css";
import { ref,  getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { storage, db } from "../../../firebase";
import LessonContext from "../../../context/LessonContext";
import { useContext } from "react";

// https://www.youtube.com/watch?v=wuArhMaD5Hc&t=26s
// upload video lesson

const VideoUpload = () => {
    const [video , setVideo] = useState("");
    const [prog, setProg] = useState("")
    const ctx =useContext(LessonContext)
   
    const changeVideo = (e) => {
        setVideo(e.target.files[0]);
    }
          const uploadVideo = () => {
            if (video === null) return;
            const videoRef = ref(storage, `videos/${video.name}`)
            const uploadTask = uploadBytesResumable(videoRef, video)

            uploadTask.on("state_changed" , (snapshot) => {
                let progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100

                progress = Math.trunc(progress)
                setProg(progress)
                // progress.style.width=progress+"%"
                // console.log(progress)
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
    <div className="flex flex-col border border-gray-400 md:w-[500px] md:mx-20 md:p-5 md:my-5 ">
        <div className="border border-gray-400">
                <Video autoPlay loop 
                    // poster={photo} 
                    on>
                        <source
                         src={video}
                        type="video/webm"
                        />
                </Video>
        </div>
        <div className="flex items-center justify-between">
            <input 
                className="w-[180px] h-[30px] text-[10px]"
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
                <div className={css.uploadPercentage}>{prog}%</div>
        </div>  
    </div>
    )
}

export default VideoUpload;