import React,{useState} from "react";
import {  useHistory ,useParams} from "react-router-dom";
import ToolSidebar from "../../../components/ToolSidebar";
import useLesson from "../../../hook/useLesson";
import useAds from "../../../hook/useAds";
import { useEffect } from "react";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";

const LessonView = () => {
  const {languageId, topicId, lessonId} = useParams()
  const {oneLesson , getOneLesson, countCustomer, countGrammar, countWord, countVerb, countTranslate, countListen, countExam } = useLesson(languageId, topicId, lessonId)
  const history = useHistory();
  const { filterAds} = useAds()
// const [adsId, setAdsId] = useState()

  useEffect(() => {
    getOneLesson()  
  }, [])

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
      </div>
    </div>
  );
};

export default LessonView;
