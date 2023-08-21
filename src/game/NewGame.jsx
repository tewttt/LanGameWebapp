import React from "react";
import ToolSidebar from "../components/ToolSidebar";
import Head from "./Head";
import Body from "./Body";
import Footer from "./Footer";
const NewGame = () => {
    return (
        <div>
            <ToolSidebar/>
            <div className="text-white bg-green-600 max-w-[400px] h-[700px] m-auto">
                <Head/>
                <Body/>
                <Footer/>
            </div>
        </div>
    )
}

export default NewGame;