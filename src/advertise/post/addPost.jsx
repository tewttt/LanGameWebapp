
import React, { useState} from "react"
import { useHistory } from "react-router-dom"
import { ref,  getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { storage } from "../../firebase";
import usePost from "../../hook/usePost";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

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
        video: "",
        facebookLink:"",
        instagramLink:""
    })
    const maxLength = 200;
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
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-20 text-white">
           
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/ads")}/>
                    <p>Add post</p>
                </div>
                <IoIosSettings size={20}/>
            </div>

            <div className=" my-2 w-full sm:w-[80%] md:w-[60%] xl:w-[40%] text-gray-900">
                <div className="flex flex-wrap flex-col  justify-between my-1 mx-3 ">
                    <div className="text-gray-300">Title</div>
                    <textarea  
                        className="w-full my-1 p-2 rounded-[5px] mx-0 " 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="title" 
                        placeholder="Title"
                    />
                </div>
                <div className="flex flex-wrap flex-col justify-between my-1 mx-3 ">
                    <div className="text-gray-300">Text</div>
                    <textarea  
                        className="w-full  my-1 p-2 rounded-[5px] mx-0 " 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="text" 
                        placeholder="text"
                        maxlength="300"
                        rows="6"
                        cols="50"
                        
                    />
                    <div className="text-gray-300 text-end">
                        limit: {post?.text?.length}/{maxLength}
                    </div>
                </div>
                
                <div className="flex flex-wrap flex-col justify-between my-1 mx-3 ">
                    <div className="text-gray-300">Address</div>
                    <textarea  
                        className="w-full my-1  p-2 rounded-[5px] mx-0 t" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="address" 
                        placeholder="Address"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div className="text-gray-300">Phone</div>
                    <input  
                       className="w-full my-1  p-2 rounded-[5px] mx-0 " 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="phone" 
                        placeholder="phone"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div className="text-gray-300">Email</div>
                    <input  
                        className="w-full my-1  p-2 rounded-[5px] mx-0 " 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div className="text-gray-300">Facebook link</div>
                    <input  
                        className="w-full my-1  p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="facebookLink" 
                        placeholder="link"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div className="text-gray-300">Instagram link</div>
                    <input  
                        className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="instagramLink" 
                        placeholder="link"
                    />
                </div>
                <div className="flex flex-col justify-between my-1 mx-3 ">
                    <div className="text-gray-300">Other link</div>
                    <input  
                        className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="link" 
                        placeholder="link"
                    />
                </div>
            </div>

            <div className="w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <p className="text-helpGreen text-center">VIDEO  size:1920x1080   second:20-60</p>
                <video className="w-[70%] m-auto border">
                    <source src={post?.video}/>
                </video>
                <input 
                    className="m-1"
                    type="file" 
                    name="video"  
                    accept="video/*"
                    onChange={changeVideo}
                />
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
                    className="w-full bg-helpGray hover:bg-gray-400 text-baseBlack p-2 rounded-2xl m-auto flex justify-center items-center" 
                    onClick={uploadVideo}>
                    Video upload
                </button>
            </div>

            <button 
                className="bg-baseBlue1 sm:w-[80%] md:w-[60%] xl:w-[40%] p-2 text-center rounded-2xl w-full font-bold m-4 hover:bg-blue-600"
                onClick={ add}>Save Post
            </button>
        </div>
    )
}