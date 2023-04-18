import React, { useState , useEffect} from "react";
import axios from "../axios";
import { TurnLeft } from "@mui/icons-material";

const FetchLessonContext = React.createContext();

const initialState = {
    lesson: [],
    loading: false,
    error: null,
   
};

export const FetchLesssonStore = (props) => {
    const [state, setState] = useState(initialState);

    const onsearchChanged = event => {
        setState({ ...state, searchField: event.target.value});
    }
    useEffect( () => {
        setState({...state, loading: true})
        axios
        .get("/addLesson.json")
        .then((response) => {
           
            const arr = Object.entries(response.data).reverse();
           
            setState({...state, lesson: arr });
          
           
        })
        .catch(err => setState({ ...state, error: err}))
        // .finally(() => {
        //     setState({...state, loading: false})
        // })
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