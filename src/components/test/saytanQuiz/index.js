import React, {useState} from "react";
import css from "./style.module.css";
import Trivia from "./component/trivia";


// https://www.youtube.com/watch?v=EPh_VbMxu4E
// dutuu
const Saytan = () => {
    const [questionNumber, setQuestionNumber] = useState(1);
    const moneyPyramid = [
        {id:1, amount: "@ 100"},
        {id:2, amount: "@ 200"},
        {id:3, amount: "@ 500"},
        {id:4, amount: "@ 1000"},
        {id:5, amount: "@ 2000"},
        {id:6, amount: "@ 5000"},
        {id:7, amount: "@ 10000"},

    ].reverse();
    return (
        <div className={css.saytan}>
            <div className={css.main}>
                <div className={css.top}>
                    <div className={css.timer}> 30 </div>
                </div>
                <div className={css.bottom}><Trivia/></div>
            </div>

            <div className={css.pyramid}>
                <ul className={css.moneyList}>
                    {moneyPyramid.map((m) => (

                        <li className={questionNumber=== m.id ? "moneyListItem active" : "moneyListItem" }>
                        <span className={css.moneyListItemNumber}>{m.id}</span>
                        <span className={css.moneyListItemAmount}>{m.amount}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Saytan;