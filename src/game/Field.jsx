import React, {useState} from "react";
import Box from "./Box";

const Field = () => {
    const [field, setField] = useState(Array(60).fill(null))
    return (
        <div className=" grid grid-cols-5 w-[300px] pl-3 ml-2">
            {field.map((value) => {
                return <Box />
            })}
        </div>
    )
}
export default Field;