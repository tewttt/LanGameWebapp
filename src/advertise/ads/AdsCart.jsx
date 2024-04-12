import React , {useEffect, useState} from "react";
import usePost from "../../hook/usePost";
import { useHistory } from "react-router-dom"

const AdsCart = ({data}) => {
    // console.log(data)
    const adsId = data?.id
    const postId = data?.postId
    const { getPostAds , postDataAds , filterUsers} = usePost()
    const history = useHistory()
// console.log(filterUsers)

   const viewDetail = () => {
     history.push(`/oneAds/${adsId}`) 
   }
   
    useEffect (() => { 
        if(postId){
            getPostAds(postId) 
        }
    },[postId])
    const totalPerson = (data?.ads?.totalBudget * 10)/100
   
    return (
        <div className="w-[300px] m-2 border border-helpGray p-1 rounded-2xl">
            <div className="flex flex-col w-full rounded-xl p-1 my-2">
                <p className="text-xl text-center">Advertise information</p>
                <div className="flex justify-between w-full  p-1">
                    <p>Age </p>
                    <p>from</p>
                    <p className="font-bold">{data?.ads?.startAge}</p>
                    <p>to</p>
                    <p className="font-bold">{data?.ads?.endAge}</p>
                </div>
                <div className="w-full flex justify-between p-1">
                    <p >Gender</p>
                    <p className="font-bold">{data?.ads?.gender}</p>
                </div>
                <div className="w-full flex justify-between p-1">
                    <p >Budget</p>
                    <p className="font-bold">{data?.ads?.totalBudget}₮</p>
                </div>
                <div className="w-full flex justify-between p-1 ">
                    <p>Goal person</p>
                    <p className="font-bold"> {totalPerson} / {data?.watchedPerson} </p>
                </div>
                <div className="w-full flex justify-between p-1 ">
                    <p>Facebook click</p>
                    <p className="font-bold">{data?.clickFacebook} </p>
                </div>
                <div className="w-full flex justify-between p-1 ">
                    <p>Instagram click </p>
                    <p className="font-bold"> {data?.clickInstagram} </p>
                </div>
                <div className="w-full flex justify-between p-1 ">
                    <p>Other click</p>
                    <p className="font-bold"> {data?.clickSocial} </p>
                </div>
                
                <div className="w-full flex items-center justify-between p-1 my-1">
                    <p className="flex">message: <span className="font-bold uppercase mx-3 text-red-500">{data?.message}</span></p>

                    {data?.message === "accept" && 
                    <div className="flex items-center">
                        <p>ads</p>
                        {data?.doneAds ? <p className="text-green-500 p-2 "> done</p>
                        : <p className="text-orange-500 font-bold mx-2 uppercase"> continue</p>}
                     </div>
                    }
                </div>
                <p className="p-1 w-full">reason: <span className="mx-2 text-green-500">{data?.result}</span></p>
                
                
            </div>

            <div className="flex flex-col  w-full p-1 my-2">
                <p className="text-xl text-center">Post information</p>
                 <div className="w-full flex flex-col my-1">
                   <p className="text-gray-400 mr-2"> Title</p>
                   <p> {postDataAds?.post?.title}</p>
                </div>
                <div className="w-full flex flex-col my-1">
                   <p className="text-gray-400 mr-2">Text</p>
                   <p> {postDataAds?.post?.text}</p>
                </div>
            </div>  
            <button className="bg-baseBlue1 rounded-2xl my-2 hover:bg-blue-600 p-2 w-full" onClick={viewDetail}>View detail</button>          
        </div>
    )
}
export default AdsCart;