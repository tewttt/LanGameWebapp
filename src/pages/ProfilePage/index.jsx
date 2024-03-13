import React, {useContext, useEffect, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import {  useHistory } from "react-router-dom";
import SaveIcon from '@mui/icons-material/Save';
import {storage} from "../../firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes,  getDownloadURL } from "firebase/storage";
import pattern from '../../assets/logo/patternWhite.png'
import { IoIosArrowBack ,IoIosSettings  } from "react-icons/io";

const auth = getAuth();
const initialState = {
    name: "",
    phone:"",
    photo: ""
}
const ProfilePage = () => {
    const history = useHistory();
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
        // console.log(state)
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
        <div className="flex flex-col relative text-helpGray bg-baseBlack px-6 pt-6 md:pt-0 pb-36">
            <div 
                className="bg-cover bg-center opacity-10 absolute top-0 left-0 bg-repeat w-screen h-full"
                style={{backgroundImage: `url(${pattern})`}}>
            </div>
            <div className="z-30"> <ToolSidebar/> </div>
            
            {pedit ? ( 
                // edit 
            <div className="z-20 flex flex-col items-center md:pt-20">
                <div className="flex py-2 justify-between pb-4 w-full">
                    <div className="flex items-center">
                        <IoIosArrowBack size={20} onClick={() => history.push("/")}/>
                        <p>Profile</p>
                    </div>
                    <IoIosSettings onClick={() => history.push("/settings")} size={20}/>
                </div>
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
        
                <div className=" rounded-2xl w-full md:w-1/2 flex flex-col justify-center items-center mt-4" >
                    <div className="flex w-full border rounded-2xl py-2 px-4 my-1 justify-between">
                        <p>User ID </p>
                        <p className="font-bold">{state?.userID}</p>
                    </div>
                    
                    <div  className="flex items-center w-full rounded-2xl py-2 pl-4 my-1 justify-between">
                        <p>Email</p>
                        <input className="w-3/4 p-2 text-baseBlack rounded-2xl" value={state?.email} onChange={(e) =>setState({...state, email:e.target.value}) }/>
                    </div>
                    
                    <div  className="flex items-center w-full rounded-2xl py-2 pl-4 my-1 justify-between" >
                        <div>Name</div>
                        <input className="w-3/4 p-2 text-baseBlack rounded-2xl" placeholder="name" value={state.name} 
                        onChange={changeName}/>
                    </div>
                    <div className="flex items-center w-full rounded-2xl py-2 pl-4 my-1 justify-between">
                        <div>Phone</div>
                        <input className="w-3/4 p-2 text-baseBlack rounded-2xl" placeholder="утас" value={state.phone} onChange={changePhone}></input>
                    </div>
                    
                    <div className="flex items-center w-full rounded-2xl py-2 pl-4 my-1 justify-between">
                        <p>Gender</p>
                        <select 
                            onChange={changeGender}
                            className="w-3/4 p-2 text-baseBlack rounded-2xl">
                            <option>{state.gender}</option>
                            <option>All</option>
                            <option>Men</option>
                            <option>Women</option>
                        
                        </select>
                    </div>

                    <div className="flex items-center w-full rounded-2xl py-2 pl-4 my-1 justify-between">
                        <div>Age</div>
                        <input className="w-3/4 p-2 text-baseBlack rounded-2xl" placeholder="age" value={state.age} type="number" 
                        onChange={changeAge}></input>
                    </div>
                    

                    <div className="flex text-white">                                                        
                        <button className="w-[100px] bg-green-500 hover:bg-green-600 py-2 px-4 m-3 rounded-2xl font-bold" onClick={() => {setEdit(false)}}>Болих</button>
                        <button className="w-[100px] bg-baseBlue1 hover:bg-blue-700 py-2 px-4 m-3 rounded-2xl font-bold" onClick={save}>Хадгалах</button>
                    </div>
                    
                </div>
            </div>
            ) : (
            <div className="z-20 flex flex-col items-center md:pt-20">
                 <div className="flex py-2 justify-between pb-4 w-full">
                    <div className="flex items-center">
                        <IoIosArrowBack size={20} onClick={() => history.push("/")}/>
                        <p>Profile</p>
                    </div>
                    <IoIosSettings onClick={() => history.push("/settings")} size={20}/>
                </div>
              
              
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
                    <button
                        onClick={() => history.push("/verification")} 
                        className="bg-helpGreen p-2 font-bold text-black rounded-2xl my-2">Verification phone number</button>
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