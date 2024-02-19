import React, {  useState } from "react";
import {  useHistory ,useParams, useLocation} from "react-router-dom";
import ToolSidebar from "../../../components/ToolSidebar";
import useLesson from "../../../hook/useLesson";
import { useEffect } from "react";
import pattern from "../../../assets/logo/Typo Logo SVG Black.svg"
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";


const LessonView = () => {
  const {languageId, topicId, lessonId} = useParams()
  const {oneLesson , getOneLesson , grammar, grammarfun} = useLesson(languageId, topicId, lessonId)
  const history = useHistory();
  const [rating, setRating] = useState(null);

  useEffect(() => {
    getOneLesson()
    grammarfun()
  }, [])

 const changeWord = () => {
    history.push(`/word/${languageId}/${topicId}/${lessonId}`)
 }

 const changeGrammar = () => {
  history.push(`/grammar/${languageId}/${topicId}/${lessonId}`)
   
 }
 const changeExam = () => {
  history.push(`/exam/${languageId}/${topicId}/${lessonId}`)
  
 }
 const changeTranslate = () => {
    history.push(`/translate/${languageId}/${topicId}/${lessonId}`)
 }
 
  return (
    <div className=" relative bg-baseBlack text-white pt-6 pb-48 px-6 md:pt-0">
      <ToolSidebar />
      <div className="md:pt-20 md:w-full m-auto h-screen">
        <div className="flex py-2 justify-between pb-4">
          <IoIosArrowBack size={20} onClick={() => history.push("/")}/>
          <p></p>
          <IoIosSettings size={20}/>
        </div>
      
        <p className="text-2xl font-bold my-1"> {oneLesson?.language} {oneLesson?.level} №{oneLesson?.lessonNumber}</p>
        
        <div className="md:flex">
          <video  
            className="md:m-2 my-2 border-2 md:w-1/2 border-white rounded-2xl"
            src={oneLesson?.video}  type="video/mp4" controls>
          </video>
          <div className="md:m-2 my-2 border-2 md:w-1/2 border-white rounded-2xl">
            <img src={oneLesson?.image}/>
          </div>
          <div className="md:m-2 my-2 border-2 md:w-1/2 border-white rounded-2xl">
            <img src={grammar?.grammar} controls/>
          </div>
        
        </div>

        <div className="flex my-2">
          <button onClick={changeTranslate} 
              className="w-1/2 bg-white font-bold text-baseBlack p-2 rounded-2xl mx-2"
                >
              Орчуулга
          </button>
          
          <button onClick={changeWord} 
              className="w-1/2 bg-white font-bold text-baseBlack p-2 rounded-2xl mx-2"  
              >
              Шинэ үг
          </button>
        </div>
        
        <div className="md:flex h-[100px] md:h-[40px] md:my-2">
          <button onClick={changeExam} 
              className="w-full h-full md:full  bg-white font-bold text-baseBlack rounded-2xl my-2 md:mx-2"
                >
              Шалгалт
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default LessonView;



{/* <div className={css.bodyStar}>
<StarIcon onClick={() => setRating(1)} className={css.star} />
<StarIcon onClick={() => setRating(2)} className={css.star} />
<StarIcon onClick={() => setRating(3)} className={css.star} />
<StarIcon onClick={() => setRating(4)} className={css.star} />
<StarIcon onClick={() => setRating(5)} className={css.star} />
</div> */}

// let query = useQuery();
// console.log('lang', query.get("lang"))

// let lessonId = null
// if(query.get("lang") == 'Англи хэл') {
//     lessonId = ctx.englishList.find(
//         item =>  item.id === id
//     );
// } else if(query.get("lang") == 'Солонгос хэл') {
//     lessonId = ctx.koreaList.find(
//         item =>  item.id === id
//     );
// } else if(query.get("lang") == "Монгол хэл") {
//     lessonId = ctx.mongoliaList.find(
//         item =>  item.id === id
//     );
// }