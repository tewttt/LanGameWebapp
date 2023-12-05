import React from "react"
import useLesson from "../../hook/useLesson"
import moment from "moment"


export default function Teacher () {
   const {teachers, changeMessage} = useLesson()
//    console.log(teachers)
   
    return (
        <div className="text-white">
            {teachers.map((e, i) => {
                // console.log(e)
                return (
                <div>
                    <div className="border border-gray-400 m-3">
                        <p>Name: {e.userName}</p>
                        <p>Email: {e.userEmail}</p>
                        <p>Phone: {e.userPhone}</p>
                        <p>User ID : {e.userId}</p>
                        <p>message {e.message}</p>
                        <button onClick={() => changeMessage("accept", e.id)} className="bg-green-500 p-2 mx-2" >Accept</button>
                        <button onClick={() => changeMessage("denied", e.id)} className="bg-red-500 p-2 mx-2">Denied</button>
                    </div>
                    <div className="border border-gray-400 m-3">
                        <p>{moment(e.createDate.toDate()).calendar()}</p>
                        <p>language: {e.data.language}</p>
                        <p>experience: {e.data.experience}</p>
                    </div>
                </div>
                )
            })}
           
        </div>
    )
}