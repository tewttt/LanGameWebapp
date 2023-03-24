import React, { useState , useEffect} from "react";
import axios from "../axios";

const FetchLessonContext = React.createContext();

const initialState = {
    lesson: [],
    loading: false,
    error: null,
   
};

export const LesssonStore = (props) => {
    const [state, setState] = useState(initialState);

    const onsearchChanged = event => {
        setState({ ...state, searchField: event.target.value});
    }
    useEffect( () => {
        axios
        .get("/addLesson.json")
        .then((response) => {
           
            const arr = Object.entries(response.data).reverse();
            // console.log(fetchLesson)
            setState({...state, lesson: arr });
            // console.log(fetchLesson);
        })
        .catch(err => setState({ ...state, error: err}));
    }, [])

   
    return (
            <FetchLessonContext.Provider
            value={{ 
                state,
                // Search,
                onsearchChanged
                // loadLesson

            }}
            >
                {props.children}
            </FetchLessonContext.Provider>
    );
};

export default FetchLessonContext;