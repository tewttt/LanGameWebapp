
import React, { useState, useEffect } from "react"
import { MdOutlineCancel } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom"
import { ref,  getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { storage } from "../../firebase";
import usePost from "../../hook/usePost";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

export default function EditPost() {
    const {id} =useParams()
    const {postData, editPost} = usePost( id );
    const history = useHistory()
    const [prog, setProg] = useState("")
    const maxLength = 300;
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
    useEffect(() => {
        if(postData?.post) {
            setPost(postData.post)
        }
        
    } ,[postData])
     
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
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-72 text-white">
            
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/ads")}/>
                    <p>Edit post </p>
                </div>
                <IoIosSettings size={20}/>
            </div>
            <div className="flex flex-col w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
              
                <div className="flex flex-col my-1 py-1">
                    <p>Title</p>
                    <textarea  
                        className=" p-1 rounded-xl text-baseBlack" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="title" 
                        placeholder="Title"
                        value={post?.title}
                    />
                </div>
               
                <div className="flex flex-col flex-wrap w-full my-1 py-1">
                    <div>Text</div>
                    <textarea  
                        className="w-full p-1 rounded-xl text-baseBlack" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="text" 
                        placeholder="text"
                        value={post?.text}
                        maxlength="300"
                        rows="6"
                        cols="50"
                    />
                     <div className="text-gray-300 text-end">
                        limit: {post?.text?.length}/{maxLength}
                    </div>
                </div>
                <div className="flex flex-col justify-between my-1 py-1">
                    <div>Link</div>
                    <input  
                        className="p-1 rounded-xl text-baseBlack" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="link" 
                        placeholder="link"
                        value={post?.link}
                    />
                </div>
                <div className="flex flex-col justify-between my-1 py-1 ">
                    <div className="text-gray-300">Facebook link</div>
                    <input  
                        className="w-full my-1  p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="facebookLink" 
                        placeholder="link"
                        value={post?.facebookLink}
                    />
                </div>
                <div className="flex flex-col justify-between my-1 py-1 ">
                    <div className="text-gray-300">Instagram link</div>
                    <input  
                        className="w-full my-1 border border-baseColor p-2 rounded-[5px] mx-0 text-gray-900" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="instagramLink" 
                        placeholder="link"
                        value={post?.instagramLink}
                    />
                </div>
                <div className="flex flex-col justify-between my-1 py-1">
                    <div>Address</div>
                    <textarea  
                        className=" p-1 rounded-xl text-baseBlack" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="address" 
                        placeholder="Address"
                        value={post?.address}
                    />
                </div>
                <div className="flex flex-col my-1 py-1">
                    <div>Phone</div>
                    <input  
                        className=" p-1 rounded-xl text-baseBlack" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="phone" 
                        placeholder="phone"
                        value={post?.phone}
                    />  
                </div>
                <div className="flex flex-col my-1 py-1">
                    <div>Email</div>
                    <input  
                        className="p-1 rounded-xl text-baseBlack" 
                        onChange={handleChange} 
                        required 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        value={post?.email}
                    />
                </div>
                
                
               
            </div>

            <div className="my-3  w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <p className="text-helpGreen text-center">VIDEO  size:1920x1080   second:20-60</p>
                <video className="w-[70%] m-auto" src={post?.video} type="video/mp4" controls></video>
                    <input className="my-2" type="file" name="video"  onChange={changeVideo}/>
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
            </div>  

            <button 
                className="bg-helpGray text-baseBlack rounded-2xl my-3 flex p-2 justify-center items-center  w-full sm:w-[80%] md:w-[60%] xl:w-[40%]" 
                onClick={uploadVideo}>
                Video upload
            </button >
            <button 
                className="bg-baseBlue1 rounded-2xl mt-3 mb-6flex p-2 justify-center items-center  w-full sm:w-[80%] md:w-[60%] xl:w-[40%]" 
                onClick={ add}>Save Post
            </button>
        </div>
    )
}