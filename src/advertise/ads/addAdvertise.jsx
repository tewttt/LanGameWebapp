import React, {useEffect, useState} from "react"
import { useHistory , useParams} from "react-router-dom"
import { MdOutlineCancel } from "react-icons/md";
import useAds from "../../hook/useAds";

export default function AddAdvertise() {
    const {id} = useParams();
    // console.log(id)
    const {sendAds , getStatic} = useAds(id)
    const [ads, setAds] = useState({
        gender: "",
        startAge: "",
        endAge: "",
        totalBudget:"",
        location:"",
       
       
    })
    useEffect(() => {
        getStatic(ads)
    } , [ads])

    const totalPerson = (ads?.totalBudget * 10)/100
//    console.log(totalPerson )
    const history = useHistory()

    const changeGender = (e) => {
        setAds({...ads, gender: e.target.value})
    }
    const changeStartAge = (e) => {
        setAds({...ads, startAge: e.target.value})
    }
    const changeEndAge = (e) => {
        setAds({...ads, endAge: e.target.value})
    }
  
    const changeBudget = (e) => {
        setAds({...ads, totalBudget: e.target.value})
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <MdOutlineCancel className="my-5" onClick={() => history.push("/ads")} size={30}/>
            <div className="flex flex-col w-[300px] ">
                <div className="border border-baseColor w-full rounded-xl p-2">
                    <p>Gender {ads.gender}</p>
                    <select 
                        onChange={changeGender}
                        className="bg-hpink w-full h-[40px]">
                        <option>All</option>
                        <option>Man</option>
                        <option>Woman</option>
                    </select>
                </div>
               
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <div>Location</div>
                </div>
               
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>start age</p>   
                    <input type="number"  onChange={changeStartAge} placeholder="start age"/>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>end age</p>   
                    <input type="number" onChange={changeEndAge} placeholder="end age"/>
                </div>
              
                <div className="flex justify-between border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>total budget</p>
                    <input onChange={changeBudget} className="w-[100px]" placeholder="budget" type="number"/>
                    <p>₮</p>
                </div>
                <div className="flex justify-end">
                   <p>goal  person</p>
                   <p> {totalPerson}</p>
                </div>
                <p>total Customer</p>
               
            </div>
            <button onClick={() => sendAds(ads , totalPerson)} className=" border my-5 border-baseColor w-[200px] rounded-2xl h-[40px]">send</button>
        </div>
    )
}