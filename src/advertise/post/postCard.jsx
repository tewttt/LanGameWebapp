import React from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { useHistory } from "react-router-dom"
import usePost from "../../hook/usePost";

const PostCard = ({data}) => {
    const history = useHistory()
    const {getPost, deletePost} = usePost();
    const edit = () => {
        getPost(data.id)
        history.push(`/editpost/${data.id}`)
    }
    const remove = () => {
        deletePost(data.id)
    }
   
    return (
        <div className="w-72 m-2 bg-baseColor/40 p-2 rounded-2xl">
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
                    <Video className="w-full">
                        <source src={data?.post?.video}/>
                    </Video>
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
                    onClick={remove}>Post delete</button>
                </div>
            </div>
        </div>
    )
}

export default PostCard