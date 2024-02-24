import React, {useState, useEffect} from "react"
import { useHistory , useParams} from "react-router-dom"
import useAds from "../../../hook/useAds";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import Slider from "react-slider"
import css from "./style.module.css"
export default function EditAdvertise() {
    const {id} = useParams();
    const MIN = 0;
    const MAX = 100
    const [values, setValues] = useState([MIN, MAX]);

    const { allads,editAds, deleteAds} = useAds(id)
    const [ads, setAds] = useState({
        gender: "",
        startAge: "",
        endAge: "",
        totalBudget:"",
        location:"",
       
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

    useEffect(() => {
        setAds({...ads, startAge: values[0] , endAge: values[1]})
    } ,[values])

    const history = useHistory()

    const changeGender = (e) => {
        setAds({...ads, gender: e.target.value})
    }
   
    const changeBudget = (e) => {
        setAds({...ads, totalBudget: e.target.value})
    }
    return (
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-96 text-white">
             
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push(`/oneAds/${id}`)}/>
                    <p>Edit ads </p>
                </div>
                <IoIosSettings size={20}/>
            </div>

            <div className=" w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex justify-between my-1 py-1">
                    <p>gender {ads?.gender}</p>
                    <select 
                        onChange={changeGender}
                        className="w-3/4 p-1 rounded-xl text-baseBlack">
                        <option>{ads?.gender}</option>
                        <option>All</option>
                        <option>Men</option>
                        <option>Women</option>
                       
                    </select>
                </div>
            <div>Age{values[0]} - {values[1]}</div>
            <Slider 
                className={css.slider} 
                value={values} 
                min={MIN} 
                max={MAX}
                onChange={setValues}
                
            />
                
            <div className="flex justify-between mt-4 py-1">
                <p>total budget</p>
                <input className="text-baseBlack rounded-2xl p-1" onChange={changeBudget} value={ads?.totalBudget} type="number" placeholder="budget"/>
                <p>₮</p>
            </div>
            <div className="flex justify-end my-1 py-1">
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