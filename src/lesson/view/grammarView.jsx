import React ,{useContext} from "react";
import LessonContext from "../../context/LessonContext";
const GrammarView = () => {
  const ctx = useContext(LessonContext)
  const grammar = ctx?.grammar?.grammar
  
  return (
    <div>
       <img
          src={grammar}
          className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"
        />
    </div>
  )
}

export default GrammarView
