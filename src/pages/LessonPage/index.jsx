import React from "react";
import Choice from "../../components/Choice";
import ToolSidebar from "../../components/ToolSidebar";
import css from "./style.module.css"
import Comment from "../../components/Comment";
import Hero from "../../components/Hero";
import Ballball from "../../UI/Ballball"
import Ball from "../../UI/Fire/fire";
import GreenStar from "../../UI/GreenStar";
import Loader from "../../UI/Loader";
import Packman from "../../UI/packman";
import Planets from "../../UI/planets";
import Delhii3d from "../../UI/delhii3d";
import AnalogClock from "../../UI/AnalogClock/AnalogClock";
import DigitalClock from "../../UI/DigitalClock/DigitalClock";
import BackgroundAnimation from "../../UI/BackgroundAnimation";
import Ironman from "../../UI/Ironman";
import Profile from "../../UI/PofileCard/ProfileCard";
import FlipCard from "../../UI/FlipCard";
import SvgTest from "../../UI/svgtest";
import SvgAnimation from "../../UI/SvgAnimationBorder";
import SvgLoader from "../../UI/SvgLoader";
import Wave from "../../UI/Wave";
import Checkbox from "../../UI/Checkbox";


// https://www.youtube.com/watch?v=50vgpBDhEkY&list=PLEVTJcDnFDm9lpEEHTftRa9JSRV4jY_p9&index=12  
// Quiz app ийн заавар

const LessonPage = () => {
    return (
        <div className="text-white flex flex-col justify-center">
            <ToolSidebar/>
            <Choice/>
            {/* <Checkbox/> */}
            {/* <Wave/> */}
            {/* <SvgLoader/> */}
            {/* <SvgAnimation/> */}
           {/* <SvgTest/> */}
            {/* <FlipCard/> */}
            {/* <Profile/> */}
            {/* <Ironman/> */}
            {/* <BackgroundAnimation/> */}
            {/* <GreenStar/> */}
            {/* <Planets/> */}
            {/* <Delhii3d/> */}
            {/* <Ballball/> */}
            {/* <AnalogClock/> */}
            {/* <DigitalClock/> */}
          
            {/* <Packman/> */}
            {/* <Loader/> */}
            {/* <Ball/> */}
            {/* <Hero/> */}
            {/* <Comment/> */}
        </div>      
)}
export default LessonPage;