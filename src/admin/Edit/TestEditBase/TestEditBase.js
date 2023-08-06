import React, { useState } from "react";

const TestEdit = () => {
    const [test, setTest]= useState("")
    return(
        <div>
            <p>test</p>
            <div >
           
                <input onChange={(e)=> setTest(e.target.value)} required type="number" name="Хичээлийн үнэ" placeholder="Хичээлийн үнэ"/>
            </div>   
            <input placeholder="test"/>
            <input style={{height: 150}}
            multline
            numberOfLines={10}
            placeholder="text"
            required
            // onChange={changeText}
        />
        </div>
    )
}

export default TestEdit;