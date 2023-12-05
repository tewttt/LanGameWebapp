import React, {useEffect} from "react"
import useAds from "../../hook/useAds"
import AdsCart from "../component/AdsCart";

export default function Ads () {
    const {ads} = useAds()

    return (
        <div>
            {ads.map((e, i) => (
            <AdsCart data={e} key={i}/>
            ))}
        </div>
    )
}