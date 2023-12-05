import React from "react";
import ToolSidebar from "../components/ToolSidebar";
import AdminNav from "../admin/component/AdminNav";
import Add from "../admin/page/AddLessonPage";
const AddLesson = () => {
    return (
        <div>
            <ToolSidebar/>
            <div className="pt-14 text-white">Хэрэглэгч хичээл нэмэх
            <Add/>
            </div>

            <div>
                hicheelvvd
            </div>
        </div>
    )
}

export default AddLesson;