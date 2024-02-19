import React , {useEffect, useState} from "react";
import usePost from "../../hook/usePost";
import moment from "moment"
import { useHistory , useParams} from "react-router-dom"
import Modal from "../../components/General/Modal";
import useAds from "../../hook/useAds";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

const OneAds = () => {
    const {id} = useParams();
    const {ads , getAds} = useAds(id)
    const { getPostAds , postDataAds} = usePost()
    const history = useHistory()
    const [show, setShow] = useState(false)

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
 
    return (
       
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-52 text-white ">
            
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%] md:w-[50%] xl:w-[30%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/allAds")}/>
                    <p>Ads detail</p>
                </div>
                <IoIosSettings size={20}/>
            </div>
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

            <div className="border border-helpGray rounded-xl p-2 mb-2 w-full sm:w-[80%] md:w-[50%] xl:w-[30%]">
                <p className="text-xl text-center">User information</p>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Name</p>
                    <p>{ads?.userName}</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Email</p>
                    <p>{ads?.userEmail}</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Phone</p>
                    <p> {ads?.userPhone}</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Ads</p>
                    <p> {ads?.message}</p>
                </div>
              
            </div>
            
            <div className="flex flex-col border border-helpGray  rounded-xl p-2 my-2 w-full sm:w-[80%] md:w-[50%] xl:w-[30%]">
                <p className="text-xl text-center">Advertise information</p>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Age</p>
                    <p>{ads?.ads?.age}</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Gender</p>
                    <p>{ads?.ads?.gender}</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Total day</p>
                    <p>{ads?.ads?.durationDate}</p>
                </div>
                
                <div className="flex justify-between my-1 py-1">
                   <p> {moment(ads?.createDate?.toDate()).calendar()}</p>    
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Start date</p>
                    <p>{moment(ads?.startDate?.toDate()).calendar()}</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Start date</p>
                    <p>{moment(ads?.startDate?.toDate()).calendar()}</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">End date</p>
                    <p>{moment(ads?.endDate?.toDate()).calendar()}</p>
                </div>

               
                <div className="flex justify-between my-1 py-1">
                    <p>budget: {ads?.ads?.totalBudget}₮</p>
                    <div className="flex">
                    <p>goal  person</p>
                    <p>{totalPerson}</p>
                    </div>
                </div>
                
                <div className="flex justify-between my-2">
                    <button 
                        className="bg-green-500 w-1/2 mr-1 p-2 font-semibold rounded-2xl text-white"
                        // /oneAds/:id/edit
                        onClick={() => history.push(`/oneEdit/${id}`)}>Edit advertise
                    </button>
                    <button 
                        className="bg-red-500 w-1/2 ml-1 p-2 rounded-2xl font-semibold text-white"
                        onClick={() => setShow(true)}>Delete advertise
                    </button>
                </div>
            </div>

            <div className="border border-helpGray rounded-xl p-2 my-2 w-full  sm:w-[80%] md:w-[50%] xl:w-[30%]">
                <p className="text-xl text-center">Post information</p>
                <video className="w-full my-2" src={postDataAds.post?.video} type="video/mp4" controls></video>
                 <div className="flex justify-between my-2">
                   <p>title</p>
                   <p> {postDataAds?.post?.title}</p>
                </div>
                <div className="flex justify-between my-2">
                   <p>text</p>
                   <p>{postDataAds.post?.text}</p>
                </div>
                <div className="flex justify-between my-2">
                   <p>Address</p>
                   <p>{postDataAds.post?.address}</p>
                </div>
                <div className="flex justify-between my-2">
                   <p>Email</p>
                   <p>{postDataAds.post?.email}</p>
                </div>
                <div className="flex justify-between my-2">
                   <p>Phone</p>
                   <p>{postDataAds.post?.phone}</p>
                </div>

                <div className="flex justify-between my-2">
                   <p>Link</p>
                   <p>{postDataAds.post?.link}</p>
                </div>
               
            </div>           
        </div>
    )
}
export default OneAds;