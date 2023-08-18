import React from "react";
import ToolSidebar from "../components/ToolSidebar";
import Head from "./Head";
import Body from "./Body";
import Footer from "./Footer";
import Box from "./Box";

const Game = () => {
    return (
        <div className="text-white bg-green-600 max-w-[400px] h-[700px] m-auto">
            <ToolSidebar/>
            <Head/>
            <Body/>
            <Footer/>
        </div>
    )
}

export default Game;