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
    <div className="text-white bg-baseBlack px-6 pt-6 pb-24 h-screen"> 
      <div className="flex py-2 justify-between pb-4">
          <IoIosArrowBack size={20} onClick={() => history.push(`/lesson/${languageId}/${topicId}/${lessonId}`)}/>
          <p></p>
          <IoIosSettings size={20}/>
      </div>
      <p className="text-2xl font-bold my-1">Word</p>
    
      {questions.current.length === 0 ? 
        (
          <div className="flex flex-col my-4 md:w-[50%] m-auto">
            <button onClick={ addQuestionnumber} className="bg-baseBlue1 my-2 w-full rounded-3xl p-2">Word start</button>
            <button onClick={ exam} className="bg-baseBlue1 my-2 w-full rounded-3xl p-2">
              Word exam start
            </button>
          </div>
        ) : 
        (
          <div className="m-auto flex flex-col md:w-[50%] justify-center">
            <img src={question?.image} className="border w-full border-helpGray rounded-2xl"/>
            <div className="flex justify-start my-3 items-center">
              <HiMiniSpeakerWave onClick={playAudio} size={36} className="mr-3 p-1 bg-baseBlue1 rounded-[50%]  text-white"/>
              <p className="text-3xl mx-3">{question?.word}</p>
              <p className="text-3xl mx-3">{question?.trans}</p>
            </div>
            <p className="w-full border border-helpGray p-2 text-center rounded-3xl my-2">{question?.desc}</p>
           
            {/* <audio controls className="my-2 m-auto">
              <source src={question?.sound} type="audio/mp3"/>play
            </audio> */}
            

            {questionNumber === 0 ? (
              <div className="flex flex-col my-4 w-full">
                <button onClick={ addQuestionnumber} className="bg-baseBlue1 my-2 w-full rounded-3xl p-2">Word start</button>
                <button onClick={ exam} className="bg-baseBlue1 my-2 w-full rounded-3xl p-2">
                  Word exam start
                </button>
              </div>
            ) : (
              <button onClick={() => addQuestionnumber()} className="w-full bg-baseBlue1 w-full rounded-3xl p-2">Next</button>
            )}

          </div>
        )
      }
    </div>
  )
}
export default WordView


  