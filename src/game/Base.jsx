import React from "react";
import Head from "./Head";
import Footer from "./Footer";
import Body from "./Body";
import { BatterySaver } from "@mui/icons-material";

const Base = () => {
    return (
        <div className="max-w-[400px] h-[660px] bg-green-700 flex flex-col m-auto ">
            <Head/>
            <Body/>
            <Footer/>
        </div>
    )
}

export default Base;