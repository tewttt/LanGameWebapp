import React, {useState, useEffect} from "react"
import { useHistory , useParams} from "react-router-dom"
import { MdOutlineCancel } from "react-icons/md";
import useAds from "../../hook/useAds";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

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
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-72 text-white">
             
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push(`/oneAds/${id}`)}/>
                    <p>Edit ads </p>
                </div>
                <IoIosSettings size={20}/>
            </div>

            <div className="w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex justify-between my-1 py-1">
                    <p>gender {ads?.gender}</p>
                    <select 
                        onChange={changeGender}
                        className="w-3/4 p-1 rounded-xl ">
                        <option>{ads?.gender}</option>
                        <option>All</option>
                        <option>Men</option>
                        <option>Women</option>
                       
                    </select>
                </div>

                <div className="flex justify-between my-1 py-1">
                    <p className="">Age</p>
                    <p>{}</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p className="">Name</p>
                    <p>{}</p>
                </div>

                
               
                <div className="flex justify-between my-1 py-1">
                    <p>Location</p>
                </div>
               
                <div className="flex justify-between my-1 py-1">
                    <p>days duration</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                    <p>total budget</p>
                    <input onChange={changeBudget} value={ads?.totalBudget} type="number" className="w-[100px]" placeholder="budget" type="number"/>
                    <p>₮</p>
                </div>
                <div className="flex justify-between my-1 py-1">
                   <p>goal  person</p>
                   <p> {totalPerson}</p>
                </div>
               
            </div>
            <button 
                onClick={() => editAds(ads, id)} 
                className="mt-10  bg-baseBlue1 hover:bg-blue-600 text-white  rounded-2xl p-2 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                    Edit save 
            </button>
          
        </div>
    )
}