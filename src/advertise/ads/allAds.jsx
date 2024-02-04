import React from "react"
import useAds from "../../hook/useAds"
import AdsCart from "./AdsCart";

import { MdOutlineCancel } from "react-icons/md";
import { useHistory } from "react-router-dom"
export default function AllAds () {
    const {allads} = useAds()
    const history = useHistory()
   
    return (
        <div className="">
            <MdOutlineCancel className="hover:text-red-500" onClick={() => history.push("/ads")} size={30}/>
            total ads {allads.length}
            {allads.map((e, i) => (
                <AdsCart data={e} key={i}/>
            ))}
        </div>
    )
}