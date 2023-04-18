import React, {useState} from "react";
import css from "./style.module.css";
import {Box, Checkbox, FormControl, FormLabel, FormGroup, FormHelperText, FormControlLabel} from '@mui/material';

const ExamView = (props) => {
    const [skills, setSkills] = useState([]);
    const handleSkillChange = (event) => {
        const index = skills.indexOf(event.target.value)
        if(index === -1) {
            setSkills([ ...skills, event.target.value])
        } else {
            setSkills(skills.filter((skill) => skill !== event.target.value))
        }
    }
    // console.log(props.exam)
   
    return (
        <div className={css.body}>
            
            {props.exam.map(el => (
                <div className={css.answers}>{el.answer}
                    <input placeholder={el.questionText}/>
                    {
                        el.options.map(el=> (
                           
                                <div className={css.answer}>{el.optionText}</div>
                                
                       
                        ))
                    }
                  

                    {/* <Box>
                    <FormControl error>
                        <FormLabel>харуилт</FormLabel>
                        <FormGroup>
                            <FormControlLabel 
                                label="HTML"
                                control={<Checkbox value='html' checked={skills.includes("html")} onChange={handleSkillChange}/>}
                                />
                        
                            <FormControlLabel 
                                label="CSS"
                                control={<Checkbox value='css' checked={skills.includes("css")} onChange={handleSkillChange}/>}
                                />
                        
                            <FormControlLabel 
                                label="JavaScript"
                                control={<Checkbox value='javascript' checked={skills.includes("javascript")} onChange={handleSkillChange}/>}
                                />
                        </FormGroup>
                        <FormHelperText>хариулт сонгох</FormHelperText>
                    </FormControl>
                </Box> */}
                </div>
            ))}
        </div>
    )
}

export default ExamView;