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
        durationDate:"",
       
    })
    const totalPerson = (ads?.totalBudget * 10)/100
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
   
  
    const changeBudget = (e) => {
        setAds({...ads, totalBudget: e.target.value})
    }
    return (
        <div className="flex flex-col justify-center items-center my-5">
              <MdOutlineCancel className="mb-10" onClick={() => history.push(`/oneAds/${id}`)} size={30}/>
            
            <div className="w-[300px]">
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>gender {ads?.gender}</p>
                    <select 
                        onChange={changeGender}
                        className="w-full ">
                        <option>{ads?.gender}</option>
                        <option>All</option>
                        <option>Men</option>
                        <option>Women</option>
                       
                    </select>
                </div>
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>age </p>
                </div>
               
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>Location</p>
                </div>
               
                <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>days duration</p>
                </div>
                <div className="flex justify-between border border-baseColor  w-full rounded-xl p-2 my-1">
                    <p>total budget</p>
                    <input onChange={changeBudget} value={ads?.totalBudget} type="number" className="w-[100px]" placeholder="budget" type="number"/>
                    <p>₮</p>
                </div>
                <div className="flex justify-end">
                   <p>goal  person</p>
                   <p> {totalPerson}</p>
                </div>
               
            </div>
            <button 
                onClick={() => editAds(ads, id)} 
                className="mt-10 border bg-green-500 text-white border-baseColor rounded-2xl w-[200px] h-[40px]">
                    Edit save ads</button>
            {/* <button 
                onClick={() => deleteAds( id)} 
                className="mt-10 border bg-red-500 text-white border-baseColor rounded-2xl w-[200px] h-[40px]">
                    Delete ads</button> */}
        </div>
    )
}