import React from "react";
import css from "./style.module.css";
import { Stack, Autocomplete, TextField } from "@mui/material";
import {useState} from "react";

// https://www.youtube.com/watch?v=5sgTF15fHqM

// dutuu hiisen
const skills = ['HTML', 'CSS' , 'JavaScript' , 'TypeScript' , 'React']
const MuiAutoComplete = () => {
    const [value, setValue] = useState(null);
  
    console.log(value)

    const handler = (event) => {
        setValue(event.targer.value)
    }
    return (
        <div className={css.body}>
            <Stack spacing={2} width='250px'>

            <Autocomplete
                options={skills}
                renderInput={(params) => <TextField {...params} label='Skills'/>}
                value={value}
                onChange={handler}
                freeSolo
                />

                </Stack>
        </div>
    )
}

export default MuiAutoComplete;