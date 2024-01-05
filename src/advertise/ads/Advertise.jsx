import React  from "react"
import { MdOutlineCancel } from "react-icons/md";
import "react-html5video/dist/styles.css";
import PostCard from "../post/postCard";
import { useHistory } from "react-router-dom"
import usePost from "../../hook/usePost";

export default function AddAdvertise() {
   
    const {posts} = usePost();
    const history = useHistory()
    return (
        <div className="text-white relative m-3 h-screen flex flex-col">
            <div className="flex justify-between">
                <MdOutlineCancel onClick={() => history.push("/gameHome")} size={30}/>
                <div onClick={() =>  history.push("/post")}>add post </div>
                <div onClick={() =>  history.push("/allAds")}>Advertise list </div>
            </div>
        
            <div className="flex flex-col flex-wrap">
                {posts.map((e, i) => (
                    <PostCard data={e} key={i}/>
                ))}
                </div>
        </div>
    )
}

