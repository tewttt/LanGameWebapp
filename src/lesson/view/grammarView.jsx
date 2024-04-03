import React ,{useEffect, useState} from "react";
import useLesson from "../../hook/useLesson";
import { useHistory ,useParams} from "react-router-dom";
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";
const GrammarView = () => {
  const history = useHistory();
  const {languageId, topicId, lessonId} = useParams()
  const {grammar, grammarfun} = useLesson(languageId, topicId, lessonId)
  const [enlargedIndex, setEnlargedIndex] = useState(null);

  const toggleEnlarge = (index) => {
    setEnlargedIndex(index === enlargedIndex ? null : index);
  };

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
     
      <div className="flex flex-wrap gap-2 place-content-center">
      {grammar?.grammar?.map((e, i) => {
        return (
          <div
            key={i}
            className={`w-[40%] md:w-[30%] aspect-[3/4] m-2`}
            onClick={() => toggleEnlarge(i)}>
            <img
              src={e?.image}
              className={`w-full h-full ${
                enlargedIndex === i ? 'w-screen h-screen p-3 absolute top-0 left-0  md:w-[50%] md:left-[25%] md:bg-gray-400' : ''
              }`}
              alt="Description of the image"
            />
          </div>
        );
      })}
    </div>

  
    </div>
  )
}

export default GrammarView
