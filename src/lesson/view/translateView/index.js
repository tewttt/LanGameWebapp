import React, {useState} from "react";
import css from "./style.module.css";

const TranslateView = (props) => {
    const [customerAnswer, setCustomerAnswer] = useState(); 
    // console.log(props.translate)
    return (
        <div>translate virew
            {/* {props.translate.map(el => (
                <div>
                    
                    <input type="text" placeholder={el.questionAnswer} />
                    <input type="text" placeholder="харуилтаа бичих" value={customerAnswer} onChange={e=> setCustomerAnswer(e.target.value)} required/> 

                    {customerAnswer === el.questionText ? (
                        <div>Хариулт зав</div>
                    ):<div>буруу хариулт</div>}

               
                <div>{el.questionText}</div>
                </div>
            ))} */}
        </div>
        //  {props.lessons.map(el => (
        //     <Lesson key={el[0]} lesson={el}/>
        // ))}
    )
}

export default TranslateView;