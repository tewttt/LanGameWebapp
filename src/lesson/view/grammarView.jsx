import React ,{useEffect} from "react";
import useLesson from "../../hook/useLesson";
import { useHistory ,useParams} from "react-router-dom";

const GrammarView = () => {
  const {languageId, topicId, lessonId} = useParams()
  const {grammar, grammarfun} = useLesson(languageId, topicId, lessonId)

  useEffect(() => {
    grammarfun()
  } ,[])


  return (
    <div>
       <img
          src={grammar?.grammar}
          className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]"
        />
    </div>
  )
}

export default GrammarView
