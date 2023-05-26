import React, {useContext} from "react";
import css from "./style.module.css";
import UserContext from "../../context/UserContext";


const Users = () => {
    const ctx = useContext(UserContext)
    // console.log(ctx.userList)
    return (
        <div style={{color: "white"}}> customers
        
        {Object(ctx.userList).map(el => (
            // console.log(el)
            <div key={el.id} >
               <div >
                email: {el.email}
                userId: {el.id}
                phone: {el.phone}
                
                <img src={el.photo} />
                </div>
            </div>
        ))}

           
          
        </div>
    )
}
export default Users;