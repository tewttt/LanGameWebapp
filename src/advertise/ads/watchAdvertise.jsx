import { MdOutlineCancel } from "react-icons/md";
import { useHistory, useParams ,Link } from "react-router-dom";
import React, {useContext,  useEffect , useState} from "react"
import UserContext from "../../context/UserContext";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import video from "../../../src/assets/video/1.mp4"
import useAds from "../../hook/useAds";
import usePost from "../../hook/usePost";
import Modal from "../../components/General/Modal"
// TO DO
// ads search 
// start date
// search age, gender, 
// total bidget
// start time
// hedees heden hvn harsan ?
// location sign up hiihed location awj bolohuu 
// all users shvvlt hiih , haragdah hvmvvsiig songoh
// dansan dah mongiig shalgah
// accept iin daraa amount baiwal start true bolgoh , start date ogoh
// if amount hvrehgvi baiwal dansaa tsenegleh
// dansaa honogiin dotor tseneglehgvi bol accept iig denied bolgoh

// balance collection
// 1 hvn odort 5 ads vzne, omno vzsenee vzej bolno

const TIME = 5
let intervalIds = [];

export default function WatchAdvertise () {
    const {id} = useParams();
    const {getAds, ads  , putTransaction , addCoinShow} = useAds(id)
    const { getPostAds , postDataAds} = usePost()
    // console.log(addCoinShow)
    // console.log(postDataAds?.post)
    const [time, setTime] = useState(TIME) 
    const [showTime , setShowTime] = useState(false)
    const ctx = useContext(UserContext)
    const history = useHistory();
    useEffect (() => {
        if(id){
            getAds(id) 
        }
    },[id])
    useEffect (() => {
        if(ads?.postId){
            getPostAds(ads?.postId) 
        }
    },[ads?.postId])

    const data = {
        coin: 100,
        label: "watch video",
        labelType: "ads",
        type: "deposit",
        adsId: id,
    }
        
    useEffect(() => {
        intervalIds.push( setInterval(startTimer, 1000))
         return ()=>{
          clearIntervals() 
        }
    }, []);

    const clearIntervals = () => {
    intervalIds.map(i=>clearInterval(i))
    intervalIds = [];
    }

    useEffect(() => {
        if (showTime)
        putTransaction(data, id)
        // ctx.putTransaction(data , id)
     },[showTime])

    const startTimer = () => {
        setTime(prev =>{
            let next = prev - 1; 
            if(next <= 0) {
              next = 0
              setShowTime(true)
            }
            return next;
          }) 
    }
  
    return (
        <div className=" relative h-screen flex flex-col justify-center items-center">
            <Modal show={addCoinShow}>
                <div> add 100 coin </div>
            </Modal>
            <div className="flex absolute top-0 left-0 w-full justify-between">
                <div>
                 {showTime && <MdOutlineCancel size={30} color="blue" onClick={() =>history.push("/gameHome")}/>}   
                </div>
                {!showTime &&  <div>second {time}</div>}
               
                <div>coin 100</div>
            </div>

            <div className="flex bg-baseColor justify-center text-hpink rounded-2xl py-2 px-4 m-2 border border-baseColor">
                 <a 
                    // className="bg-baseColor text-hpink py-2 px-4 rounded-2xl"
                    href={postDataAds?.post?.link} target="_blank" rel="noopener noreferrer">
                  visit {postDataAds?.post?.title}
                 </a>
            </div>
 
            {/* <button onClick={() => ctx.transaction(100, "ads" )}>add coin</button> */}
            <div className="flex bg-red-300">
                <video src={postDataAds?.post?.video} width="320" height="240" type="video/mp4" controls autoPlay></video>
            
            </div>
            <div className="w-[300px] ">
                <div className="flex rounded-2xl py-2 px-4 m-2 border border-baseColor">
                  <p className="w-[100px]">address: </p>
                  <p>{postDataAds?.post?.address} </p>
                </div>
               <div className="flex rounded-2xl py-2 px-4 m-2 border border-baseColor">
                <p className="w-[100px]">email:</p>
                <p> {postDataAds?.post?.email} </p>
                </div>
              
                
                <div className="flex rounded-2xl py-2 px-4 m-2 border border-baseColor">
                  <p className="w-[100px]">title</p>
                  <p> {postDataAds?.post?.title} </p>
                </div>
                <div className="flex rounded-2xl py-2 px-4 m-2 border border-baseColor">
                    <p className="w-[100px]">text</p>
                    <p>{postDataAds?.post?.text} </p>
                </div>
               
            </div>
        </div>
    ) 
}

