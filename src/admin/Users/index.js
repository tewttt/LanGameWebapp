import React, {useContext} from "react";
import UserContext from "../../context/UserContext";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"

const Users = () => {
    const ctx = useContext(UserContext) 
    // console.log(ctx.userList.id)
    const remove =  () => {
        alert("deeeleete")
    //    ctx.deleteUser(id)
    }
    const view = () => {
        // history.push(`/lesson/${props.lesson.id}`)
    }
    const edit = () => {
    // history.push(`/edit/${props.lesson.id}` )
   }
    // console.log(ctx.userList)
    return (
        <div className="text-white my-1 text-[12px] grid  lg:grid-cols-3 xl:grid-cols-5">
            {Object(ctx.userList).map(el => (
                // console.log(el.id)
                <div key={el.id} className="border border-gray-500 rounded-[6px] w-full md:w-[450px]  h-[30px] m-1 flex justify-between items-center " >
                    <img src={el.photo} className="w-[25px] h-[25px]"/>
                    <div className="mx-1">{el.email}</div>
                    <div className="mx-1">user id:{el.id}</div>
                    <div className="mx-1">{el.phone}</div>
                   
                    <AiFillDelete size={20} className="hover:text-baseBlue hover:rotate-12" onClick={remove} />
                    <AiFillEdit  size={20} className="hover:text-baseBlue  hover:scale-125" onClick={edit}/>
                   
                </div>
            ))}
        </div>
)}
export default Users;