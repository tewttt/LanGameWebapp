import React , {useEffect, useState} from "react";
import usePost from "../../hook/usePost";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import moment from "moment"
import { useHistory , useParams} from "react-router-dom"
const AdsCart = ({data}) => {
    const {getPost, posts, post} = usePost()
    const history = useHistory()
    const [postData , setPostData] = useState([])
    useEffect(() => {
        if(posts) {
            const dd = posts.find(
                // item => console.log(item.id)
                item => item.id === data.postId
            );
            setPostData(dd?.post)
        }
       },[posts])
    // useEffect (() => {
    //     getPost(data.postId) 
    // },[])
   
   
    return (
        <div className="text-white border w-1/2 border-gray-400 m-2">
            <div className="border border-green-300 m-4">
                {/* <p>{moment(data.createDate).format('YYYY-MM-DD HH:mm:ss:SSS')}</p> */}
                <p> {moment(data.createDate.toDate()).calendar()}</p>
                <p>Name: {data.userName}</p>
                <p>Email: {data.userEmail}</p>
                <p>Phone: {data.userPhone}</p>
                <p>message: {data.message}</p>
                {/* <button onClick={() => changeMessage("accept", data.id)} className="bg-green-500 p-2 mx-2" >Accept</button>
                <button onClick={() => changeMessage("denied", data.id)} className="bg-red-500 p-2 mx-2">Denied</button> */}
            </div>
            <div className="border border-green-300 m-4">
                <p>age: {data.ads.age}</p>
                <p>Total day: {data.ads.durationDate}</p>
                <p>Start date: {data.ads.startDate}</p>
                <p>End Date: {data.ads.endDate}</p>
                <p>Start time: {data.ads.startTime}</p>
                <p>Total budget: {data.ads.totalBudget}</p>
                <button onClick={() => history.push(`editads/${data.id}`)}>edit advertise</button>
            </div>

            <div className="border border-green-300 m-4">
                <div className="w-[200px] h-[200px]">
                    <Video
                    //  autoPlay loop
                    // poster={photo}
                    on
                    >
                    <source src={postData?.video} type="video/webm" />
                 </Video>
                 </div>
                 <p>{postData?.title}</p>
                 <p>{postData?.text}</p>
                 <p>{postData?.address}</p>
                 <p>{postData?.email}</p>
                 <p>{postData?.phone}</p>
                 <p>{postData?.link}</p>
             </div>           
        </div>
    )
}
export default AdsCart;