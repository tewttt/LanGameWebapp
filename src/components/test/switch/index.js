import React from "react";
import css from "./style.module.css";
import { Box, FormControlLabel, Switch } from "@mui/material";
import {useState} from "react"

// https://www.youtube.com/watch?v=3fSiQp-CEDA
const MuiSwitch = () => {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked)
    }
    return (
        <div className={css.body}>
            <Box>
                <FormControlLabel label="Dark mode" 
                control={<Switch checked={checked} onChange={handleChange}
                size="small"
                color="success"
                />}
                />
            </Box>
        </div>
    )
}

export default MuiSwitch;