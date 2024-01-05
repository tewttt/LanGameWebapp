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
        <div className="w-72 m-2 h-72 border border-green-400">
            <button className="bg-red-500" onClick={() =>history.push(`/addAds/${data.id}`)}>add advertise</button>
           <div>
                <p>title: {data.post.title}</p>
                <p>text: {data.post.text}</p>
                <p>link: {data.post.link}</p>
                <p>phone: {data.post.phone}</p>
                <p>address: {data.post.address}</p>
                <p>email: {data.post.email}</p>
                <Video className="w-32 h-20">
                    <source src={data?.post?.video}/>
                </Video>
                <div className="flex justify-between text-xs">
                    <div>
                    <p>100</p>
                    <p>Reach</p>
                    </div>
                    <div>
                    <p>$10</p>
                    <p>Spent</p>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={edit} className="mx-2">post edit</button>
                <button onClick={remove}>post delete</button>
            </div>
        </div>
    )
}

export default PostCard