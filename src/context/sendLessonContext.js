import React, {useEffect, useState} from "react";
import axios from "../axios";
import {db, storage} from "../firebase";
import {addDoc, doc, setDoc, collection, serverTimestamp, deleteDoc} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

const SendLessonContext = React.createContext("kjjkj");

export const SendLessonStore = (props) => {
    const [state, setState] = useState({
        base: [],
        translate: [],
        exam: [],
        loading: false
    });
    

    const saveBase = (base) => {
        setState({ ... state, base: base});
        // console.log(state.base)
    };
    const saveTranslate = (addtranslate) => {
        setState({ ... state, translate: addtranslate});
        // console.log(state.translate)
    };
    const saveExam = (addQuestions) => {
        setState({ ... state, exam: addQuestions}); 
       // console.log(state.exam)
    };

    // const sendLesson = async () => {
    //     const collectionRef = collection(db, "addlesson");
    //     const payload = {
    //         base: state.base,
    //         translate: state.translate,
    //         exam: state.exam,
    //         timeStamp: serverTimestamp(),
    //     }
    //     const docRef = await addDoc(collectionRef, payload);
    //     console.log("New ID: " + docRef.id)
    // }
    
     // https://www.youtube.com/watch?v=uVPtYLGPL80&list=PLqFvlDFoiZ-2SAX7YXCYtb28K4IooCIlS&index=4
    // firebase edit, add, delelte lesson
    
    const editLesson = async (id) => {
        const docRef = doc(db, "addlesson", id);
        const payload = {};
        setDoc(docRef, payload);
    }
    const deletLesson = async (id) => {
        const docRef = doc(db, "addlesson", id);
        await deleteDoc(docRef);
    }



    // const sendLesson = async(e) => {
    //     e.preventDefault();
    //     try {
    //     const res = await addDoc(collection(db,"addlesson" ), {
    //     // const res = await setDoc(doc(db,"addlesson" ), {
    //         //    ...state,
    //             base: state.base,
    //             translate: state.translate,
    //             exam: state.exam,
    //             timeStamp: serverTimestamp(),
            
    //     });
    //     console.log(res.id)

    // }catch (err){
    //     console.log(err)
    // }
    // }
    
    

   
    const sendLesson = () => {
        const lesson = {
            base: state.base,
            translate: state.translate,
            exam: state.exam
        }
        setState({ ...state, loading: true})


            axios
                .post("addLesson.json", lesson)
              
                .then(result => {
                    alert("Амжилттай илгээлээ"); 
                    console.log("amjilttai"); 
                    
                    
                  
                })
                .catch(err => {
                    alert("Илгээхэд алдаа гарлаа");
                    console.log(err.response.data)  //серверээс ирж байгаа алдаа
                })
                .finally(() => {
                    setState({...state, loading: false})
                })
           
    }
   

    return (
        <SendLessonContext.Provider 
            value={{
                sendLesson,
                state,
                saveBase,
                saveTranslate,
                saveExam,
                editLesson,
                deletLesson
            }}>
            {props.children}
        </SendLessonContext.Provider>

    )
};

export default SendLessonContext;