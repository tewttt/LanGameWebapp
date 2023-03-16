import React, { useState } from "react";
import axios from "../axios";

const FetchLessonContext = React.createContext();

const initialState = {
    lesson: [],
    loading: false,
    error: null
};

export const LesssonStore = (props) => {
    const [state, setState] = useState(initialState);

    // const loadLesson  = () => {
    //     setState({ ...state, loading: true});

        axios
        .get("/addLesson.json")
        .then((response) => {
           
            const arr = Object.entries(response.data).reverse();
            // console.log(fetchLesson)
            setState({...state, lesson: arr });
            // console.log(fetchLesson);
        })
        .catch(err => setState({ ...state, error: err}));
        

   
    return (
            <FetchLessonContext.Provider
            value={{ 
                state,
                // loadLesson

            }}
            >
                {props.children}
            </FetchLessonContext.Provider>
    );
};

export default FetchLessonContext;