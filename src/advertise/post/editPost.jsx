
import React, { useState, useEffect } from "react"
import { MdOutlineCancel } from "react-icons/md";
import { useHistory, useParams } from "react-router-dom"
import { ref,  getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { storage } from "../../firebase";
import usePost from "../../hook/usePost";

export default function EditPost() {
    const {id} =useParams()
    const {postData, editPost} = usePost( id );
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
        <div className="flex flex-col justify-center items-center my-5">
             <div className="mt-5">
                <MdOutlineCancel onClick={() =>  history.push("/ads")} size={30}/>
            </div>
            <div className="flex flex-col w-[300px] ">
              
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>Title</p>
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
               
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
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
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
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
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
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
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
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
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
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

        <div className="my-3 w-full px-8">
            <video src={post?.video} width="320" height="240" type="video/mp4" controls></video>
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
            className="w-[150px] h-[40px] rounded-2xl my-3 bg-baseColor  flex text-hpink p-3 justify-center items-center" 
            onClick={uploadVideo}>
            Video upload
        </button >
        <button 
            className="w-[150px] h-[40px] rounded-2xl mt-3 mb-6 bg-baseColor  flex text-hpink p-3 justify-center items-center" 
            onClick={ add}>Save Post</button>
        </div>
    )
}