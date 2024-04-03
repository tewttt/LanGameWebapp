import React, {useState , useEffect , useRef} from "react";
import useLesson from "../../../hook/useLesson";
import { useHistory ,useParams} from "react-router-dom";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
import Modal from "../../../components/General/Modal";

let intervalIds = [];
const TranslateView = () => {
    const history = useHistory();
    const {languageId, topicId, lessonId} = useParams()
    const {translate , translatefun} = useLesson(languageId, topicId, lessonId)
    const [playerAnswer , setPlayerAnswer] =useState("")
    const [endTranslate, setEndTranslate] = useState(false)
    const [point , setPoint] = useState(0)
    const [questionNumber, setQuestionNumber] = useState(0);
    const questions = useRef([])
    const question = questions?.current[questionNumber] || {}
    const [userAnswer, setUserAnswer] = useState("")

    useEffect(() => {
      translatefun()
    } ,[])

    useEffect(() => {
        if (translate?.translate && questions.current.length === 0  ) {
          questions.current = translate?.translate
          setQuestionNumber(1)
          }
          
      },[translate?.translate])
   
     
    const saveAnswer = () => {
        setPlayerAnswer(userAnswer)
        if(userAnswer === question.questionAnswer){
          return setPoint(prev => prev + 1 )
        } 
      };
   
      const addQuestionnumber = () => {
        setQuestionNumber((prev) => {
          let next= prev + 1
          if(questions.current.length-1 < next){
            clearIntervals()
            setEndTranslate(true)
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
        setQuestionNumber(1)
        setEndTranslate(false)
        setPoint(0)
      }
      

    return (
        <div className="text-white text-2xl sm:text-3xl bg-baseBlack p-6 h-screen ">
            <div className="flex py-2 justify-between pb-4">
                <IoIosArrowBack size={20} onClick={() => history.push( history.push(`/lesson/${languageId}/${topicId}/${lessonId}`))}/>
                <p></p>
                <IoIosSettings size={20}/>
            </div>
            <p className="font-bold my-1">Translate</p>

            <div className="py-10 w-full sm:w-[90%] md:w-[70%] m-auto flex flex-col">
                <p className="pb-10 font-bold justify-center flex flex-wrap w-full">{question?.questionText}</p>
               
                <input type="text" className="text-baseBlack p-2 text-center rounded-3xl my-3" onChange={(e) => setUserAnswer(e.target.value)} placeholder="write here"/>
                <button className="rounded-3xl p-2 text-center text-baseBlack bg-helpGreen my-3 hover:bg-helpGreen/50" onClick={saveAnswer}>Check answer</button>
                {playerAnswer ?  
                    (playerAnswer === question?.questionAnswer ? 
                        <div className="bg-green-600 p-2 flex justify-center items-center flex-col my-2">
                            <p>Right</p>
                            <p>{question?.questionAnswer}</p>
                        </div> 
                        : <div className="bg-red-500 p-2 flex justify-center items-center flex-col my-2">
                            <p>wrong</p>
                            <p>{question?.questionAnswer}</p>
                                </div>)
                    : (<div>Please write your answer</div>)
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

export default TranslateView;