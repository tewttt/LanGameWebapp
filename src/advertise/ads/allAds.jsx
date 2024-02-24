import React from "react"
import useAds from "../../hook/useAds"
import AdsCart from "./AdsCart";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import { useHistory } from "react-router-dom"
export default function AllAds () {
    const {allads} = useAds()
    const history = useHistory()
   
    return (
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-20 text-white">
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/ads")}/>
                    <p>Total ads </p>
                    <p className="mx-2"> {allads.length}</p>
                </div>
                <IoIosSettings size={20}/>
            </div>
            <div className="flex flex-wrap justify-center mt-4">
                {allads.map((e, i) => (
                    <AdsCart data={e} key={i}/>
                ))}
            </div>
        </div>
    )
}