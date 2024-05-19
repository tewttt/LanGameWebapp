import React ,{useEffect, useState} from "react";
import useLesson from "../../hook/useLesson";
import { useHistory ,useParams} from "react-router-dom";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import ModalAds from "../component/modalAds" 
import useAds from "../../hook/useAds";
import usePost from "../../hook/usePost";
import { MdCancel } from "react-icons/md";

const TIME = 15
let intervalIds = [];
const VerbView = () => {
  const history = useHistory();
  const {languageId, topicId, lessonId, adsId} = useParams()
  const {verb, verbfun} = useLesson(languageId, topicId, lessonId)
  const [enlargedIndex, setEnlargedIndex] = useState(null);
  const [showAds, setShowAds] = useState(true)
  const [time, setTime] = useState(TIME) 
  const [showTime , setShowTime] = useState(false)
  const {getAds, ads  , putTransaction , addCoinShow, clickFace, clickInstagram, clickSocial} = useAds(adsId)
  const { getPostAds , postDataAds} = usePost()
  
  const toggleEnlarge = (index) => {
    setEnlargedIndex(index === enlargedIndex ? null : index);
  };

  useEffect(() => {
    verbfun()
  } ,[])

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
  const startTimer = () => {
    setTime(prev =>{
        let next = prev - 1; 
        if(next <= 0) {
          next = 0
          // console.log("bnu" + next)
          setShowTime(true)
        }
        return next;
      }) 
  }
 
  useEffect (() => {
    if(adsId == 0){
      setShowAds(false)
    } else {
        getAds(adsId) 
    }
  },[adsId])

useEffect (() => {
    if(ads?.postId){
        getPostAds(ads?.postId) 
    }
},[ads?.postId])
  const data = {
    coin: 0,
    label: "watch video",
    labelType: "ads",
    type: "deposit",
    adsId: adsId,
  }
  
  useEffect(() => {
    if (showTime)
    putTransaction(data, adsId)
  },[showTime])  

  return (
    <div  className="text-white bg-baseBlack px-6 pt-6 pb-24 h-screen">
       <div className="flex py-2 justify-between pb-4">
          <IoIosArrowBack size={20} onClick={() => history.push(`/lesson/${languageId}/${topicId}/${lessonId}`)}/>
          <p></p>
          <IoIosSettings size={20}/>
      </div>
      <p className="text-2xl font-bold my-1">Verb</p>
     
      <div className="flex flex-wrap gap-2 place-content-center">
      {verb?.verb?.map((e, i) => {
        return (
          <div
            key={i}
            className={`w-[40%] md:w-[30%] aspect-[3/4] m-2`}
            onClick={() => toggleEnlarge(i)}>
            <img
              src={e?.image}
              className={`w-full h-full ${
                enlargedIndex === i ? 'w-screen h-screen p-3 absolute top-0 left-0  md:w-[50%] md:left-[25%] md:bg-gray-400' : ''
              }`}
              alt="Description of the image"
            />
          </div>
        );
      })}
    </div>
    {showAds === true && 
        <ModalAds show={showAds}>
           
          <div className="relative">
              
              {!showTime &&  <div className="text-black">second {time}</div>}<p className="absolute top-0 left-0 z-10">
              {showTime && <MdCancel size={30} onClick={() => setShowAds(false)} className="absolute top-0 left-10 z-10"/> }</p>
              
              <div className="w-full flex flex-col md:flex-row">
                  <video 
                      className="w-[80%] sm:w-[50%] m-auto"
                      src={postDataAds?.post?.video}  type="video/mp4" controls autoPlay>
                  </video>
                  <div className="w-full md:w-[50%] my-1 md:mx-4">
                        {postDataAds?.post?.facebookLink != "" && 
                        <div 
                            onClick={() => clickFace()}
                            className="flex w-full  text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl px-4 my-1 border border-baseColor">
                            <a  href={postDataAds?.post?.facebookLink} target="_blank" rel="video" className=" w-full p-1 text-center">
                                Facebook visit 
                            </a>
                        </div>
                        }
                        {postDataAds?.post?.instagramLink != "" &&
                            <div 
                                onClick={() => clickInstagram()}
                                className="flex w-full  text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl  px-4 my-1 border border-baseColor">
                                <a href={postDataAds?.post?.instagramLink} target="_blank" rel="video" className=" w-full p-1 text-center">
                                    Instagram visit 
                                </a>
                            </div>
                        }
                        {postDataAds?.post?.link != "" && 
                            <div 
                                onClick={() => clickSocial()}
                                className="flex w-full  text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl px-4 my-1 border border-baseColor">
                                <a href={postDataAds?.post?.link} target="_blank" rel="video" className=" w-full p-1 text-center">
                                    Visit 
                                </a>
                            </div>
                        }
                        {postDataAds?.post?.address != "" && 
                            <div className="flex flex-col flex-wrap  my-1 py-1">
                                {/* <p className="text-gray-400">Address </p> */}
                                <p className="text-sm md:xl ">{postDataAds?.post?.address} </p>
                            </div>
                        }
                        {postDataAds?.post?.phone != "" && 
                            <div className="flex flex-col flex-wrap  my-1 py-1">
                                {/* <p className="text-gray-400">Phone </p> */}
                                <p className="text-sm md:xl ">phone: {postDataAds?.post?.phone} </p>
                            </div>
                        }
                        {postDataAds?.post?.email != "" &&
                            <div className="flex flex-col flex-wrap  my-1 py-1">
                                {/* <p className="text-gray-400">Email</p> */}
                                <p className="text-sm md:xl">email: {postDataAds?.post?.email} </p>
                            </div>
                        }
                        {postDataAds?.post?.title != "" &&
                            <div className="flex flex-col flex-wrap my-1 py-1">
                                {/* <p className="text-gray-400">Title</p> */}
                                <p className="text-sm md:xl"> {postDataAds?.post?.title} </p>
                            </div>
                        }
                        {postDataAds?.post?.text != "" &&
                            <div className="flex flex-col flex-wrap my-1 py-1">
                                {/* <p className="text-gray-400">Text</p> */}
                                <p className="text-sm md:xl">{postDataAds?.post?.text} </p>
                            </div>
                        }
                       
                        
                  </div>
              </div>
          </div>
         
        </ModalAds>
    } 
  
    </div>
  )
}

export default VerbView
