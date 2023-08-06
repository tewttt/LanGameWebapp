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
    // photo: ""
}

const ProfilePage = () => {
    const [state, setState] = useState(initialState)
    const [photo, setPhoto] = useState("");

    const ctx = useContext(UserContext)
    
    const authId = auth.currentUser.uid
   
    const profile = ctx.userList.find(
        // item => console.log(item.authId)
        item => item.authId === authId
    )
    
    const id = profile.id
    // console.log(id)
    // console.log(profile.id)
   

    const editPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
        // uploadImage();
    }
    const changePhoto = (e) => {
        // setState({...state, photo: e.target.files[0]})
      setPhoto(e.target.files[0])
    };
    const changeName = (e) => {
        setState({...state, name: e.target.value})
    }
    const changePhone = (e) => {
        setState({...state, phone: e.target.value})
    }
    const edit = () =>{
        ctx.updateProfile(id)
    }
  const save = () => {
    ctx.setProfile(state, id)
  }
    
            const uploadImage = () =>{
                if (photo == null) return;
                // const imageRef = ref(storage, `images/${photo.name + v4()}`);
                const imageRef = ref(storage, `profiles/${photo.name}`);
                uploadBytes(imageRef, photo).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        // setState({...state, photo: url})
                        setPhoto(url)
                        ctx.profilePhoto(url)
                        
                    })
                    
                })
                alert("photo amjilttai") 
            }
    return (
        <div>
            <ToolSidebar/>
            <div className="flex flex-col text-white justify-center items-center ">
                <div className="flex flex-col ">
                    <img src={profile.photo} className="w-[150px] h-[150px] rounded-[18px]"/>
                    <input onChange={changePhoto} 
                    className="w-[100px] h-[40px] text-[10px]"
                            required type="file" 
                            // hidden="hidden"  
                            id="imageInput" />
                            
                    <div >
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
           
                <div className="bg-[#383030] text-gray-300 text-[12px] w-[300px] h-[300px] flex flex-col justify-center items-center mt-10" >
                    <div className="flex flex-col justify-start mb-5">
                        <p>Хэрэглэгчийн ID: {profile.id}</p>
                        <p>AUTH ID: {profile.authId}</p>
                        <p>Email: {profile.email}</p>
                    </div>
                    
                    <div className="flex m-2 justify-between">
                        <div>Нэр:</div>
                        <input className="w-[150px] h-[20px] text-[12px]" placeholder="hjhj" value={profile.name} onChange={changeName}/>
                    </div>
                    <div className="flex m-2 justify-between w-[250px] ">
                        <div>Дугаар:</div>
                        <input className="w-[150px] h-[20px] text-[12px]" placeholder={profile.phone} onChange={changePhone}></input>
                    </div>

                    <div className="flex">
                    <button className="w-[100px] h-[30px] flex justify-center items-center text-[12px] bg-red-500" onClick={edit}>ЗАСАХ</button>
                    <button className="w-[100px] h-[30px] flex justify-center items-center text-[12px] bg-blue-500" onClick={save}>ХАДГАЛАХ</button>
                    </div>
                    
                
                
                    
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;