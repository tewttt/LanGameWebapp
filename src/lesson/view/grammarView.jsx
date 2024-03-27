import React ,{useEffect} from "react";
import useLesson from "../../hook/useLesson";
import { useHistory ,useParams} from "react-router-dom";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
const GrammarView = () => {
  const history = useHistory();
  const {languageId, topicId, lessonId} = useParams()
  const {grammar, grammarfun} = useLesson(languageId, topicId, lessonId)

  useEffect(() => {
    grammarfun()
  } ,[])

  return (
    <div  className="text-white bg-baseBlack px-6 pt-6 pb-24 h-screen">
       <div className="flex py-2 justify-between pb-4">
          <IoIosArrowBack size={20} onClick={() => history.push(`/lesson/${languageId}/${topicId}/${lessonId}`)}/>
          <p></p>
          <IoIosSettings size={20}/>
      </div>
      <p className="text-2xl font-bold my-1">Grammar</p>
      {/* grid grid-cols-3 place-items-center" */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 place-items-center">
        {grammar?.grammar?.map((e , i) => (
          <img src={e?.image}
            className="w-full m-2 lg:w-[90%] aspect-square"
          />
        ))}
      </div>
    </div>
  )
}

export default GrammarView
