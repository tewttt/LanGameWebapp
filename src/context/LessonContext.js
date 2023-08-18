import React from "react";
import { useState } from "react";
import {db, storage} from "../firebase";
import {doc,getDocs, onSnapshot,collection, addDoc, updateDoc, deleteDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const auth = getAuth();
const LessonContext = React.createContext();
const initialState= {
    base: [],
    translate: [],
    exam: [],
    image: [],
    video: [],
    grammar: [],
    newWord: [],
}

export const LessonStore = (props) => {
    const [state, setState] = useState(initialState)
    const [lessonList, setLessonList] = useState([]);  
    // console.log(state.image)
// https://www.youtube.com/watch?v=2hR-uWjBAgw&t=1095s
// firestro db tai ajillah hicheel

    const saveBase = (base) => {setState({...state, base: base})}
    const saveExam = (quiz) => {setState({...state, exam: quiz})}
    const saveTranslate= (questions) => {setState({...state, translate: questions})}
    const saveImage = (downloadURL) => {setState({...state, image: downloadURL})}
    const saveVideo = (downloadURL) => {setState({...state, video: downloadURL})}
    const saveGrammar = (downloadURL) =>{setState({...state, grammar: downloadURL})}
    const saveNewWord = (questions) => {setState({...state, newWord: questions})}

     // read Data
     const lessonsRef = collection(db, "lessons");
        const getLessonList = async () => {
            try {
                const data =await getDocs(lessonsRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setLessonList(filteredData)
            } catch (err) {
                console.log(err)
            }
        };
        
     useEffect (() => { 
        getLessonList();
    }, []);


    const createLessonDB = async () => {
        try {
            await addDoc(lessonsRef, {
                userId: auth.currentUser?.uid,
                state
            });
            alert("lesson db ilgeelee")
            getLessonList();
        } catch (err) {
            console.log(err)
        }
    }

    const updateDB = async (id) => {
        const updateLesson = doc(db, "lessons" ,id)
        await updateDoc(updateLesson, {state: state})
        alert("lesson update")
        getLessonList();
        // console.log('update'+ id)
    }

    const deleteDB = async (id) => {
       
        const LessonDoc = doc(db, "lessons", id);
        await deleteDoc(LessonDoc);
        getLessonList();
    }
    
return (
    <LessonContext.Provider
        value={{
            state,
            saveBase,
            // baseImageDB,
            createLessonDB,
            saveExam,
            saveTranslate,
            lessonList,
            saveImage,
            saveVideo,
            saveGrammar,
            saveNewWord,
            // saveNewWordImage,
            // saveNewWordSound,
            updateDB,
            deleteDB

        }}
    >
        {props.children}
    </LessonContext.Provider>
);

};
export default LessonContext;