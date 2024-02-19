import React, {useEffect, useState} from "react"
import { useHistory , useParams} from "react-router-dom"
import useAds from "../../hook/useAds";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

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
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-96 text-white">
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/ads")}/>
                    <p>Add advertise</p>
                </div>
                <IoIosSettings size={20}/>
            </div>
           
            <div className="flex flex-col border border-helpGray rounded-2xl p-2 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex items-center justify-between py-1 my-1">
                    <p>Gender {ads.gender}</p>
                    <select 
                        onChange={changeGender}
                        className="text-baseBlack w-3/4 rounded-2xl p-1 text-center">
                        <option>All</option>
                        <option>Man</option>
                        <option>Woman</option>
                    </select>
                </div>
               
                {/* <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <div>Location</div>
                </div> */}
               
                <div className="flex items-center justify-between py-1 my-1">
                    <p>Start age</p>   
                    <input 
                        className="text-baseBlack w-3/4 rounded-2xl p-1 text-center" 
                        type="number"  onChange={changeStartAge} placeholder="start age"/>
                </div>
                <div className="flex items-center justify-between py-1 my-1">
                    <p>End age</p>   
                    <input 
                        className="text-baseBlack w-3/4 rounded-2xl p-1 text-center"
                        type="number" onChange={changeEndAge} placeholder="end age"/>
                </div>
              
                <div className="flex items-center justify-between py-1 my-1">
                    <p>Budget</p>
                    <input 
                        className="text-baseBlack w-3/4 rounded-2xl p-1 text-center"
                        onChange={changeBudget} placeholder="budget" type="number"/>
                    <p>₮</p>
                </div>
                <div className="flex items-center justify-end py-1 my-1">
                   <p>goal  person</p>
                   <p className="text-xl ml-3"> {totalPerson}</p>
                </div>
                {/* <p>total Customer</p> */}
               
            </div>
            <button onClick={() => sendAds(ads , totalPerson)} 
                className="w-full sm:w-[80%] md:w-[60%] xl:w-[40%] bg-baseBlue1 p-2 text-center rounded-2xl my-4">
                    Send</button>
        </div>
    )
}