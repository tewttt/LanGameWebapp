import React, {useState} from "react";
import css from "./style.module.css"

const Quiz = () => {
    const [showFinalResults, setFinalResults] = useState(false);
    const [score , setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const questions = [
        {
            text: "What is the capital of America",
            options: [
                {id: 0, text: "New York City " , isCorrect: false},
                {id: 1, text: "Boston", isCorrect: false},
                {id: 2, text: "Santa Fe", isCorrect: false},
                {id: 3, text: "washington DC" , isCorrect: true},
            ],
        },
        {
            text: "What is the capital of Mongolia",
            options: [
                {id: 0, text: "Huvsgul " , isCorrect: false},
                {id: 1, text: "Tsetseg", isCorrect: false},
                {id: 2, text: "Santa Fe", isCorrect: false},
                {id: 3, text: "Ulaanbaatar" , isCorrect: true},
            ],
        },
    ];

    const optionClicked = (isCorrect) => {
        if( isCorrect) {
            setScore(score + 1);
        }
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinalResults(true);
        }
       
    }

    const restart = () => {
        setScore(0);
        setCurrentQuestion(0);
        setFinalResults(false);
    }

    return (
        <div className={css.Quiz}>
            <h1>Quiz</h1>
            <h2>{score} out of {questions.length } correct - ({(score/questions.length) * 100 }%)</h2>

            {showFinalResults ? (
                 <div className={css.finalResult}>
                 <h1>finalResult</h1>
                 <h2>{score} out of {questions.length } correct - ({(score/questions.length) * 100 }%)</h2>
                 <button onClick={() => restart()}>Restart Game</button>
                 
 
             </div>
            ) : (
                <div className={css.questionCard}>
                <h2>Question {currentQuestion + 1} out of {questions.length}</h2>
                <h3 className={css.questionText}>{questions[currentQuestion].text}</h3>

                <ul>
                    {questions[currentQuestion].options.map((option) => {
                        return (
                            <li
                            onClick={() => optionClicked(option.isCorrect)}
                            key={option.id}>
                                {option.text}
                            </li>
                        )
                    })}
                
                </ul> 

            </div >
            )}

           

           

        </div>
    )
};

export default Quiz;