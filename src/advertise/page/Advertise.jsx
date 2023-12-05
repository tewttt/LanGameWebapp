import React  from "react"
import { MdOutlineCancel } from "react-icons/md";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import video from "../../../src/assets/video/1.mp4"
import PostCard from "../components/postCard";

import { useHistory } from "react-router-dom"
import usePost from "../../hook/usePost";

export default function AddAdvertise() {
    const {posts} = usePost();
    // console.log(posts)
    const history = useHistory()
    return (
        <div className="text-white relative m-3 h-screen flex flex-col">
            <div className="flex justify-between">
                <MdOutlineCancel onClick={() => history.push("/gameHome")} size={30}/>
                <div onClick={() =>  history.push("/addPost")}>add post </div>
            </div>
            <div className="flex flex-col flex-wrap">
                {posts.map((e, i) => (
                    <PostCard data={e} key={i}/>
                ))}
                </div>
        </div>
    )
}

