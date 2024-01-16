
import React, { useState} from "react"
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { MdOutlineCancel } from "react-icons/md";
import { useHistory } from "react-router-dom"
import { ref,  getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { storage } from "../../firebase";
import usePost from "../../hook/usePost";

export default function AddPost() {
    const {addPost} = usePost();
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
   
    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }
    const changeVideo = (e) => {
        setPost({...post, video: e.target.files[0]})
       
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
                setPost({...post, video: downloadURL})
                
            })
            alert("video upload success")
        })
    }
    const add = () => {
        addPost(post) 
        alert("add post")
        history.push("/ads")
    }
    return (
        <div className="flex flex-col items-center justify-center m-auto py-4
        w-[300px] sm:w-[450px] md:w-[600px] lg:w-[800px]">
            <div>
                <MdOutlineCancel 
                className="hover:text-red-500"
                onClick={() =>  history.push("/ads")} size={30}/>
            </div>
            <div className=" my-2 w-full">
                <div className="flex flex-col  justify-between my-1 mx-3 ">
                    <div>Title</div>
                    <input  
                        className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="title" 
                        placeholder="Title"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Text</div>
                    <input  
                    
                        className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="text" 
                        placeholder="text"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Link</div>
                    <input  
                        className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="link" 
                        placeholder="link"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Address</div>
                    <input  
                        className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="address" 
                        placeholder="Address"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Phone</div>
                    <input  
                       className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="phone" 
                        placeholder="phone"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div>Email</div>
                    <input  
                        className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                    />
                </div>
               
            </div>

            <div className="w-full">
                <Video className="w-full">
                    <source src={post?.video}/>
                </Video>
                <input 
                    className="m-1"
                    type="file" name="video"  onChange={changeVideo}/>
                <div style={{
                    backgroundColor: "gray",
                    borderRadius: 3,
                //  position: "absolute",
                    height: 40,
                    width: `${prog}%`,
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5,
                    
                    }}>
                    <p >{prog}%</p>
                </div>  
                <button 
                    className="w-[150px] h-[40px] bg-hpink hover:bg-pink-300 rounded-2xl m-auto flex justify-center items-center" 
                    onClick={uploadVideo}>
                    Video upload
                </button>
            </div>

            <button 
                className="bg-baseColor rounded-2xl font-bold text-hpink w-[150px] h-[40px] m-4 hover:bg-baseColor/80"
                onClick={ add}>Save Post
            </button>
        </div>
    )
}