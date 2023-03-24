import React from "react";
import css from "./style.module.css";
import {Box, FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup, FormHelperText} from "@mui/material";
import {useState} from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// https://www.youtube.com/watch?v=9L0QhB-6xBI

const MuiCheckbox = () => {
    const [accepTnc, setAcceptTnc] = useState(false);
    const [skills, setSkills] = useState([])
    const handleChange = (event) => {
        setAcceptTnc(event.target.checked)
    }

    const handleSkillChange = (event) => {
        const index = skills.indexOf(event.target.value)
        if(index === -1) {
            setSkills([ ...skills, event.target.value])
        } else {
            setSkills(skills.filter((skill) => skill !== event.target.value))
        }
    }
    return (
        <div className={css.body}>
            <Box>
                <Box>
                    <FormControlLabel 
                    label="i accept"
                    control={
                    <Checkbox 
                    checked={accepTnc} 
                    onChange={handleChange}
                    size= "small"
                    color="secondary"
                    />}
                    />
                </Box>
                <Box>
                    <Checkbox
                        icon={<BookmarkBorderIcon/>}
                        checkedIcon={<BookmarkIcon/>}
                        checked={accepTnc}
                        onChange={handleChange}
                    />
                </Box>

                <Box>
                    <FormControl error>
                        <FormLabel>skills</FormLabel>
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
                        <FormHelperText>invalid select</FormHelperText>
                    </FormControl>
                </Box>
            </Box>
        </div>
    )
}

export default MuiCheckbox;