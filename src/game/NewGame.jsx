import React , {useState} from "react";
import ToolSidebar from "../components/ToolSidebar";
import Head from "./Head";
import Body from "./Body";
import Footer from "./Footer";
import Spinner from "../components/General/Spinner";
   

const NewGame = () => {
    const [loader, setLoader] = useState(false)
    return (
        <div className="flex flex-col justify-center text-white">
            <ToolSidebar/>
            <div className="flex flex-col  relative  bg-green-600  max-w-[400px] h-[620px] mt-16 m-auto justify-around items-center">
                {loader && 
                    <div className="absolute bg-baseColor">
                        <Spinner/>
                        <div className="text-sm w-full text-center">Waiting for other players... 30sec</div>
                    </div>
                }
                <Head/>
                <Body/>
                <Footer/>
            </div>
        </div>
    )
}

export default NewGame;