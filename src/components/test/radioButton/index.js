import React from "react";
import css from "./style.module.css";
import {Box, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, FormHelperText} from "@mui/material";
import {useState} from "react"

const MuiRadio = () => {
    const [value, setValue] = useState("");
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <div className={css.body}>
            <Box>
                <FormControl error>
                <FormLabel id="job-experience-group-label">
                    yeras
                </FormLabel>
                <RadioGroup name="job-experience-group" 
                aria-labelledby="job-experience-group-label"
                value={value}
                onChange={handleChange}
                row
                >
                    <FormControlLabel control={<Radio size="medium" color="secondary"/>}  label='0-2' value='0-2'/>
                    <FormControlLabel control={<Radio/>} label='3-5' value='3-5'/>
                    <FormControlLabel control={<Radio/>} label='6-10' value='6-10'/>
                </RadioGroup>
                <FormHelperText>Invalid select</FormHelperText>
                </FormControl>
            </Box>
        </div>

    )
}

export default MuiRadio;