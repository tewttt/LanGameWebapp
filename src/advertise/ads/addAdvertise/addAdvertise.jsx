import React, {useEffect, useState} from "react"
import { useHistory , useParams} from "react-router-dom"
import useAds from "../../../hook/useAds";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import css from "./style.module.css"
import Slider from "react-slider"

export default function AddAdvertise() {
    const {id} = useParams();
    const {sendAds , getStatic} = useAds(id)
    const MIN = 13;
    const MAX = 100
    const [values, setValues] = useState([MIN, MAX]);

    const [ads, setAds] = useState({
        gender: "All",
        startAge: 13,
        endAge: 100,
        totalBudget: 10000,
        location:"",
    })

    useEffect(() => {
        setAds({...ads, startAge: values[0] , endAge: values[1]})
    } ,[values])

    useEffect(() => {
        getStatic(ads)
    } , [ads])

    const totalPerson = (ads?.totalBudget * 10)/100
    const history = useHistory()

    const changeGender = (e) => {
        setAds({...ads, gender: e.target.value})
    }
  
    const changeBudget = (e) => {
        setAds({...ads, totalBudget: e.target.value})
    }

    
  
    return (
        <div className=" bg-baseBlack flex flex-col items-center px-6 p-6 pb-52 text-white">
            <div className="flex py-2 justify-between pb-4 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className="flex items-center">
                    <IoIosArrowBack size={20} onClick={() => history.push("/ads")}/>
                    <p>Add advertise</p>
                </div>
                <IoIosSettings onClick={() => history.push("/settings")} size={20}/>
            </div>
           
            <div className="h-[400px] flex flex-col border border-helpGray rounded-2xl p-2 w-full sm:w-[80%] md:w-[60%] xl:w-[40%]">
                <div className=" text-center border border-helpGreen rounded-2xl my-2 p-3">
                    <p className="text-helpGreen uppercase font-bold">Санамж</p>
                    <p className="text-gray-300">Дансаа цэнэглэсэн байх</p>
                    <p className="text-gray-300">VIDEO second: 20-60 size:1920x1080</p>
                </div>
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

                <div>Age:  {values[0]} - {values[1]}</div>

                <Slider 
                    className={css.slider} 
                    thumbClassName={css.thumb}
                    value={values} 
                    min={MIN} 
                    max={MAX}
                    onChange={setValues}
                />
               
                {/* <div className="border border-baseColor  w-full rounded-xl p-2 my-1">
                    <div>Location</div>
                </div> */}
              
                <div className="flex items-center justify-between py-1 mt-4">
                    <p>Budget</p>
                    <input 
                        className="text-baseBlack w-3/4 rounded-2xl p-1 text-center"
                        onChange={changeBudget} 
                        value={ads?.totalBudget}
                        placeholder="budget" type="number"/>
                    <p>₮</p>
                </div>
                <div className="flex items-center justify-end py-1 my-1">
                   <p>goal  person</p>
                   <p className="text-xl ml-3"> {totalPerson}</p>
                </div>
               
               
            </div>
            <button onClick={() => sendAds(ads , totalPerson)} 
                className="w-full sm:w-[80%] md:w-[60%] xl:w-[40%] bg-baseBlue1 p-2 text-center rounded-2xl my-4">
                Send
            </button>
        </div>
    )
}

// https://www.youtube.com/watch?v=lhNA_cmOG4Y