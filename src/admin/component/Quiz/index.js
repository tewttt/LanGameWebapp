import React, {useContext, useState} from "react";
import css from "./style.module.css";
import LessonContext from "../../../context/LessonContext";
import ButtonCmp from "../../../components/Button"
import {Button} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';



//https://www.youtube.com/watch?v=O-_VzZ-VESI
// quiz firebase lesson
const CreateQuiz = () => {
    const ctx = useContext(LessonContext)
    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(true);
    const [third, setThird] = useState(true);
    const [four, setFour] = useState(true);

    const [question, setQuestion] = useState([{
        questionText: "",
            optionOne: "",
            optionTwo: "",
            optionThree: "",
            optionFour: "",
        
        correctAnswer: "",
        open: true,
    }])
    // console.log(question)

const handleChange = (event) => {
    const {value, checked} = event.target
    if(checked) {
        setValue(pre => [...pre, value])
    } else (
        // console.log("oo")
        setValue(pre => {
            return[...pre.filter(skill => skill === value)]
        })
    )
}
const [checkedValues, setValue] = useState([])
console.log(checkedValues)
   
    const handleQuestionSave = () => {
        const quiz = {
            question : question.questionText,
            correctAnswer: checkedValues,
            answer: {
                optionOne: question.optionOne,
                optionTwo :  question.optionTwo,
                optionThree : question.optionThree,
                optionFour: question.optionFour
            }
           
        };
        console.log(quiz)
        ctx.saveExam(quiz);
      
    };
    const changeQuestion = (e) => {
        setQuestion({...question, questionText:  e.target.value})
    }
    const changeCorrectAnswer = (e) => {
        setQuestion({...question, correctAnswer:  e.target.value})
    }
    const changeOptionOne = (e) => {
        setQuestion({...question, optionOne: e.target.value})
    }
    const changeOptionTwo = (e) => {
        setQuestion({...question,  optionTwo: e.target.value})
    }
    const changeOptionThree = (e) => {
        setQuestion({...question,  optionThree: e.target.value})
    }
    const changeOptionFour = (e) => {
        setQuestion({...question,  optionFour: e.target.value})
    }
    const addMoreQuestionField = () => {
        // alert("kjkj")
        
        expandCloseAll();
        setQuestion([...question, 
            {questionText: "Question", questionType: "radio", options: [{optionText: "Option1"}], open:true, required: false }
            ]);
       
    }
    console.log(question)
    const expandCloseAll = () => {
        let qs = [...question];
        for (let j = 0; j< qs.length; j++) {
            qs[j].open = false;
        }
        setQuestion(qs);
        
    }

    // const handleChange = (data) => {
    //     if(data === "optionOne")
    //     {
    //         if(first ===true){
    //             console.log(first)
    //         }
    //         setFirst(!first)
    //     }
    //     if(data === "optionTwo")
    //     {
    //         if(second === true){
    //             console.log(second)
    //         }
    //         setSecond(!second)
    //     }
      
    //     if(data === "optionThree")
    //     {
    //         if(third=== true){
    //             console.log(third)
    //         }
    //         setThird(!third)
    //     }
       
    //     if(data === "optionFour")
    //     {
    //         if(four === true){
    //             console.log(four)
    //         }
    //         setFour(!four)
    //     }
       
    // }
  
    return (
        // question.map((ques, i) => (
            <div >
            <p>Add question</p>
           
           
           
           

            <div className={css.t1}>Нэр:<input placeholder="question"  onChange={changeQuestion}/>
            </div>
            <div className={css.t1}>
                1<input placeholder="option one"  onChange={changeOptionOne}/>
                <input type="checkbox" value={question.optionOne} onChange={ handleChange}/> 
            </div>
            <div className={css.t1}>
                2<input placeholder="option two"  onChange={changeOptionTwo}/>
                <input type="checkbox" value={question.optionTwo} onChange={ handleChange}/> 
            </div>

            <div className={css.t1}>
                3<input placeholder="option three"  onChange={changeOptionThree}/>
                <input type="checkbox" value={question.optionThree} onChange={ handleChange}/> 
            </div>
            <div className={css.t1}>
                4<input placeholder="option four"  onChange={changeOptionFour}/>
                <input type="checkbox" value={question.optionFour} onChange={ handleChange}/> 
            </div>
            <Button onClick={handleQuestionSave} className={css.box}  >Save question</Button>

            <ButtonCmp text="ИЛГЭЭХ" daragdsan={ctx.createLessonDB}/>
            <div className={css.QuestionEdit}>
                <AddCircleIcon onClick={addMoreQuestionField} className={css.edit}/>                    
                                    
            </div>
           
            {/* {!ques.answer ? (
                    
            ):""} */}
           
        </div>
        // )
        )
       
    
}

export default CreateQuiz;