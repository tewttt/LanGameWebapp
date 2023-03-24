import React from "react";
import css from "./style.module.css";
import {Stack, Button, IconButton, ButtonGroup, ToggleButtonGroup, ToggleButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"

const Muibutton = () => {
    return (
        <Stack spacing={4}>
            <Stack spacing={2} direction="row">
                <Button variant="text" href="https://www.google.com/">Text</Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">outlined</Button>
            </Stack>

            <Stack spacing={2} direction="row">
                <Button variant="contained" color="primary">primary</Button>
                <Button variant="contained" color="secondary">secondary</Button>
                <Button variant="contained" color="error">error</Button>
                <Button variant="contained" color="warning">warning</Button>
                <Button variant="contained" color="info">info</Button>
                <Button variant="contained" color="success">success</Button>
            </Stack>
            <Stack display="block" spacing={2} direction="row">
                <Button variant="contained" size="small"> Small</Button>
                <Button variant="contained" size="medium"> Medium</Button>
                <Button variant="contained" size="large"> Large</Button>
            </Stack>

            <Stack spacing={2} direction="row">
                <Button variant="contained" startIcon={<SendIcon/>} disableRipple onClick={() => alert('Clicked')}>Send</Button>
                
                <Button variant="contained" endIcon={<SendIcon/>} disableElevation>Send</Button>
                <IconButton aria-label="send" color="error" size="small">
                    <SendIcon/>
                </IconButton>
            </Stack>

            <Stack direction="row">
                <ButtonGroup variant="contained" orientation="vertical" size="small" color="secondary" aria-label="alignment button group">
                    <Button onClick={() => alert ("Left clicked")}>Left</Button>
                    <Button >Center</Button>
                    <Button >Right</Button>
                </ButtonGroup>


            </Stack>

            <Stack direction="row">
                <ToggleButtonGroup aria-label="text formatting" size="small" color="secondary" orientation="vertical">
                    <ToggleButton value="bold" aria-label="bold" ><FormatBoldIcon/></ToggleButton>
                    <ToggleButton value="italic" aria-label="italic"><FormatItalicIcon/></ToggleButton>
                    <ToggleButton value="underlined" aria-label="underline"><FormatUnderlinedIcon/></ToggleButton>
                </ToggleButtonGroup>

            </Stack>
        </Stack>
    )
}

export default Muibutton;