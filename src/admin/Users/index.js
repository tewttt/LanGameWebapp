import React, {useContext} from "react";
import css from "./style.module.css";
import UserContext from "../../context/UserContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";


const Users = () => {
    const ctx = useContext(UserContext)
    const remove =  () => {
        // const id = props.lesson.id;
        // ctx.deleteDB(id)
      
    }
   

    const view = () => {
        // history.push(`/lesson/${props.lesson.id}`)
    }

   const edit = () => {
    // history.push(`/edit/${props.lesson.id}` )
   }
    // console.log(ctx.userList)
    return (
        <div className="text-white text-[12px] flex flex-col justify-center items-center m-2">
        
        {Object(ctx.userList).map(el => (
            // console.log(el)
            <div key={el.id} className="border border-gray-400 rounded-[6px] w-full h-[30px] m-1 flex justify-between items-center sm:w-[500px] lg:w-[800px]" >
                <img src={el.photo} className="w-[25px] h-[25px]"/>
                <div className="mx-1">{el.email}</div>
                <div className="mx-1">Id:{el.id}</div>
                <div className="mx-1">{el.phone}</div>
                <IconButton onClick={edit} >
                    <EditIcon color="primary"/>
                </IconButton>
                <IconButton onClick={remove}>
                    <DeleteIcon color="primary"/>
                </IconButton>
            </div>
        ))}

           
          
        </div>
    )
}
export default Users;