import React, { useContext} from "react";
import LessonContext from "../../context/LessonContext";

const VideoView = () => {
  const ctx = useContext(LessonContext);
  return (
    <div className="flex flex-col justify-center items-center">
        <video src={ctx?.lesson?.video} width="320" height="240" type="video/mp4" controls></video>
    </div>
  );
};

export default VideoView;

