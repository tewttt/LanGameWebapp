import React, {useState} from "react";
import css from "./style.module.css";
import QuizTest from "../../components/test/quiz";
import MuiTypography from "../../components/test/typography";
import Muibutton from "../../components/test/button";
import MuitextField from "../../components/test/textField";
import MuiSelect from "../../components/test/select";
import MuiRadio from "../../components/test/radioButton";
import MuiCheckbox from "../../components/test/checkbox";
import MuiSwitch from "../../components/test/switch";
import MuiRating from "../../components/test/rating";
import MuiAutoComplete from "../../components/test/autocomplete";
import Saytan from "../../components/test/saytanQuiz";
import Form from "../../components/test/form";
import License from "../../components/test/licenceCheck";

const Quiz = () => {
    

    return (
       <div >
       
        {/* <License/> */}
        {/* <Form/> */}
        <Saytan/>
        {/* <MuiAutoComplete/> */}
       {/* <MuiRating/> */}
        {/* <MuiSwitch/>  */}
        {/* <MuiCheckbox/> */}
        {/* <MuiRadio/> */}
        {/* <MuiSelect/> */}
        {/* <MuitextField/> */}
        {/* <Muibutton/> */}
         {/* <MuiTypography/> */}
        {/* <QuizTest/>  */}
       </div>
    )
};

export default Quiz;