import React, {useContext, useState} from "react";
import AdminLessonList from "../../component/AdminLessonList"
import LessonContext from "../../../context/LessonContext";

const AllLesson = () => {
    const ctx= useContext(LessonContext)
    const arrLanguage =["Англи хэл", "Монгол хэл", "Солонгос хэл"];
    const [lanActive, setLanActive] = useState("");
    const [chLan, setChLan] = useState("");

    const selectLan = (lan, i) => {
        setLanActive(i)
        setChLan(lan)
    }
    return (
        <div className="text-white flex flex-col mt-12">
            <div className="flex">
                {arrLanguage.map((lan,i) => (
                    <div
                        className={`${lanActive===i ? "border border-blue-700 text-blue-600":""} text-[12px] sm:text-[18px]   transform hover:scale-110 hover:border-blue-500 hover:text-blue-500 text-blue-200 border border-blue-200 rounded-[10px] py-1 px-2 mx-3 my-1 w-[90px] h-[30px] sm:w-[130px] sm:h-[40px] flex justify-center items-center`}
                        key={i}
                        onClick={() => selectLan(lan, i)} 
                    >
                        {lan}
                    </div> 
                ))}
            </div>
           {chLan === "Англи хэл" ? (
        
            <AdminLessonList lessons={ctx.englishList} lan={chLan}/>
           ): chLan === 'Солонгос хэл' ? (
            <AdminLessonList lessons={ctx.koreaList} lan={chLan}/>
           ) : (
            <AdminLessonList lessons={ctx.mongoliaList} lan={chLan}/>
           )}
        </div>
    )
}
export default AllLesson; 