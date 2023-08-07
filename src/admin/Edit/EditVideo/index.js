import React, {useState} from "react";
import css from "./style.module.css";
import {DefaultPlayer as Video} from "react-html5video";
import "react-html5video/dist/styles.css";
import videof from "../../../assets/video/1.mp4";
import Button from "../../../components/Button";
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { storage, db } from "../../../firebase";
import {doc, onSnapshot,collection} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import LessonContext from "../../../context/LessonContext";
import { useContext } from "react";
const auth = getAuth();
// https://www.youtube.com/watch?v=wuArhMaD5Hc&t=26s
// upload video lesson

const EditVideo = (props) => {
    // console.log(props.data)
  

    const [video , setVideo] = useState("");
    const [prog, setProg] = useState("")
    const ctx =useContext(LessonContext)
    // console.log(video)
   
    const changeVideo = (e) => {
        setVideo(e.target.files[0])
       
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
        <div>
            <div >
                {/* <p>video name: {props.data}</p> */}
                <Video autoPlay loop 
                    // poster={photo} 
                    on>
                        <source
                         src={props.data}
                        type="video/webm"
                        />
                    </Video>
               
            </div>
            {/* <input ="video name" type="text" onChange={changeVideoName} required/> */}
            <input onChange={changeVideo} 
                    required type="file" 
                    name="video" 
                    id="videoInput" 
                    // hidden="hidden"
                    />
    <div style={{display:"flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <div className={css.bar}>
                <div className={css.progress}></div>
            </div>
            <div className={css.uploadPercentage}>{prog}%</div>
            <Button text="Video Upload" daragdsan={uploadVideo}></Button>
        </div>
    </div>
    )
}

export default EditVideo;