import { useHistory, useParams} from "react-router-dom";
import React, {  useEffect , useState} from "react"
import useAds from "../../hook/useAds";
import usePost from "../../hook/usePost";
import Modal from "../../components/General/Modal"
import pattern from "../../assets/logo/patternWhite.png"
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

const TIME = 15
let intervalIds = [];

export default function WatchAdvertise () {
    const {id} = useParams();
    const {getAds, ads  , putTransaction , addCoinShow} = useAds(id)
    const { getPostAds , postDataAds} = usePost()
    const [time, setTime] = useState(TIME) 
    const [showTime , setShowTime] = useState(false)
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
        <div className="px-6 pt-6 pb-52 bg-baseBlack text-white relative flex flex-col">
            <div 
                className="bg-cover bg-center opacity-30 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>

             <Modal show={addCoinShow}>
                <div> add 100 coin </div>
            </Modal>
            <div className="z-20 flex flex-col justify-center items-center">
                <div div className="flex py-2 justify-between pb-4 items-center w-full sm:w-[80%] md:w-[50%] xl:w-[30%]">
                    <div className="flex items-center">
                        {showTime && <IoIosArrowBack size={30} onClick={() =>history.push("/gameHome")}/>}  
                        {!showTime &&  <div>second {time}</div>}
                        <p>Watch ads</p>
                    </div>
                    <IoIosSettings onClick={() => history.push("/settings")} size={20}/>
                </div>

                
    
                <video 
                    className="flex bg-red-300 w-full sm:w-[80%] md:w-[50%] xl:w-[30%]"
                    src={postDataAds?.post?.video}  type="video/mp4" controls autoPlay>
                </video>
            
                <div className="w-full sm:w-[80%] md:w-[50%] xl:w-[30%] my-4">
                    <div className="flex  my-1 py-1">
                        <p className="w-[100px]">address: </p>
                        <p>{postDataAds?.post?.address} </p>
                    </div>
                    <div className="flex  my-1 py-1">
                        <p className="w-[100px]">Email:</p>
                        <p> {postDataAds?.post?.email} </p>
                    </div>
                
                    <div className="flex  my-1 py-1">
                    <p className="w-[100px]">Title</p>
                    <p> {postDataAds?.post?.title} </p>
                    </div>
                    <div className="flex  my-1 py-1">
                        <p className="w-[100px]">Text</p>
                        <p>{postDataAds?.post?.text} </p>
                    </div>
                
                </div>
                {postDataAds?.post?.facebookLink != "" && 
                    <div className="flex w-full sm:w-[80%] md:w-[50%] xl:w-[30%] text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                        <a href={postDataAds?.post?.facebookLink} target="_blank" rel="video" className=" w-full p-2 text-center">
                            Facebook visit 
                        </a>
                    </div>
                }
                {postDataAds?.post?.instagramLink != "" &&
                    <div className="flex w-full sm:w-[80%] md:w-[50%] xl:w-[30%] text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                        <a href={postDataAds?.post?.instagramLink} target="_blank" rel="video" className=" w-full p-2 text-center">
                            Instagram visit 
                        </a>
                    </div>
                }
                {postDataAds?.post?.link != "" && 
                    <div className="flex w-full sm:w-[80%] md:w-[50%] xl:w-[30%] text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                        <a href={postDataAds?.post?.link} target="_blank" rel="video" className=" w-full p-2 text-center">
                            Visit 
                        </a>
                    </div>
                }
                
            </div>
        </div>
    ) 
}

