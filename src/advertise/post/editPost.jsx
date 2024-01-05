
import React, { useState, useEffect } from "react"
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import video from "../../../src/assets/video/1.mp4"
import { MdOutlineCancel } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom"
import { ref,  getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { storage } from "../../firebase";
import usePost from "../../hook/usePost";

export default function EditPost() {
    const {id} =useParams()
    const { editPost, posts} = usePost();
    const history = useHistory()
    const [prog, setProg] = useState("")
    const [post , setPost] = useState({
        title: "",
        text: "",
        link: "",
        address: "",
        phone: "",
        email: "",
        video: ""
    })
    useEffect(() => {
        if(posts) {
            const data = posts.find(
                item => item.id === id
            );
            setPost(data?.post)
        }
       },[posts])
   
    // console.log(post?.video)
    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }
    const changeVideo = (e) => {
        setPost({...post , video: e.target.files[0]})
        // setVideo(e.target.files[0]);
    }
    const uploadVideo = () => {
        if (post.video === null) return;
        const videoRef = ref(storage, `ads/${post.video.name}`)
        const uploadTask = uploadBytesResumable(videoRef, post.video)

        uploadTask.on("state_changed" , (snapshot) => {
            let progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100

            progress = Math.trunc(progress)
            setProg(progress)
            
        }, (error) => {
            console.log("error : ")
        }, () => { 
            console.log("success")
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
               setPost({...post , video: downloadURL})
                // setVideo(downloadURL)
            })
            alert("video upload success")
        })
    }
    const add = () => {
        editPost(id, post) 
        alert("edit post")
        history.push("/ads")
    }
    return (
        <div className="text-white flex flex-col">
             <div className="">
                <MdOutlineCancel onClick={() =>  history.push("/ads")} size={30}/>
            </div>
            <div className="">
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Title</div>
                    <input  
                        className="w-[300px] h-[30px] rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="title" 
                        placeholder="Title"
                        value={post?.title}
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Text</div>
                    <input  
                        className="w-[300px] h-[30px] rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="text" 
                        placeholder="text"
                        value={post?.text}
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Link</div>
                    <input  
                        className="w-[300px] h-[30px] rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="link" 
                        placeholder="link"
                        value={post?.link}
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Address</div>
                    <input  
                        className="w-[300px] h-[30px] rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="address" 
                        placeholder="Address"
                        value={post?.address}
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Phone</div>
                    <input  
                        className="w-[300px] h-[30px] rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="phone" 
                        placeholder="phone"
                        value={post?.phone}
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Email</div>
                    <input  
                        className="w-[300px] h-[30px] rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        value={post?.email}
                    />
                </div>
               
            </div>
            <Video>
                <source src={post?.video}/>
            </Video>
            <input type="file" name="video"  onChange={changeVideo}/>
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
            <div >{prog}%</div>
        </div>  
            <button className="w-[150px] h-[20px] bg-blue-500 flex text-[12px] justify-center items-center" onClick={uploadVideo}>Video upload</button>
            <button onClick={ add}>Save Post</button>
        </div>
    )
}