import React, { useEffect ,useState, useRef }  from "react";
import useLesson from "../../hook/useLesson";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import { useHistory ,useParams} from "react-router-dom";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import Modal from "../../components/General/Modal";

let intervalIds = [];
const ListenView = () => {
  const history = useHistory();
  const {languageId, topicId, lessonId} = useParams()
  const {listen , listenfun} = useLesson(languageId, topicId, lessonId)
  const [questionNumber, setQuestionNumber] = useState(0);
  const [endTranslate, setEndTranslate] = useState(false)

  const [playerAnswer , setPlayerAnswer] =useState("")
  const [userAnswer, setUserAnswer] = useState("")
  const [point , setPoint] = useState(0)
  const questions = useRef([])
  const question = questions?.current[questionNumber] || {}

  useEffect(() => {
    listenfun()
  } ,[])

  // асуултууд
  useEffect(() => {
    if (listen?.listen && questions.current.length === 0  ) {
      questions.current = listen?.listen
      setQuestionNumber(1)
      }
  },[listen?.listen])

  const addQuestionnumber = () => {
    setPlayerAnswer("")
    setUserAnswer("")
    setQuestionNumber((prev) => {
      let next= prev + 1
      if(questions.current.length-1 < next){
        clearIntervals()
        setEndTranslate(true)
        // history.push(`/lesson/${languageId}/${topicId}/${lessonId}`)
      }
      return next;
    });
    
  };

  const start = () => {
    setQuestionNumber(1)
    setEndTranslate(false)
    setPoint(0)
  }

  const saveAnswer = (answer) => {
    setPlayerAnswer(answer)
    if(answer === question.answerKey){
      return setPoint(prev => prev + 1 )
    } 
  };

  const clearIntervals = () => {
    intervalIds.map(i=>clearInterval(i))
    intervalIds = [];
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
      <p className=" font-bold my-1">Listen</p>

      <div className="py-10 w-full sm:w-[90%] md:w-[70%]  m-auto flex flex-col items-center"> 
        <HiMiniSpeakerWave onClick={playAudio} size={70} className="mr-3 p-1 bg-baseBlue1 rounded-[50%] mb-6 text-white"/>
        <p className="text-gray-400">Number: {questionNumber}</p>      
        <input type="text" className="text-baseBlack w-full p-2 text-center rounded-3xl my-3" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="write here"/>
        <button className="rounded-3xl p-2 w-full text-center font-bold bg-helpGreen my-3 hover:bg-helpGreen/50" onClick={saveAnswer}>Check answer</button>
        {playerAnswer ?  
            (playerAnswer === question?.word ? 
                <div className=" p-2 flex justify-center items-center flex-col my-2">
                    <p className="text-green-500 font-bold uppercase mt-3">Right</p>
                    <p>{question?.word}</p>
                </div> 
                : <div className=" p-2 flex justify-center items-center flex-col my-2">
                    <p className="text-red-500 font-bold uppercase mt-3">wrong</p>
                    <p>{question?.word}</p>
                        </div>)
            : (<div className="text-gray-400">Please write your answer</div>)
        }
          <button onClick={() => addQuestionnumber()} className="my-5 bg-baseBlue1 w-full rounded-3xl p-2">Next</button>
      </div>

      <Modal show={endTranslate}>
        <div className="p-4">
        <p className="text-3xl my-6">Total point: {questions.current.length}  /  {point} </p>
        <button onClick={() => start()} className="bg-baseBlue1 my-2 text-white w-full rounded-2xl p-2">Restart exam</button>
        <button 
            onClick={() =>  history.push( history.push(`/lesson/${languageId}/${topicId}/${lessonId}`))} 
            className="bg-helpGreen my-2 text-white w-full rounded-2xl p-2">Done</button>
        </div>
    </Modal>
    </div>
  )
}
export default ListenView


  