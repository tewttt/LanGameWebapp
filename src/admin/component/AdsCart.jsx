import React , {useEffect, useState} from "react";
import usePost from "../../hook/usePost";
import useAds from "../../hook/useAds"
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import moment from "moment"

const AdsCart = ({data}) => {
    const {getPost, post} = usePost()
    const {changeMessage} =useAds()
   
    useEffect (() => {
        getPost(data.postId) 
    },[])
    // console.log(data.id)
    return (
        <div className="text-white border border-gray-400 m-2">
            <div className="border border-green-300 m-4">
                {/* <p>{moment(data.createDate).format('YYYY-MM-DD HH:mm:ss:SSS')}</p> */}
                <p> {moment(data.createDate.toDate()).calendar()}</p>
                <p>Name: {data.userName}</p>
                <p>Email: {data.userEmail}</p>
                <p>Phone: {data.userPhone}</p>
                <p>message: {data.message}</p>
                <button onClick={() => changeMessage("accept", data.id)} className="bg-green-500 p-2 mx-2" >Accept</button>
                <button onClick={() => changeMessage("denied", data.id)} className="bg-red-500 p-2 mx-2">Denied</button>
            </div>
            <div className="border border-green-300 m-4">
                <p>age: {data.age}</p>
                <p>Total day: {data.durationDate}</p>
                <p>Start date: {data.startDate}</p>
                <p>End Date: {data.endDate}</p>
                <p>Start time: {data.startTime}</p>
                <p>Total budget: {data.totalBudget}</p>
            </div>

            <div className="border border-green-300 m-4">
                 <Video
                 //  autoPlay loop
                 // poster={photo}
                 on
                 >
                 <source src={post?.video} type="video/webm" />
                 </Video>
                 <p>{post?.post?.title}</p>
                 <p>{post?.post?.text}</p>
                 <p>{post?.post?.address}</p>
                 <p>{post?.post?.email}</p>
                 <p>{post?.post?.phone}</p>
                 <p>{post?.post?.link}</p>
             </div>           
        </div>
    )
}
export default AdsCart;