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
   console.log(ads)
    const history = useHistory()

    const changeGender = (e) => {
        setAds({...ads, gender: e.target.value})
    }
    const changeStart = (e) => {
        setAds({...ads, startDate: e.target.value})
    }
    const changeEnd = (e) => {
        setAds({...ads, endDate: e.target.value})
    }
    const changeTime = (e) => {
        setAds({...ads, startTime: e.target.value})
    }
    const changeBudget = (e) => {
        setAds({...ads, totalBudget: e.target.value})
    }
    return (
        <div className="text-red-400">
              <MdOutlineCancel className="mb-10" onClick={() => history.push("/advertise")} size={30}/>
            <div>
                <div>
                    <p>gender {ads.gender}</p>
                    <select 
                        onChange={changeGender}
                        className="bg-black">
                        <option>All</option>
                        <option>Men</option>
                        <option>Women</option>
                    </select>
                </div>

                <p>age </p>
                <div>Location</div>
                <div>
                    <p>start date</p>   
                    <input type="date"  onChange={changeStart}/>
                </div>
                <div>
                    <p>end date</p>   
                    <input type="date" onChange={changeEnd}/>
                </div>
                <div>
                    <p>start time</p>   
                    <input type="time" onChange={changeTime}/>
                </div>
            
                <p>days duration</p>
                <p>total budget</p>
                <input onChange={changeBudget} placeholder="budget" type="number"/>
            </div>
            <button onClick={() => sendAds(ads)} className="mt-10 border border-red-400 w-[200px] h-[40px]">send</button>
        </div>
    )
}