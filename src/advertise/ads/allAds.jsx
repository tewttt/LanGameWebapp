import React, {useEffect} from "react"
import useAds from "../../hook/useAds"
import AdsCart from "./AdsCart";
import { MdOutlineCancel } from "react-icons/md";
import { useHistory } from "react-router-dom"
export default function AllAds () {
    const {allads} = useAds()
    const history = useHistory()
    return (
        <div>
             <MdOutlineCancel className="text-white" onClick={() => history.push("/ads")} size={30}/>
            {allads.map((e, i) => (
            <AdsCart data={e} key={i}/>
            ))}
        </div>
    )
}