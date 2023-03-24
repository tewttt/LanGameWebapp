import React from "react";
import css from "./style.module.css";
import {Box, MenuItem, TextField} from "@mui/material";
import {useState} from "react";


const MuiSelect = () => {
    const [country, setCountry] = useState([]);
    // : React.ChangeEvent<HTMLInputElement>
    const handleChange = (event) => {
        const value = event.target.value
        setCountry(typeof value === "string" ? value.split(',') : value)
    }
    return (
        <div className={css.body}>
            <Box width="250px">
                <TextField label="Select country" select value={country} 
                onChange={handleChange} fullWidth
                SelectProps={{ multiple: true}}
                size="small"
                color="secondary"
                helperText="Please ornooo songo"
                error
                >
                    <MenuItem value="IN">India</MenuItem>
                    <MenuItem value="US">USA</MenuItem>
                    <MenuItem value="AU">Australia</MenuItem>


                </TextField>
            </Box>
        </div>
    )
}

export default MuiSelect;