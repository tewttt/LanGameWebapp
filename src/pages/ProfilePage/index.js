import React, {useContext, useState} from "react";
import css from "./style.module.css";
import ToolSidebar from "../../components/ToolSidebar";
import profile from "../../assets/img/1.jpg";
import UserContext from "../../context/UserContext";
import {getAuth} from "firebase/auth";
import { Photo } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
// import Button from "../../components/Button"
import {storage, db} from "../../firebase"
import {Button} from "@mui/material";
import { ref, uploadBytes,  getDownloadURL, uploadBytesResumable, } from "firebase/storage";


const auth = getAuth();
const initialState = {
    name: "",
    phone:"",
    photo: ""
}

const ProfilePage = () => {
    const [state, setState] = useState(initialState)

    const ctx = useContext(UserContext)
    
    const authId = auth.currentUser.uid
   
    const profile = ctx.userList.find(
        // item => console.log(item.authId)
        item => item.authId === authId
    )
    const id= profile.id
   console.log(profile)
    
   

    const editPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
        
    }
    const changePhoto = (e) => {
        setState({...state, photo: e.target.files[0]})
      
    };
    const changeName = (e) => {
        setState({...state, name: e.target.value})
    }
    const changePhone = (e) => {
        setState({...state, phone: e.target.value})
    }
  const save = () => {
    ctx.setProfile(state, id)
  }
    
            const uploadImage = () =>{
                if (state.photo == null) return;
                // const imageRef = ref(storage, `images/${photo.name + v4()}`);
                const imageRef = ref(storage, `profiles/${state.photo.name}`);
                uploadBytes(imageRef, state.photo).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setState({...state, photo: url})
                     
                        // ctx.profilePhoto(url)
                        
                    })
                   
                })
                alert("photo amjilttai") 
            }
    return (
        <div className={css.head}>
            <ToolSidebar/>
            <div className={css.body}>
                <div className={css.profile}>
                    <img src={profile.photo} className={css.zur}/>
                    <div style={{display: "flex"}}>
                        <input onChange={changePhoto} 
                            required type="file" 
                            // hidden="hidden"  
                            id="imageInput" />
                    
                        <Tooltip title="Edit" placement="bottom">
                            <IconButton onClick={editPicture} >
                                <EditIcon color="primary"/>
                            </IconButton>
                        
                        </Tooltip>
                        <Tooltip title="Save" placement="bottom">
                            <IconButton  onClick={uploadImage}>
                                    <SaveIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className={css.text}>
                <p>Хэрэглэгчийн ID: {profile.id}</p>
                <p>AUTH ID: {profile.authId}</p>
                <div >
                    <div className={css.t1}>Нэр:<input placeholder={profile.name}  onChange={changeName}/></div>
                   <div className={css.t1}>Дугаар: <input placeholder={profile.phone} onChange={changePhone}></input></div>
                   
                 </div>
                 <Button onClick={save}>Хадгалах</Button>
                
               
               
                
            </div>
        </div>
    )
}

export default ProfilePage;