import React, {useState , useContext} from "react";
import css from "./style.module.css";
import LessonContext from "../../../context/LessonContext";

const TranslateView = () => {
    const ctx = useContext(LessonContext)
    // console.log(ctx.translate)
    const [customerAnswer, setCustomerAnswer] = useState(); 
    // console.log(props.translate)
    return (
        <div>translate virew
            {ctx?.translate?.translate?.map(el => (
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