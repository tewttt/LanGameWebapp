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
    
    const remove = () => {
        deletePost(data.id)
    }
   
    return (
        <div className="w-72 m-2 bg-baseColor/40 p-2 rounded-2xl">
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
                className="bg-baseColor rounded-2xl p-2 text-hpink hover:bg-baseColor/70" 
                onClick={() =>history.push(`/addAds/${data.id}`)}>Add advertise
            </button>
            <div className="bg-hpink rounded-2xl my-2 w-full p-2">
                <div>
                    <p>title: {data.post.title}</p>
                    <p>text: {data.post.text}</p>
                    <p>link: {data.post.link}</p>
                    <p>phone: {data.post.phone}</p>
                    <p>address: {data.post.address}</p>
                    <p>email: {data.post.email}</p>
                    <video src={data?.post?.video} width="320" height="240" type="video/mp4" controls></video>
                    <div className="flex justify-between text-[10px] text-gray-500">
                        <div className="flex w-[70px] justify-between">
                            <p>100</p>
                            <p>Reach</p>
                        </div>
                        <div className="flex w-[70px] justify-between">
                            <p>$10</p>
                            <p>Spent</p>
                        </div>
                    </div>
                </div>
           
                <div className="flex justify-between my-2">
                    <button 
                    className="bg-green-600 py-1 px-3 text-white rounded-xl hover:bg-green-800"
                    onClick={edit}>Post edit</button>
                    <button 
                    className="bg-red-600 py-1 px-3 text-white rounded-xl hover:bg-red-800"
                    onClick={() => setShow(true)}>Post delete</button>
                </div>
            </div>
        </div>
    )
}

export default PostCard