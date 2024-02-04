import React , {useContext} from "react";
import LessonContext from "../../context/LessonContext";
const WordView = () => {
  const ctx = useContext(LessonContext)

  const word = ctx?.word?.word
  return (
    <div>
      {word.map((w, i) => {
        console.log(w)
        return (
          <div className="border border-gray-500 m-1 p-1">
            <p>{w.word}</p>
            <p>{w.trans}</p>
            <p>{w.desc}</p>
            <img src={w.image}/>
            <audio controls>
              <source src={w.sound} type="audio/mpeg" />
              aii
            </audio>
          </div>
        )
      })}
    
    </div>
  )
}
export default WordView
