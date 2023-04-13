import React, {useContext} from "react";
import { DefaultPlayer as Video } from "react-html5video";
import introVideo from "../../src/assets/video/1.mp4";
import photo from "../../src/assets/img/1.jpg";
import "react-html5video/dist/styles.css";
import FetchLessonContext from "../context/FetchLessonContext";

const ReactVideoPlayer = () => {
    const ctx = useContext(FetchLessonContext)
    // console.log(ctx.state.lesson[0][1].base.video)
    return (
        <div>
            <Video autoPlay loop
            poster={photo}
            on  
            // {props.lesson.photo}
            >
                <source 
                // src={ctx.state.lesson[0][1].base.video} 
                type="video/webm"/>
            </Video>
        </div>
    )
}

export default ReactVideoPlayer;