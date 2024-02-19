import React  from "react"
import { MdOutlineCancel } from "react-icons/md";
import "react-html5video/dist/styles.css";
import PostCard from "../post/postCard";
import { useHistory } from "react-router-dom"
import usePost from "../../hook/usePost";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

export default function AddAdvertise() {
   
    const {posts} = usePost();
    const history = useHistory()
    return (
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-52 text-white">
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/gameHome")}/>
                    <p>Ads</p>
                </div>
                <IoIosSettings size={20}/>
            </div>
            <div className="w-full sm:w-[80%] flex items-center justify-between">
                <div  
                    className="w-1/2 text-center mx-2 bg-baseBlue1 font-semibold rounded-2xl px-6 py-2 hover:bg-blue-600"
                    onClick={() =>  history.push("/post")}>
                    Add post 
                </div>
                <div 
                    className="w-1/2 text-center mx-2 border border-helpGray font-semibold rounded-2xl px-6 py-2 hover:bg-blue-600"
                    onClick={() =>  history.push("/allAds")}>
                    Advertise list 
                </div>
            </div>
        
            <div className="flex flex-wrap justify-center mt-4">
                {posts.map((e, i) => (
                    <PostCard data={e} key={i}/>
                ))}
            </div>
        </div>
    )
}

