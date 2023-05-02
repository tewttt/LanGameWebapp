import React, { useState , useEffect} from "react";
import axios from "../axios";
import {db, storage} from "../firebase";
import {doc, setDoc} from "firebase/firestore";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"


const FetchLessonContext = React.createContext();

const initialState = {
    lesson: [],
    loading: false,
    error: null,
    id: ""
   
};

export const FetchLesssonStore = (props) => {
    const [state, setState] = useState(initialState);
    console.log(state)

    const onsearchChanged = event => {
        setState({ ...state, searchField: event.target.value});
    }

    // useEffect ( () => {
    //     const uploadFile = () => {
    //         const name = new Date().getTime() + state.name
    //         console.log(name)
    //         // const storageRef = ref(storage, state.name)
    //     }
    // }, []);



    //    useEffect(() => {
      
    //         db.collection("addlesson").onSnapshot(snapshot => {
    //             setState(...state, snapshot.docs.map(doc => ({
    //                 id:doc.id,
    //                 lesson:doc.data().lesson
    //             })))
    //         })
    //     }, []);

    useEffect( () => {
        setState({...state, loading: true})
        axios
        .get("/addLesson.json")
        .then((response) => {
           console.log(response.data)
            const arr = Object.entries(response.data).reverse();
           console.log(arr)
            setState({...state,  lesson: arr });
          
           
        })
        .catch(err => setState({ ...state, error: err}))
        .finally(() => {
            setState({...state, loading: false})
        })
    }, [])

   
    return (
            <FetchLessonContext.Provider
            value={{ 
                state,
              
                onsearchChanged
               

            }}
            >
                {props.children}
            </FetchLessonContext.Provider>
    );
};

export default FetchLessonContext;