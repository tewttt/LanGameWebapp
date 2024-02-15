import React, {useContext, useEffect, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {storage} from "../../firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes,  getDownloadURL } from "firebase/storage";
import backImage from '../../assets/logo/backgroundSmall.png'
const auth = getAuth();
const initialState = {
    name: "",
    phone:"",
    photo: ""
}
const ProfilePage = () => {
    const ctx = useContext(UserContext)
    const [state, setState] = useState(initialState);
    const [photo, setPhoto] = useState("")
    const [pedit, setEdit] = useState(false);
    const id = state?.id
    const authId = auth.currentUser?.uid
//    console.log(state)
    useEffect(() => {
        const data = ctx.userList.find(
            // item => console.log(item)
            item => item.authId === authId
        )
        setState(data)
    },[ctx?.userList])  
    
  
    const editPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
        // uploadImage();
    }
    const changePhoto = (e) => {
      setPhoto(e.target.files[0])
    };
    const changeName = (e) => {
        setState({...state, name: e.target.value})
    }
    const changePhone = (e) => {
        setState({...state, phone: e.target.value});
    }
    const changeGender = (e) => {
        setState({...state, gender: e.target.value});
    }
    const changeAge = (e) => {
        setState({...state, age: e.target.value});
    }
    const edit = () =>{
        setEdit(true)
    }
   
    const save = () => {
        // uploadImage()
        console.log(state)
        ctx.setProfile(state, id)
        setEdit(false)
    }
   
    
    const uploadImage = () =>{
        if (photo === null) return;
        const imageRef = ref(storage, `profiles/${photo.name}`);
        uploadBytes(imageRef, photo).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setPhoto(url)
                setState({...state, photo: url});
            })
        })
        alert("photo amjilttai") 
    }

    return (
        <div className="relative text-helpGray bg-baseBlack h-screen">
            <ToolSidebar/>
            <div 
                className="bg-cover absolute top-0 left-0 -z-20 opacity-80 w-screen h-screen"
                style={{backgroundImage: `url(${backImage})`}}>
            </div>
            {pedit ? ( 
                // edit 
            <div className="flex flex-col items-center pb-10 md:pt-20 px-6 pt-4">
                {state?.photo ? (
                    <img src={state.photo} className="w-[150px] h-[150px] rounded-[18px] border border-baseBlack"/>
                ) : (
                    <img src={photo} className="w-[150px] h-[150px] rounded-[18px] border border-baseBlack"/>
                )}
             
                <div className="flex items-center justify-center ">
                    <input onChange={changePhoto} 
                        className="w-[150px] h-[40px] text-[10px] p-2" 
                        required type="file" 
                        // hidden="hidden"  
                        id="imageInput" />
                
                    <Tooltip title="Save" placement="bottom">
                        <IconButton  onClick={uploadImage}>
                                <SaveIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                </div>
        
                <div className="bg-helpGray rounded-2xl w-[340px] p-4 flex flex-col justify-center items-center mt-4" >
                    <div className="flex w-full border border-baseBlack rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>User ID </p>
                        <p className="font-bold">{state?.userID}</p>
                    </div>
                    
                    <div  className="flex items-center w-full border border-baseBlack rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>Email</p>
                        <input className="p-2 rounded-2xl" value={state?.email} onChange={(e) =>setState({...state, email:e.target.value}) }/>
                    </div>
                    
                    <div  className="flex w-full items-center border border-baseBlack rounded-2xl py-2 px-4 my-1 justify-between" >
                        <div>Name</div>
                        <input className="p-2 rounded-2xl" placeholder="name" value={state.name} 
                        onChange={changeName}/>
                    </div>
                    <div className="flex items-center w-full border border-baseBlack rounded-2xl py-2 px-4 my-1 justify-between">
                        <div>Phone</div>
                        <input className="p-2 rounded-2xl" placeholder="утас" value={state.phone} onChange={changePhone}></input>
                    </div>
                    
                    <div className="flex w-full items-center border border-baseBlack rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>Gender</p>
                        <select 
                            onChange={changeGender}
                            className="p-2 rounded-2xl w-[200px]">
                            <option>{state.gender}</option>
                            <option>All</option>
                            <option>Men</option>
                            <option>Women</option>
                        
                        </select>
                    </div>

                    <div className="flex items-center w-full border border-baseBlack rounded-2xl py-2 px-4 my-1 justify-between">
                        <div>Age</div>
                        <input className="p-2 rounded-2xl" placeholder="age" value={state.age} type="number" 
                        onChange={changeAge}></input>
                    </div>
                    

                    <div className="flex text-white">                                                        
                        <button className="w-[100px] bg-green-500 hover:bg-green-600 py-2 px-4 m-3 rounded-2xl font-bold" onClick={() => {setEdit(false)}}>Болих</button>
                        <button className="w-[100px] bg-baseBlue1 hover:bg-blue-700 py-2 px-4 m-3 rounded-2xl font-bold" onClick={save}>Хадгалах</button>
                    </div>
                    
                </div>
            </div>
            ) : (
            <div className="flex flex-col relative text-helpGray items-center pt-20 md:pt-34 h-full px-6">
                <p className="absolute top-10 left-10 md:top-36 md:hidden font-bold text-xl">Profile</p>
                <p className="hidden md:flex font-bold text-xl mb-6">Profile</p>
                <img src={state?.photo} className="w-[100px] h-[100px] rounded-[18px]"/>
                <div className="w-[340px] p-2 flex flex-col justify-center items-center mt-4" >
                    <div className="flex w-full border border-helpGray rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>User ID </p>
                        <p className="font-bold">{state?.userID}</p>
                    </div>
                    <div className="flex w-full border border-helpGray rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>Email</p>
                        <p className="font-bold"> {state?.email}</p>
                    </div>
                    
                    <div className="flex w-full border border-helpGray rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>Name</p>
                        <p className="font-bold">{state?.name}</p>   
                    </div>

                    <div className="flex w-full border border-helpGray rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>Phone</p>
                        <p className="font-bold">{state?.phone}</p>
                    </div>
                    <div className="flex w-full border border-helpGray rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>Age</p>
                        <p className="font-bold">{state?.age}</p>
                    </div>
                    <div className="flex w-full border border-helpGray rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>Gender</p>
                        <p className="font-bold">{state?.gender}</p>
                    </div>

                    <div onClick={edit} className="flex w-full bg-baseBlue1 rounded-2xl py-2 px-4 my-1 justify-center" >
                        <p>Edit profile</p>
                        {/* <Tooltip title="Edit" placement="bottom">
                                <IconButton >
                                    <EditIcon  className="text-white"/>
                                </IconButton>
                        </Tooltip>   */}
                    </div>
                </div>
            </div>
            )}
        </div>
)}

export default ProfilePage;