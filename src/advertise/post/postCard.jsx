import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import usePost from "../../hook/usePost";
import Modal from "../../components/General/Modal"

const PostCard = ({data}) => {
    const history = useHistory()
    const { deletePost} = usePost();
    const [show, setShow] = useState(false)
    const edit = () => {
        history.push(`/editpost/${data.id}`)
    }
    // console.log(data)
    const remove = () => {
        deletePost(data.id)
    }
   
    return (
        <div className="w-full sm:w-[300px] m-2 border border-helpGray p-2 rounded-2xl">
            <Modal show={show} >
                <div className="flex flex-col">
                    <p className="text-red-500 text-lg my-3 text-center">Are you sure delete the post ?</p>
                    <div className="flex justify-between">
                        <button  
                            className="bg-green-500 py-3 px-10 rounded-2xl text-white"
                            onClick={() => setShow(false)}>NO</button>
                        <button 
                        className="bg-red-500 text-white py-3 px-6 rounded-2xl"
                        onClick={remove}>Yes, delete post</button>
                    </div>
                </div>
            </Modal>
            <button 
                className="bg-baseBlue1 w-full rounded-2xl p-2 font-semibold hover:bg-blue-600" 
                onClick={() =>history.push(`/addAds/${data.id}`)}>Add advertise
            </button>
            <div className="rounded-2xl my-2 w-full p-2">
                <p className="text-xl text-center">Post information</p>
                <div className="my-2">
                    <div className="my-2">
                        <div className="flex justify-between my-1 py-1">
                            <p className="">Title</p>
                            <p>{data.post.title}</p>
                        </div>
                        <div className="flex justify-between my-1 py-1">
                            <p className="">Text</p>
                            <p>{data.post.text}</p>
                        </div>
                        <div className="flex justify-between my-1 py-1">
                            <p className="">Phone</p>
                            <p>{data.post.phone}</p>
                        </div>
                        <div className="flex justify-between my-1 py-1">
                            <p className="">Address</p>
                            <p>{data.post.address}</p>
                        </div>
                        <div className="flex justify-between my-1 py-1">
                            <p className="">Email</p>
                            <p>{data.post.email}</p>
                        </div>
                        
                    </div>

                    <video 
                        className="my-2 w-full"
                        src={data?.post?.video}  type="video/mp4" controls>
                    </video>
                    {/* <div className="flex justify-between text-[12px] text-helpGray">
                        <div className="flex w-[70px] justify-between">
                            <p>100</p>
                            <p>Reach</p>
                        </div>
                        <div className="flex w-[70px] justify-between">
                            <p>$10</p>
                            <p>Spent</p>
                        </div>
                    </div> */}
                </div>
           
                <div className="flex justify-between my-2 w-full">
                    <button 
                        className="bg-green-500 mr-1 w-1/2 py-2 px-3 font-semibold rounded-xl hover:bg-green-800"
                        onClick={edit}>Post 
                    </button>
                    <button 
                        className="bg-red-600 ml-1 py-2 w-1/2 px-3 font-semibold rounded-xl hover:bg-red-800"
                        onClick={() => setShow(true)}>Post delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostCard