import React , {useEffect, useState} from "react";
import usePost from "../../hook/usePost";
import { useHistory } from "react-router-dom"

const AdsCart = ({data}) => {
    // console.log(data)
    const adsId = data?.id
    const postId = data?.postId
    const { getPostAds , postDataAds} = usePost()
    const history = useHistory()

   const viewDetail = () => {
     history.push(`/oneAds/${adsId}`)
   }
    useEffect (() => { 
        if(postId){
            getPostAds(postId) 
        }
    },[postId])
    const totalPerson = (data.ads.totalBudget * 10)/100
   
    return (
        <div className="border border-gray-400 m-2 w-[350px] flex flex-col p-2">
            <div className="flex flex-col border border-baseColor w-full rounded-xl p-2 my-2">
                <p>Advertise information</p>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>age: {data.ads.age}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>gender: {data.ads.gender}</p>
                </div>
                <div className="flex justify-between border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>budget: {data.ads.totalBudget}₮</p>
                    <div className="flex">
                    <p>goal  person</p>
                    <p>{totalPerson}</p>
                    </div>
                </div>
                
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>Ads: {data.message}</p>
                </div>
            </div>

            <div className="border border-baseColor w-full rounded-xl p-2 my-2">
                <p>Post information</p>
    
                 <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p>title</p>
                   <p> {postDataAds.post?.title}</p>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                   <p>text</p>
                   <p> {postDataAds.post?.text}</p>
                </div>
            </div>  
            <button onClick={viewDetail}>View detail</button>          
        </div>
    )
}
export default AdsCart;