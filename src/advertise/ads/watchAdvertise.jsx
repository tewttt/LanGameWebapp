import { useHistory, useParams} from "react-router-dom";
import React, {  useEffect , useState} from "react"
import useAds from "../../hook/useAds";
import usePost from "../../hook/usePost";
import Modal from "../../components/General/Modal"
import pattern from "../../assets/logo/patternWhite.png"
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

const TIME = 20
let intervalIds = [];

export default function WatchAdvertise () {
    const {id} = useParams();
    const {getAds, ads  , putTransaction , addCoinShow, clickFace, clickInstagram, clickSocial} = useAds(id)
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
        <div className="px-6 pt-6 pb-52 bg-baseBlack text-white relative flex flex-col lg:w-[80%] m-auto">
            <div 
                className="bg-cover bg-center opacity-30 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>

             <Modal show={addCoinShow}>
                <div> add 100 coin </div>
            </Modal>
            <div className="z-20 flex flex-col ">
                <div div className="flex py-2 justify-between pb-4 items-center w-full">
                    <div className="flex items-center">
                        {showTime && <IoIosArrowBack size={30} onClick={() =>history.push("/gameHome")}/> }  
                        {!showTime &&  <div>second {time}</div>}
                        <p className="mx-2">Watch ads</p>
                    </div>
                    <IoIosSettings onClick={() => history.push("/settings")} size={20}/>
                </div>
                <div className="flex flex-col md:flex-row m-auto justify-center">
                    <div className="w-full sm:w-[60%] md:w-[50%] flex justify-center ">
                        <video 
                            className="flex w-full md:w-[80%]"
                            src={postDataAds?.post?.video}  type="video/mp4" controls autoPlay>
                        </video>
                    </div>
                    {/* <video className="w-full " src={post?.video} type="video/mp4" controls></video> */}
                
                    <div className="w-full md:w-[50%] my-4 md:mx-4">
                        {postDataAds?.post?.facebookLink != "" && 
                        <div 
                            onClick={() => clickFace()}
                            className="flex w-full  text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                            <a  href={postDataAds?.post?.facebookLink} target="_blank" rel="video" className=" w-full p-2 text-center">
                                Facebook visit 
                            </a>
                        </div>
                        }
                        {postDataAds?.post?.instagramLink != "" &&
                            <div 
                                onClick={() => clickInstagram()}
                                className="flex w-full  text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                                <a href={postDataAds?.post?.instagramLink} target="_blank" rel="video" className=" w-full p-2 text-center">
                                    Instagram visit 
                                </a>
                            </div>
                        }
                        {postDataAds?.post?.link != "" && 
                            <div 
                                onClick={() => clickSocial()}
                                className="flex w-full  text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                                <a href={postDataAds?.post?.link} target="_blank" rel="video" className=" w-full p-2 text-center">
                                    Visit 
                                </a>
                            </div>
                        }
                        {postDataAds?.post?.address != "" && 
                            <div className="flex flex-col flex-wrap  my-1 py-1">
                                <p className="text-gray-400">Address </p>
                                <p>{postDataAds?.post?.address} </p>
                            </div>
                        }
                        {postDataAds?.post?.phone != "" && 
                            <div className="flex flex-col flex-wrap  my-1 py-1">
                                <p className="text-gray-400">Phone </p>
                                <p>{postDataAds?.post?.phone} </p>
                            </div>
                        }
                        {postDataAds?.post?.email != "" &&
                            <div className="flex flex-col flex-wrap  my-1 py-1">
                                <p className="text-gray-400">Email</p>
                                <p> {postDataAds?.post?.email} </p>
                            </div>
                        }
                        {postDataAds?.post?.title != "" &&
                            <div className="flex flex-col flex-wrap my-1 py-1">
                                <p className="text-gray-400">Title</p>
                                <p> {postDataAds?.post?.title} </p>
                            </div>
                        }
                        {postDataAds?.post?.text != "" &&
                            <div className="flex flex-col flex-wrap my-1 py-1">
                                <p className="text-gray-400">Text</p>
                                <p>{postDataAds?.post?.text} </p>
                            </div>
                        }
                       
                        
                    </div>
                </div>
                
            </div>
        </div>
    ) 
}

