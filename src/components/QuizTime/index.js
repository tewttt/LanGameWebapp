import React, {useState, useEffect} from "react";
import css from "./style.module.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const data = [
    {
        question: "In what continent is indonesia? ",
        options: [
            {
                id: "0",
                option: "A",
                answer: "South America"
            },
            {
                id: "1", 
                option: "B",
                answer: "Europe",
            },
            {
                id: "2",
                option: "C",
                answer: "Asia",
            },
            {
                id: "4",
                option: "D",
                answer: "India",
            },

        ],
        correctAnswerIndex: 2
    },
    {
        question: "Монголын нийслэл? ",
        options: [
            {
                id: "0",
                option: "A",
                answer: "Улаанбаатар"
            },
            {
                id: "1",
                option: "B",
                answer: "Зүүн",
            },
            {
                id: "2",
                option: "C",
                answer: "Төв",
            },
            {
                id: "4",
                option: "D",
                answer: "Хангай",
            },

        ],
        correctAnswerIndex: 2
    },
]


const QuizTime = () => {
   
    const [points, setPoints] = useState(0);

     // index of the question
    const [index,setIndex] = useState(0);
    const currentQuestion = data[index];

   // answer Status (true or false)
   const [answerStatus, setAnswerStatus] = useState(null);

   // answers
   const [answers, setAnswers] = useState([]);

   // selected answer
   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

   // counter
   const [counter, setCounter] = useState(15);

   // interval
   let interval = null;

    useEffect(() => {
        if(selectedAnswerIndex !== null){
            if(selectedAnswerIndex === currentQuestion?.correctAnswerIndex){
                setPoints((points) => points + 10);
                setAnswerStatus(true);
                answers.push({question: index + 1, answer : true})
            } else {
                setAnswerStatus(false);
                answers.push({question:index + 1, answer: false})
            }
        }
    }, [selectedAnswerIndex]);

    useEffect(() => {
        setSelectedAnswerIndex(null);
        setAnswerStatus(null);
    }, [currentQuestion]);

    useEffect(() => {
        const myInterval = () => {
            if(counter >= 1){
                setCounter((counter) => counter -1);
            }
            if(counter === 0) {
                setIndex(index + 1);
                setCounter(15);
            }
            interval = setTimeout(myInterval, 1000);
            // clean up
            return () => {
                clearTimeout(interval);
            }
        }
    },[counter]);

    useEffect(() => {
        if(index  + 1 > data.length) {
            // Navigation.navigate("Results",{
            //     answers :answers,
            //     points: points
            // })
        } 
    },[currentQuestion])

    useEffect(() => {
        if(!interval) {
            setCounter(15)
        }
    }, [index])
     
    
    return (
        <div style={{width: 500, background: "#383030", color: "white", margin: "auto"}}>
            <div style={{display: "flex", flexDirection: 'row', justifyContent: "space-between", alignItems: "center", margin: 10, }}>
                <p>Quiz challenge</p>
                <div style={{borderRadius: 20, borderWidth: 5, padding: 5, width: 20, backgroundColor: "red"}}>{counter}</div>
            </div>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between",margin: 10, backgroundColor: "#030E07", padding: 10}}>
                <p>Your progress</p>
                <p>(0/5) questions answered</p>
            </div>
            <div style={{backgroundColor:"#030E07", color: "#2EF3D0", padding: 10, margin: 10}}>
                <p>{currentQuestion.question}</p>
                <div>
                    {currentQuestion.options.map((item, index) => {
                        return (
                            <div onClick={() => selectedAnswerIndex === null && setSelectedAnswerIndex(index)}
                             key={index} 
                             style= {
                                selectedAnswerIndex === index &&
                                index === currentQuestion.correctAnswerIndex
                                ? {
                                    
                                        display: "flex", 
                                        flexDirection: "row", 
                                        margin: 10,
                                        backgroundColor: "green"
                                }
                                : selectedAnswerIndex !== null &&
                                selectedAnswerIndex === index
                                ? {
                                    
                                    display: "flex", 
                                    flexDirection: "row", 
                                    margin: 10,
                                    backgroundColor: "red"
                                }
                                :{
                                    
                                    display: "flex", 
                                    flexDirection: "row", 
                                    margin: 10,
                                   
                                }
                             }
                            
                             >
                                {selectedAnswerIndex === index && index === currentQuestion?.correctAnswerIndex ? (
                                    <CheckCircleIcon/>
                                ): selectedAnswerIndex != null && 
                                selectedAnswerIndex === index ? (
                                    <CancelIcon/>
                                ) : (
                                    <div>{item.option}</div>
                                )}
                                <div style={{ marginRight: 10}}>{item.option}</div>
                                <div>{item.answer}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default QuizTime;