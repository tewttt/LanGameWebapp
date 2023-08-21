import React from "react";
import ToolSidebar from "../components/ToolSidebar";
import { useHistory } from "react-router-dom";

const Game = () => {
    const history = useHistory();
    const newGame = () => {
        history.push("/newGame")
    }
    return (
        <div>
            <ToolSidebar/>
            <div className="text-white border border-baseBlue max-w-[400px] h-[700px] m-auto flex justify-center items-center " >
                <button onClick={newGame} className="p-2 border border-baseBlue text-white hover:bg-baseBlue ">New Game</button>
            </div>
        </div>
    )
}

export default Game;