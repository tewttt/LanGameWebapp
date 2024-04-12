import React, { useEffect ,useState, useRef }  from "react";
import useLesson from "../../hook/useLesson";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import { useHistory ,useParams} from "react-router-dom";
import { HiMiniSpeakerWave } from "react-icons/hi2";

let intervalIds = [];
const WordView = () => {
  const history = useHistory();
  const {languageId, topicId, lessonId} = useParams()
  const {word , wordfun} = useLesson(languageId, topicId, lessonId)
  const [questionNumber, setQuestionNumber] = useState(0);
  const questions = useRef([])
  const question = questions?.current[questionNumber] || {}


  useEffect(() => {
    wordfun()
    setQuestionNumber(0)
  } ,[])

  // асуултууд
  useEffect(() => {
    if (word?.word && questions.current.length === 0  ) {
      questions.current = word?.word
      }
  },[word?.word])

  const addQuestionnumber = () => {
    setQuestionNumber((prev) => {
      let next= prev + 1
      if(questions.current.length-1 < next){
        clearIntervals()
        next = 0
      }
      return next;
    });
    
  };

  const clearIntervals = () => {
    intervalIds.map(i=>clearInterval(i))
    intervalIds = [];
  }
 
  const exam = () => {
    history.push(`/wordExam/${languageId}/${topicId}/${lessonId}`)
  }

  const playAudio = () => {
    const audio = new Audio(question?.sound); // Create a new Audio object with the sound file
    audio.play(); // Play the audio
  };  

  return (
    <div className="text-white text-2xl sm:text-3xl bg-baseBlack px-6 pt-6 pb-24 h-screen"> 
      <div className="flex py-2 justify-between pb-4">
          <IoIosArrowBack size={20} onClick={() => history.push(`/lesson/${languageId}/${topicId}/${lessonId}`)}/>
          <p></p>
          <IoIosSettings size={20}/>
      </div>
      <p className=" font-bold my-1">Word</p>
    
      {questions.current.length === 0 ? 
        (
          <div className="flex flex-col my-4 w-full sm:w-[90%] md:w-[70%] m-auto">
            <button onClick={ addQuestionnumber} className="bg-baseBlue1 my-2 w-full rounded-3xl p-2">Word start</button>
            <button onClick={ exam} className="bg-baseBlue1 my-2 w-full rounded-3xl p-2">
              Word exam start
            </button>
          </div>
        ) : 
        (
          <div className="m-auto flex flex-col w-full sm:w-[90%] md:w-[70%] justify-center items-center">
            <img src={question?.image} className="border w-[50%] lg:w-[40%] aspect-square border-helpGray rounded-2xl"/>
            <div className="flex flex-col sm:flex-row justify-start my-3 items-center">
              <HiMiniSpeakerWave onClick={playAudio} size={70} className="my-3 sm:my-0 mr-3 p-1 bg-baseBlue1 rounded-[50%]  text-white"/>
              <p className="text-3xl mx-3 uppercase text-helpGreen font-bold">{question?.word}</p>
              <p className="text-3xl mx-3 uppercase font-bold">{question?.trans}</p>
            </div>
            {question?.desc != "" && 
             <p className="w-full border border-helpGray p-2 text-center rounded-3xl my-2">{question?.desc}</p>
            }
           

            {questionNumber === 0 ? (
              <div className="flex flex-col my-4 w-full">
                <button onClick={ addQuestionnumber} className="bg-baseBlue1 my-2 w-full rounded-3xl p-2">Word start</button>
                <button onClick={ exam} className="bg-baseBlue1 my-2 w-full rounded-3xl p-2">
                  Word exam start
                </button>
              </div>
            ) : (
              <button onClick={() => addQuestionnumber()} className="w-full bg-baseBlue1 rounded-3xl p-2">Next</button>
            )}

          </div>
        )
      }
    </div>
  )
}
export default WordView


  