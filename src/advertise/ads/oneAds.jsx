import React , {useEffect, useState} from "react";
import usePost from "../../hook/usePost";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import moment from "moment"
import { useHistory , useParams} from "react-router-dom"
import Modal from "../../components/General/Modal";
import useAds from "../../hook/useAds";
import { MdOutlineCancel } from "react-icons/md";

const OneAds = () => {
    const {id} = useParams();
    const {ads , getAds} = useAds(id)
    const { getPostAds , postDataAds} = usePost()
    const history = useHistory()
    const [show, setShow] = useState(false)
    // console.log(ads.endDate)
// console.log(postDataAds?.post?.email)
const totalPerson = (ads?.ads?.totalBudget * 10)/100
   
    useEffect (() => {
        if(id){
            getAds(id) 
        }
    },[id])

     useEffect (() => {
        if(ads?.postId){
            getPostAds(ads?.postId) 
        }
    },[ads?.postId])

   const remove = () => {
    alert("delete")
   }
   const changeMessage = () => {

   }

   // аргал, чулуу ,  angry , fire, wind, tree,  lucky , smile, kiss, shooloh, heart, гуниглах
    return (
       
        <div className="border border-gray-400 m-2 w-[350px] flex flex-col p-2">
            <MdOutlineCancel className="mb-2" onClick={() => history.push("/allAds")} size={30}/>
          
           <Modal show={show} >
                <div className="flex flex-col">
                    <p className="text-red-500 text-lg my-3 text-center">Are you sure delete the post ?</p>
                    <div className="flex justify-between">
                        <button  
                            className="bg-green-500 py-3 px-10 rounded-2xl text-white"
                            onClick={() => setShow(false)}>NO</button>
                        <button 
                        className="bg-red-500 text-white py-3 px-6 rounded-2xl"
                        onClick={remove}>Yes, delete advertise</button>
                    </div>
                </div>
            </Modal>
            <div className="border border-baseColor w-full rounded-xl p-2 mb-2">
                <p className="text-center text-xl ">User information</p>
               
                <p>Name: {ads?.userName}</p>
                <p>Email: {ads?.userEmail}</p>
                <p>Phone: {ads?.userPhone}</p>
                <p>Ads: {ads?.message}</p>
                {/* <button onClick={() => changeMessage("accept", id)} className="bg-green-500 p-2 mx-2" >Accept</button> */}
                {/* <button onClick={() => changeMessage("denied", id)} className="bg-red-500 p-2 mx-2">Denied</button> */}
            </div>
            
            <div className="flex flex-col border border-baseColor w-full rounded-xl p-2 my-2">
                <p>Advertise information</p>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>age: {ads?.ads?.age}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>gender: {ads?.ads?.gender}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>Total day: {ads?.ads?.durationDate}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p> {moment(ads?.createDate?.toDate()).calendar()}</p>
                    
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>Start date: {moment(ads?.startDate?.toDate()).calendar()}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>End Date: {moment(ads?.endDate?.toDate()).calendar()}</p>
                </div>
               
                <div className="flex justify-between border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>budget: {ads?.ads?.totalBudget}₮</p>
                    <div className="flex">
                    <p>goal  person</p>
                    <p>{totalPerson}</p>
                    </div>
                </div>
             
                
                
                <div className="flex justify-between">
                    
                    <button 
                        className="bg-green-500 py-3 px-6 rounded-2xl text-white"
                        // /oneAds/:id/edit
                        onClick={() => history.push(`/oneEdit/${id}`)}>Edit advertise
                    </button>
                    <button 
                        className="bg-red-500 py-3 px-6 rounded-2xl text-white"
                        onClick={() => setShow(true)}>Delete advertise
                    </button>
                </div>
            </div>

            <div className="border border-baseColor w-full rounded-xl p-2 my-2">
                <p>Post information</p>
                <div className="w-full">
                   <video src={postDataAds.post?.video} width="320" height="240" type="video/mp4" controls></video>
                </div>
                 <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p>title</p>
                   <p> {postDataAds?.post?.title}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p>text</p>
                   <p>{postDataAds.post?.text}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p>Address</p>
                   <p>{postDataAds.post?.address}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p>Email</p>
                   <p>{postDataAds.post?.email}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p>Phone</p>
                   <p>{postDataAds.post?.phone}</p>
                </div>

                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p>Link</p>
                   <p>{postDataAds.post?.link}</p>
                </div>
               
            </div>           
        </div>
    )
}
export default OneAds;