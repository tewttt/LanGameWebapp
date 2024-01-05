import React, {useState, useEffect} from "react"
import { useHistory , useParams} from "react-router-dom"
import { MdOutlineCancel } from "react-icons/md";
import useAds from "../../hook/useAds";

export default function EditAdvertise() {
    const {id} = useParams();
    // console.log(id)

    const { allads,editAds, deleteAds} = useAds(id)
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
//   console.log(ads)
   useEffect(() => {
    if(allads) {
        const data = allads.find(
            item => item.id === id
        );
        // console.log(data)
        setAds(data?.ads)
    }
   },[allads])
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
                    <p>gender {ads?.gender}</p>
                    <select 
                        onChange={changeGender}
                        className="bg-black">
                        <option>{ads?.gender}</option>
                        <option>All</option>
                        <option>Men</option>
                        <option>Women</option>
                       
                    </select>
                </div>

                <p>age </p>
                <div>Location</div>
                <div>
                    <p>start date</p>   
                    <input type="date"  value={ads?.startDate} onChange={changeStart}/>
                </div>
                <div>
                    <p>end date</p>   
                    <input type="date" value={ads?.endDate} onChange={changeEnd}/>
                </div>
                <div>
                    <p>start time</p>   
                    <input type="time" value={ads?.startTime} onChange={changeTime}/>
                </div>
            
                <p>days duration</p>
                <p>total budget</p>
    
                <input onChange={changeBudget} value={ads?.totalBudget} placeholder="budget" type="number"/>
            </div>
            <button onClick={() => editAds(ads, id)} className="mt-10 border border-red-400 w-[200px] h-[40px]">edit save</button>
            <button onClick={() => deleteAds( id)} className="mt-10 border border-red-400 w-[200px] h-[40px]">delete ads</button>
        </div>
    )
}