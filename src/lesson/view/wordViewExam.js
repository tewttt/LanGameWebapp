import React, { useEffect ,useState, useRef }  from "react";
import useLesson from "../../hook/useLesson";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import { useHistory ,useParams} from "react-router-dom";
import Modal from "../../components/General/Modal";

let intervalIds = [];
const WordViewExam = () => {
  const history = useHistory();
  const {languageId, topicId, lessonId} = useParams()
  const {word , wordfun} = useLesson(languageId, topicId, lessonId)
  const [playerAnswer , setPlayerAnswer] =useState("")
  const [endWord, setEndWord] = useState(false)
  const [point , setPoint] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(0);
  const questions = useRef([])
  const question = questions?.current[questionNumber] || {}
  console.log(question)
// console.log(questions)
  useEffect(() => {
    wordfun()
  } ,[])

  // асуултууд
  useEffect(() => {
    if (word?.word && questions.current.length === 0  ) {
      // const shuffledQ =  shuffleArray(word?.word);
      questions.current = word?.word
      }
  },[word?.word])

  // Асуултуудыг нийлүүлээд байрыг нь солих
  function shuffleArray(questionsToShuffle) {
    for (let i = questionsToShuffle.length - 1; i > 0; i--) {
      let randomPosition = Math.floor(Math.random() * (i + 1));
      let temp = questionsToShuffle[i];
      questionsToShuffle[i] = questionsToShuffle[randomPosition];
      questionsToShuffle[randomPosition] = temp;
    }
    return questionsToShuffle;
  }

  const saveAnswer = (answer) => {
    setPlayerAnswer(answer)
    if(answer === question.answerKey){
      return setPoint(prev => prev + 1 )
    } 
  };

  const addQuestionnumber = () => {
    setQuestionNumber((prev) => {
      let next= prev + 1
      if(questions.current.length-1 < next){
        clearIntervals()
        setEndWord(true)
      }
      setPlayerAnswer("")
      return next;
    });
  };

  const clearIntervals = () => {
    intervalIds.map(i=>clearInterval(i))
    intervalIds = [];
  }
  const start = () => {
    setQuestionNumber(0)
    setEndWord(false)
    setPoint(0)
  }

  return (
    <div className="text-white bg-baseBlack p-6 h-screen"> 
      <div className="flex py-2 justify-between pb-4">
          <IoIosArrowBack size={20} onClick={() => history.push( history.push(`/lesson/${languageId}/${topicId}/${lessonId}`))}/>
          <p></p>
          <IoIosSettings size={20}/>
      </div>
      <p className="text-2xl font-bold my-1">Word</p>
     

      {/* exam  */}
      <div className="py-10 sm:w-[50%] m-auto">
        <p className="pb-10 font-bold justify-center flex flex-wrap w-full">{question.questionText}</p>
        {question?.options?.map((option , i) => {
         const isSelected = playerAnswer === option.optionText
         const isRight = playerAnswer === question?.answerKey

         const test =
           playerAnswer ?
             isSelected ? isRight? 'bg-helpGreen' : 'bg-red-500'
                        : option.optionText == question?.answerKey  ? 'bg-helpGreen' : ''  
         : ''
          return (
            <button
              key={i}
              onClick={() => saveAnswer(option.optionText)}   
              disabled={playerAnswer}                 
              className={
                `${test} 
              flex justify-center w-full my-5 border border-helpGray p-2 rounded-3xl hover:bg-blue-400 transition-all` }
            
            >
               {option.optionText}
            </button>
          )
        })}
        {questions.current.length === 0 ? (
          <button onClick={() => addQuestionnumber()} className="bg-baseBlue1 w-full rounded-3xl p-2">Start</button>
          ) :  (
            <button onClick={() => addQuestionnumber()} className="bg-baseBlue1 w-full rounded-3xl p-2">Next</button>
          )  
        }  
      </div>

      <Modal show={endWord}>
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
export default WordViewExam
