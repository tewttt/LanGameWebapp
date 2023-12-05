import React, {useState} from "react"
import { useHistory , useParams} from "react-router-dom"
import { MdOutlineCancel } from "react-icons/md";
import useAds from "../../hook/useAds";

export default function AddAdvertise() {
    const {id} = useParams();
    // console.log(id)

    const {sendAds} = useAds(id)
    const [ads, setAds] = useState({
        gender: "",
        age: "",
        totalBudget:"",
        location:"",
        startDate:"",
        endDate:"",
        durationDate:"",
        startTime:""
    })
   
    const history = useHistory()
    return (
        <div className="text-red-400">
              <MdOutlineCancel className="mb-10" onClick={() => history.push("/advertise")} size={30}/>
            <div>
                <div>
                    <p>gender</p>
                    <select className="bg-black">
                        <option>All</option>
                        <option>Men</option>
                        <option>Women</option>
                    </select>
                </div>

                <p>age </p>
                <div>Location</div>
                <div>
                    <p>start date</p>   
                    <input type="date"/>
                </div>
                <div>
                    <p>end date</p>   
                    <input type="date"/>
                </div>
                <div>
                    <p>start time</p>   
                    <input type="time"/>
                </div>
            
                <p>days duration</p>
                <p>total budget</p>
            </div>
            <button onClick={() => sendAds(ads)} className="mt-10 border border-red-400 w-[200px] h-[40px]">send</button>
        </div>
    )
}