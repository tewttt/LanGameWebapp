import React, {useState , useEffect} from "react";
import useLesson from "../../../hook/useLesson";
import { useHistory ,useParams} from "react-router-dom";


const TranslateView = () => {
    const {languageId, topicId, lessonId} = useParams()
    const {translate , translatefun} = useLesson(languageId, topicId, lessonId)
  
    useEffect(() => {
      translatefun()
    } ,[])
   
    const [customerAnswer, setCustomerAnswer] = useState(); 
    // console.log(props.translate)
    return (
        <div>translate virew
            {translate?.translate?.map(el => (
                <div className="border border-gray-500 p-1">
                    <input type="text" placeholder={el.questionAnswer} />
                    <input type="text" placeholder="харуилтаа бичих" value={customerAnswer} onChange={e=> setCustomerAnswer(e.target.value)} required/> 

                    {customerAnswer === el.questionText ? (
                        <div>Хариулт зав</div>
                    ):<div>буруу хариулт</div>}
                    <div>{el.questionText}</div>
                </div>
            ))}
        </div>
    )
}

export default TranslateView;