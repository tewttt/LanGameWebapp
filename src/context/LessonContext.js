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
const editState = {
    base: []
}

export const LessonStore = (props) => {
    const [state, setState] = useState(initialState)
    const [englishList, setEnglishList] = useState([]);  
    const [koreaList, setKoreaList] = useState([]);  
    const [mongoliaList, setMongoliaList] = useState([]);  
    // console.log(lessonList)
// https://www.youtube.com/watch?v=2hR-uWjBAgw&t=1095s
// firestro db tai ajillah hicheel

    const saveBase = (base) => {setState({...state, base: base})}
    const saveExam = (quiz) => {setState({...state, exam: quiz})}
    const saveTranslate= (questions) => {setState({...state, translate: questions})}
    const saveImage = (downloadURL) => {setState({...state, image: downloadURL})}
    const saveVideo = (downloadURL) => {setState({...state, video: downloadURL})}
    const saveGrammar = (downloadURL) =>{setState({...state, grammar: downloadURL})}
    const saveNewWord = (questions) => {setState({...state, newWord: questions})}
// console.log(state.image)
     // read Data
    //  const lessonsRef = collection(db, "lessons");
    const EnglishRef = collection(db, "english");
    const KoreaRef = collection(db, "korea");
    const MongoliaRef = collection(db, "mongolia");

    const getEnglishList = async () => {
        try {
            const data =await getDocs(EnglishRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setEnglishList(filteredData)
        } catch (err) {
            console.log(err)
        }
    };

        const getKoreaList = async () => {
            try {
                const data =await getDocs(KoreaRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setKoreaList(filteredData)
            } catch (err) {
                console.log(err)
            }
        };

        const getMongoliaList = async () => {
            try {
                const data =await getDocs(MongoliaRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setMongoliaList(filteredData)
            } catch (err) {
                console.log(err)
            }
        };
        
     useEffect (() => { 
        getEnglishList();
        getMongoliaList();
        // getLessonList();
        getKoreaList()
    }, []);


    // const createLessonDB = async () => {
    //     try {
    //         await addDoc(lessonsRef, {
    //             userId: auth.currentUser?.uid,
    //             state
    //         });
    //         alert("lesson db ilgeelee")
    //         getLessonList();
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    
    const createEnglishDB = async () => {
        try {
            await addDoc(EnglishRef, {
                userId: auth.currentUser?.uid,
                state
            });
            alert("englsh lesson db ilgeelee")
            getEnglishList();
        } catch (err) {
            console.log(err)
        }
    }

    const createKoreaDB = async () => {
        try {
            await addDoc(KoreaRef, {
                userId: auth.currentUser?.uid,
                state
            });
            alert("korea lesson db ilgeelee")
            getKoreaList();
        } catch (err) {
            console.log(err)
        }
    }

    const createMongoliaDB = async () => {
        try {
            await addDoc(MongoliaRef, {
                userId: auth.currentUser?.uid,
                state
            });
            alert("mongolia lesson db ilgeelee")
            getMongoliaList();
        } catch (err) {
            console.log(err)
        }
    }

    const updateEnglishDB = async (id) => {
        // preventDefault();
        const updateLesson = doc(db, "english" ,id)
        await updateDoc(updateLesson, {state: state})
        alert("lesson enlish update")
        getEnglishList();
    }
    const updateKoreaDB = async (id) => {
        const updateLesson = doc(db, "korea" ,id)
        await updateDoc(updateLesson, {state: state})
        alert("lesson korea update")
        getKoreaList();
    }
    const updateMongoliaDB = async (id) => {
        const updateLesson = doc(db, "mongolia" ,id)
        await updateDoc(updateLesson, {state: state})
        alert("lesson mongolia update")
        getMongoliaList();
    }

    const deleteEnglishDB = async (id) => {
        console.log(id)
        const LessonDoc = doc(db, "english", id);
        await deleteDoc(LessonDoc);
        getEnglishList();  
    }
    const deleteKoreaDB = async (id) => {
        const LessonDoc = doc(db, "korea", id);
        await deleteDoc(LessonDoc);
        getKoreaList();  
    }
    const deleteMongoliaDB = async (id) => {
        const LessonDoc = doc(db, "mongolia", id);
        await deleteDoc(LessonDoc);
        getMongoliaList();  
    }
    
return (
    <LessonContext.Provider
        value={{
            state,
            saveBase,
            // baseImageDB,
            // createLessonDB,
            saveExam,
            saveTranslate,
            // lessonList,
            englishList,
            mongoliaList,
            koreaList,
            saveImage,
            saveVideo,
            saveGrammar,
            saveNewWord,
            // saveNewWordImage,
            // saveNewWordSound,
            updateEnglishDB,
            updateKoreaDB,
            updateMongoliaDB,
            deleteEnglishDB,
            deleteKoreaDB,
            deleteMongoliaDB,
            createEnglishDB,
            createKoreaDB,
            createMongoliaDB

        }}
    >
        {props.children}
    </LessonContext.Provider>
);

};
export default LessonContext;