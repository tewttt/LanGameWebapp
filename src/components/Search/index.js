import React, {useState, useContext} from "react";
import css from "./style.module.css";
import FetchLessonContext from "../../context/FetchLessonContext";
import Button from "../Button";

const Search = (props) => {
   
    
    
    return (
       <div>
               
             <input 
             className={css.SearchBox} 
             type="text" 
             name="search"
             placeholder="Хайх"
           
             onChange={props.onSearch}
             
             />
             {/* <Button text="haih" daragdsan={searchField}/> */}
            
        </div>
    )
}

export default Search;