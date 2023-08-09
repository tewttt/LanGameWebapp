import React, {useContext, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import {getAuth} from "firebase/auth";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {storage, db} from "../../firebase"
import { ref, uploadBytes,  getDownloadURL, uploadBytesResumable, } from "firebase/storage";

const auth = getAuth();
const initialState = {
    name: "",
    phone:"",
    photo: ""
}

const ProfilePage = () => {
    const [state, setState] = useState(initialState)
    const[pedit, setEdit] = useState(false);
    const ctx = useContext(UserContext)
    const authId = auth.currentUser.uid
    const profile = ctx.userList.find(
        // item => console.log(item.authId)
        item => item.authId === authId
    )
    const id = profile.id
        // console.log(profile.name)
    const editPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
        // uploadImage();
    }
    const changePhoto = (e) => {
      setState({...state, photo: e.target.files[0]})
    };
    const changeName = (e) => {
        setState({...state, name: e.target.value})
    }
    const changePhone = (e) => {
        setState({...state, phone: e.target.value});
       
    }
    const edit = () =>{
        setEdit(true)
        // ctx.updateProfile(id)
    }
   
    const save = () => {
        ctx.setProfile(state, id)
        setEdit(false)
    }
    
    const uploadImage = () =>{
        if (state.photo === null) return;
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
        <div>
            <ToolSidebar/>
            {pedit ? (
            <div className="flex flex-col text-white justify-center items-center ">
                {state.photo ? (
                    <img src={state.photo} className="w-[150px] h-[150px] rounded-[18px] border mt-5"/>
                ) : (
                    <img src={profile.photo} className="w-[150px] h-[150px] rounded-[18px] border mt-5"/>
                )}
               
                <div className="flex ">
                    <input onChange={changePhoto} 
                        className="w-[150px] h-[40px] text-[10px]"
                        required type="file" 
                        // hidden="hidden"  
                        id="imageInput" />
                   
                        <Tooltip title="Save" placement="bottom">
                            <IconButton  onClick={uploadImage}>
                                    <SaveIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                </div>
           
                <div className="bg-[#383030] text-gray-300 text-[12px] w-[300px] h-[300px] flex flex-col justify-center items-center mt-10" >
                    <div className="flex flex-col justify-start mb-5">
                        <p>Хэрэглэгчийн ID: {profile.id}</p>
                        <p>AUTH ID: {profile.authId}</p>
                        
                    </div>
                    <div className="flex justify-between w-[200px] h-[30px] items-center my-3">
                        <p>Email: </p>
                        
                        <input className="text-black h-[20px] mr-0 w-[150px]" defaultValue={profile.email} onChange={(e) =>setState({...state, email:e.target.value}) }/>
                    </div>
                    
                    <div className="flex justify-between w-[200px] h-[30px] items-center my-3 " >
                        <div>Нэр:</div>
                       
                        <input className="text-black h-[20px] mr-0 w-[150px]" placeholder="hjhj" defaultValue={profile.name} 
                      
                        onChange={changeName}/>
                    </div>
                    <div className="flex justify-between w-[200px] h-[30px] items-center my-3 ">
                        <div>Дугаар:</div>
                        <input className="text-black h-[20px] mr-0 w-[150px]" placeholder="утас" defaultValue={profile.phone} onChange={changePhone}></input>
                    </div>

                    <div className="flex">                                                        
                    <button className="w-[100px] h-[30px] flex justify-center items-center text-[12px] bg-red-500" onClick={() => {setEdit(false)}}>Болих</button>
                    <button className="w-[100px] h-[30px] flex justify-center items-center text-[12px] bg-blue-500" onClick={save}>ХАДГАЛАХ</button>
                    </div>
                    
                </div>
            </div>
            ) : (
            <div className="flex flex-col text-white justify-center items-center border border-blue-400 w-[350px] h-[600px] m-auto my-5 rounded-[10px]">
                <div className="flex flex-col ">
                    <img src={profile.photo} className="w-[150px] h-[150px] rounded-[18px]"/>
                </div>
           
                <div className="bg-[#383030] text-gray-300 text-[12px] w-[300px] h-[300px] flex flex-col justify-center items-center mt-10" >
                    <div className="flex flex-col justify-start mb-5">
                        <p>Хэрэглэгчийн ID: {profile.id}</p>
                        <p>AUTH ID: {profile.authId}</p>
                        <p>Email: {profile.email}</p>
                    </div>
                    
                    <div className="flex m-2 justify-start">
                        <div>Нэр:</div>
                        <div>{profile.name}</div>   
                    </div>

                    <div className="flex m-2 justify-start ">
                        <div>Дугаар:</div>
                        <div>{profile.phone}</div>
                    </div>

                    <div className="flex">
                    <Tooltip title="Edit" placement="bottom">
                            <IconButton onClick={edit} >
                                <EditIcon color="primary"/>
                            </IconButton>
                    </Tooltip>
                    {/* <button className="w-[100px] h-[30px] flex justify-center items-center text-[12px] bg-red-500" onClick={edit}>ЗАСАХ</button> */}
                    {/* <button className="w-[100px] h-[30px] flex justify-center items-center text-[12px] bg-blue-500" onClick={save}>ХАДГАЛАХ</button> */}
                    </div>
                    
                </div>
            </div>)}
            
          
        </div>
    )
}

export default ProfilePage;