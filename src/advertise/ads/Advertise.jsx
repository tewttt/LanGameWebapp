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
        <div className="relative m-3 h-screen flex flex-col">
            <div className="flex justify-between">
                <MdOutlineCancel 
                    className="hover:scale-110 hover:text-red-500" 
                    onClick={() => history.push("/gameHome")} 
                    size={30}
                />
                <div 
                    className="bg-baseColor px-4 h-[40px] text-hpink font-bold rounded-2xl flex justify-center items-center
                    hover:bg-baseColor/80 hover:text-purple-200"
                    onClick={() =>  history.push("/post")}>
                    Add post 
                </div>
                <div 
                    className="bg-hpink  h-[40px] font-bold text-baseColor/80 rounded-2xl 
                    flex justify-center items-center px-3 hover:bg-baseColor/10"
                    onClick={() =>  history.push("/allAds")}>
                    Advertise list 
                </div>
            </div>
        
            <div className="flex flex-col-4 mt-2">
                {posts.map((e, i) => (
                    <PostCard data={e} key={i}/>
                ))}
            </div>
        </div>
    )
}

