import React from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import video from "../../../src/assets/video/1.mp4"
import { useHistory } from "react-router-dom"

const PostCard = ({data}) => {
   
 
// console.log(data)
    const history = useHistory()
    return (
        <div className="w-72 m-2 h-72 border border-green-400">
           
            <button className="bg-red-500" onClick={() =>history.push(`/addAds/${data.id}`)}>add advertise</button>
            <p>{data.post.title}</p>
            <p>{data.post.text}</p>
            <p>{data.post.link}</p>
            <p>{data.post.phone}</p>
            <p>{data.post.address}</p>
            <p>{data.post.email}</p>
            <Video className="w-32 h-20">
                <source src={data.video}/>
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
    )
}

export default PostCard