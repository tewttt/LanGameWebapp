import React from "react";
import css from "./style.module.css";
import { Stack, Rating } from "@mui/material";
import { useState } from "react";
import FavoriteIcon  from "@mui/icons-material/Favorite";
import FavoriteBorderIcon  from "@mui/icons-material/FavoriteBorder";
import { fontSize } from "@mui/system";

// https://www.youtube.com/watch?v=K0HzYQDohvE

const MuiRating = () => {
    const [value, setValue] = useState(null);
    console.log(value)
    const handleChange = (event) => {
        setValue(event.target.value)
    }
     return (
        <div className={css.body}>
            <Stack spacing={2}>
                <Rating
                 value={value} 
                 onChange={handleChange} 
                 precision={0.5} size="large"
                 icon={<FavoriteIcon fontSize="inherit" color="error"/>}
                 emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                //  readOnly
                //  highlightSelectedOnly
                 />

            </Stack>
        </div>
    )
}

export default MuiRating;