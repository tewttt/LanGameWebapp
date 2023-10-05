import React from "react";
import css from "./style.module.css";

const Spinner = () => {
    return (
        <div className="flex bg-baseColor h-[200px] w-[300px]">
            <div className={css.loader}> </div>
            {/* <div className="flex text-sm w-full h-1 bg-red-200 ">Waiting for other players... 30sec</div> */}
           
        </div>
    )
}
export default Spinner; 