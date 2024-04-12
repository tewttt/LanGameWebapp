import React from "react";
import {  useHistory ,useParams} from "react-router-dom";
import ToolSidebar from "../../../components/ToolSidebar";
import useLesson from "../../../hook/useLesson";
import { useEffect } from "react";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";

const LessonView = () => {
  const {languageId, topicId, lessonId} = useParams()
  const {oneLesson , getOneLesson, countCustomer } = useLesson(languageId, topicId, lessonId)
  const history = useHistory();

  useEffect(() => {
    getOneLesson()
  }, [])

 const changeWord = () => {
    history.push(`/word/${languageId}/${topicId}/${lessonId}`)
 }

 const changeExam = () => {
  history.push(`/exam/${languageId}/${topicId}/${lessonId}`)
  
 }
 const changeTranslate = () => {
    history.push(`/translate/${languageId}/${topicId}/${lessonId}`)
 }
 const changeGrammar = () => {
  history.push(`/grammar/${languageId}/${topicId}/${lessonId}`)
}
const changeListen = () => {
  history.push(`/listen/${languageId}/${topicId}/${lessonId}`)
}
const changeVerb = () => {
  history.push(`/verb/${languageId}/${topicId}/${lessonId}`)
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
            <div className="">
                <button onClick={changeGrammar} 
                    className="w-full h-full bg-white font-bold text-baseBlack rounded-2xl p-2 my-2 hover:bg-baseBlue1 hover:text-white"
                      >
                    Grammar
                </button>
            </div>
            <div className="">
              <button onClick={changeWord} 
                  className="w-full  bg-white  rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"  
                  >
                  Word
              </button>
              <button onClick={changeVerb} 
                  className="w-full  bg-white  rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"  
                  >
                  Verb
              </button>
              <button onClick={changeTranslate} 
                  className="w-full  bg-white rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"
                    >
                  Translate
              </button>
            </div>
            <div className="">
                <button onClick={changeListen} 
                    className="w-full  bg-white rounded-2xl p-2  my-2  hover:bg-baseBlue1 hover:text-white"
                      >
                    Listen
                </button>
                <button onClick={changeExam} 
                    className="w-full   bg-white  rounded-2xl p-2 my-2 hover:bg-baseBlue1 hover:text-white"
                      >
                    Exam
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
