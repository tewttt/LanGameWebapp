import React,{useContext, useState} from "react";
import {  useHistory ,useParams} from "react-router-dom";
import ToolSidebar from "../../../components/ToolSidebar";
import useLesson from "../../../hook/useLesson";
import useAds from "../../../hook/useAds";
import { useEffect } from "react";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import CommentView from "../../view/comment";
import UserContext
 from "../../../context/UserContext";
import ModalAds from "../../component/modalAds";
import usePost from "../../../hook/usePost";
import { MdCancel } from "react-icons/md";

const TIME = 15
let intervalIds = [];

const LessonView = () => {
  const ctx = useContext(UserContext)
  const {languageId, topicId, lessonId, adsId} = useParams()
  const {commentList, postSend, oneLesson , getOneLesson, countCustomer, countGrammar, countWord, countVerb, countTranslate, countListen, countExam } = useLesson(languageId, topicId, lessonId)
  const history = useHistory();
  const { filterAds} = useAds()
  const [comment, setComment] = useState()
  const [showAds, setShowAds] = useState(true)
// const [adsId, setAdsId] = useState()
const [time, setTime] = useState(TIME) 
const [showTime , setShowTime] = useState(false)
const {getAds, ads, putTransaction, clickFace, clickInstagram, clickSocial} = useAds(adsId)
const { getPostAds , postDataAds} = usePost()

  useEffect(() => {
    getOneLesson()  
  }, [])

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

 const changeWord = (adsId) => {
    history.push(`/word/${languageId}/${topicId}/${lessonId}/${adsId}`)
    countWord()
 }

 const changeExam = (adsId) => {
  history.push(`/exam/${languageId}/${topicId}/${lessonId}/${adsId}`)
  countExam()
 }
 const changeTranslate = (adsId) => {
    history.push(`/translate/${languageId}/${topicId}/${lessonId}/${adsId}`)
    countTranslate()
 }
 const changeGrammar = (adsId) => {
  
  history.push(`/grammar/${languageId}/${topicId}/${lessonId}/${adsId}`)
  countGrammar()
}
const changeListen = (adsId) => {
  history.push(`/listen/${languageId}/${topicId}/${lessonId}/${adsId}`)
  countListen()
}
const changeVerb = (adsId) => {
  history.push(`/verb/${languageId}/${topicId}/${lessonId}/${adsId}`)
  countVerb()
}


useEffect(() => {
  const video = document.getElementById('videoPlayer');
  video.addEventListener('play', function() {
    countCustomer() 
  });
  // video.addEventListener('timeupdate', function() {
  //   if (5 > video.currentTime) {
  //     countCustomer(video.currentTime) 
  //     // trackVideoView(video.currentTime);
  //   }
  // });
}, []);

const post =()=>{
  const Id = ctx?.currentUser?.userID
  const profile = ctx?.currentUser?.photo
  const name = ctx?.currentUser?.name
  
  postSend(comment, Id, profile, name)
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
    <div className=" relative bg-baseBlack text-white text-3xl pt-6 pb-48 px-6 md:pt-0">
      <ToolSidebar />
      <div className="md:pt-20 md:w-full m-auto">
        <div className="flex py-2 justify-between pb-4">
          <IoIosArrowBack size={20} onClick={() => history.push("/")}/>
          <p></p>
          <IoIosSettings size={20}/>
        </div>
        <p className="text-2xl font-bold my-1"> {oneLesson?.language} {oneLesson?.level} №{oneLesson?.lessonNumber}</p>
        <div className="md:flex w-full">
          <div className="">
            <video  
              id="videoPlayer"
              className="w-full my-2 border-2 border-white rounded-2xl"
              // poster = {oneLesson?.image}
              src={oneLesson?.video}  
              type="video/mp4" 
              controls>
            </video> 
            
            <div className="flex items-center text-[20px]">
              <IoEyeSharp/>
              <p className="mx-2">{oneLesson?.viewCustomer}</p>
            </div>
          </div>
          <div className="font-bold text-baseBlack px-2 w-full">
            <div>
              {/* grammar */}
              {filterAds?.map((ads, index) => {
                return (
                  <div key={index} className="flex flex-row">
                    {index === 0 && 
                      <button onClick={() => changeGrammar(ads.id)} 
                          className="w-full relative justify-center flex flex-row items-center bg-white rounded-2xl p-2 my-1 hover:bg-baseBlue1 hover:text-white"
                            >
                          <p>Grammar</p>
                          <div className="absolute right-2 flex items-center text-gray-300 text-base">
                            <IoEyeSharp/>
                            <p >{oneLesson?.clickGrammar}</p>
                          </div>
                      </button>
                    }
                  </div>
                )
              })}
              {filterAds?.length === 0 && 
                <button onClick={() => changeGrammar(0)} 
                    className="w-full relative justify-center flex flex-row items-center bg-white rounded-2xl p-2 my-1 hover:bg-baseBlue1 hover:text-white"
                      >
                    <p>Grammar</p>
                    <div className="absolute right-2 flex items-center text-gray-300 text-base">
                      <IoEyeSharp/>
                      <p >{oneLesson?.clickGrammar}</p>
                    </div>
                </button>
              }
            </div>
            <div className="">
              {/* vocabulary */}
              {filterAds?.map((ads, index) => {
                return (
                  <div key={index} className="flex flex-row">
                    {index === 0 && 
                      <button onClick={()=> changeWord(ads.id)} 
                          className="w-full relative justify-center flex flex-row items-center  bg-white  rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"  
                          >
                          <p>Vocabulary</p>
                          <div className="absolute right-2 flex items-center text-gray-300 text-base">
                            <IoEyeSharp/>
                            <p >{oneLesson?.clickWord}</p>
                          </div>
                      </button>
                    }
                  </div>
                )
              })}
               {filterAds?.length === 0 && 
                <button onClick={() => changeWord(0)} 
                    className="w-full relative justify-center flex flex-row items-center bg-white rounded-2xl p-2 my-1 hover:bg-baseBlue1 hover:text-white"
                      >
                    <p>Vocabulary</p>
                    <div className="absolute right-2 flex items-center text-gray-300 text-base">
                      <IoEyeSharp/>
                      <p >{oneLesson?.clickWord}</p>
                    </div>
                </button>
              }

             {/* verb */}
             {filterAds?.map((ads, index) => {
                return (
                  <div key={index} className="flex flex-row">
                    {index === 0 && 
                      <button onClick={()=> changeVerb(ads.id)} 
                          className="w-full relative justify-center flex flex-row items-center  bg-white  rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"  
                          >
                          <p>Additional</p>
                          <div className="absolute right-2 flex items-center text-gray-300 text-base">
                            <IoEyeSharp/>
                            <p >{oneLesson?.clickVerb}</p>
                          </div>
                      </button>
                    }
                  </div>
                )
              })}
               {filterAds?.length === 0 && 
                <button onClick={() => changeVerb(0)} 
                    className="w-full relative justify-center flex flex-row items-center bg-white rounded-2xl p-2 my-1 hover:bg-baseBlue1 hover:text-white"
                      >
                    <p>Additional</p>
                    <div className="absolute right-2 flex items-center text-gray-300 text-base">
                      <IoEyeSharp/>
                      <p >{oneLesson?.clickVerb}</p>
                    </div>
                </button>
              }
              {/* translate */}
              {filterAds?.map((ads, index) => {
                return (
                  <div key={index} className="flex flex-row">
                    {index === 0 && 
                      <button onClick={()=> changeTranslate(ads.id)} 
                          className="w-full relative justify-center flex flex-row items-center  bg-white  rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"  
                          >
                          <p>Translate</p>
                          <div className="absolute right-2 flex items-center text-gray-300 text-base">
                            <IoEyeSharp/>
                            <p >{oneLesson?.clickTranslate}</p>
                          </div>
                      </button>
                    }
                  </div>
                )
              })}
               {filterAds?.length === 0 && 
                <button onClick={() => changeTranslate(0)} 
                    className="w-full relative justify-center flex flex-row items-center bg-white rounded-2xl p-2 my-1 hover:bg-baseBlue1 hover:text-white"
                      >
                    <p>Translate</p>
                    <div className="absolute right-2 flex items-center text-gray-300 text-base">
                      <IoEyeSharp/>
                      <p >{oneLesson?.clickTranslate}</p>
                    </div>
                </button>
              }
            </div>

            <div className="">
              {/* listen */}
            {filterAds?.map((ads, index) => {
                return (
                  <div key={index} className="flex flex-row">
                    {index === 0 && 
                      <button onClick={()=> changeListen(ads.id)} 
                          className="w-full relative justify-center flex flex-row items-center  bg-white  rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"  
                          >
                          <p>Listen</p>
                          <div className="absolute right-2 flex items-center text-gray-300 text-base">
                            <IoEyeSharp/>
                            <p >{oneLesson?.clickListen}</p>
                          </div>
                      </button>
                    }
                  </div>
                )
              })}
               {filterAds?.length === 0 && 
                <button onClick={() => changeListen(0)} 
                    className="w-full relative justify-center flex flex-row items-center bg-white rounded-2xl p-2 my-1 hover:bg-baseBlue1 hover:text-white"
                      >
                    <p>Listen</p>
                    <div className="absolute right-2 flex items-center text-gray-300 text-base">
                      <IoEyeSharp/>
                      <p >{oneLesson?.clickListen}</p>
                    </div>
                </button>
              } 
              {/* exam */}
              {filterAds?.map((ads, index) => {
                return (
                  <div key={index} className="flex flex-row">
                    {index === 0 && 
                      <button onClick={()=> changeExam(ads.id)} 
                          className="w-full relative justify-center flex flex-row items-center  bg-white  rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"  
                          >
                          <p>Exam</p>
                          <div className="absolute right-2 flex items-center text-gray-300 text-base">
                            <IoEyeSharp/>
                            <p >{oneLesson?.clickExam}</p>
                          </div>
                      </button>
                    }
                  </div>
                )
              })}
               {filterAds?.length === 0 && 
                <button onClick={() => changeExam(0)} 
                    className="w-full relative justify-center flex flex-row items-center bg-white rounded-2xl p-2 my-1 hover:bg-baseBlue1 hover:text-white"
                      >
                    <p>Exam</p>
                    <div className="absolute right-2 flex items-center text-gray-300 text-base">
                      <IoEyeSharp/>
                      <p >{oneLesson?.clickExam}</p>
                    </div>
                </button>
              }
                
                
            </div>
          </div>
        </div>
        {/* comment */}
        <div className="mt-6 w-full md:w-[80%] lg:w-[60%] flex flex-col m-auto mb-6">
          <p className="text-gray-400 text-center my-2">Comment</p>
          <textarea  d
              className="w-full h-[100px] text-base text-black my-1 p-2 rounded-[5px] mx-0 " 
              onChange={(e) => setComment(e.target.value)}
              required 
              type="text" 
              name="comment" 
              placeholder="write here"
              multline
              numberOfLines={10}
          />
          <button 
            onClick={post}
            className="bg-baseBlue hover:bg-blue-600 px-6 py-2 rounded-lg w-[200px] m-auto mt-4">
              Post
          </button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {commentList.map((e, i) => (
              <CommentView data={e} key={i} />
          ))}
        </div>
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
  );
};

export default LessonView;
