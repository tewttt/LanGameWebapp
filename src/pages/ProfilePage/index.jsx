import React, {useContext, useEffect, useState} from "react";
import ToolSidebar from "../../components/ToolSidebar";
import UserContext from "../../context/UserContext";
import { useHistory, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {storage, db} from "../../firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes,  getDownloadURL, uploadBytesResumable, } from "firebase/storage";

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
        // const imageRef = ref(storage, `images/${photo.name + v4()}`);
        const imageRef = ref(storage, `profiles/${photo.name}`);
        uploadBytes(imageRef, photo).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setPhoto(url)
                setState({...state, photo: url});
                // save();
            })
        })
        alert("photo amjilttai") 
    }

    return (
        <div>
            <ToolSidebar/>
           
                {pedit ? ( 
                    // edit 
                <div className="flex flex-col justify-center items-center m-auto pt-20">
                    {state?.photo ? (
                        <img src={state.photo} className="w-[150px] h-[150px] rounded-[18px] border mt-65"/>
                    ) : (
                        <img src={photo} className="w-[150px] h-[150px] rounded-[18px] border mt-25"/>
                    )}
                 {/* <img src={state?.photo} className="w-[150px] h-[150px] rounded-[18px] border mt-65"/> */}
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
            
                    <div className="bg-[#383030] text-gray-300 text-[12px] w-[300px] h-[300px] flex flex-col justify-center items-center mt-10" >
                        <div className="flex flex-col justify-start mb-5">
                            <p>Хэрэглэгчийн ID: {state?.userID}</p>
                            {/* <p>AUTH ID: {state?.authId}</p> */}
                            
                        </div>
                        <div className="flex justify-between w-[200px] h-[30px] items-center my-3">
                            <p>Email: </p>
                            
                            <input className="text-black h-[20px] mr-0 w-[150px]" value={state?.email} onChange={(e) =>setState({...state, email:e.target.value}) }/>
                        </div>
                        
                        <div className="flex justify-between w-[200px] h-[30px] items-center my-3 " >
                            <div>Нэр:</div>
                        
                            <input className="text-black h-[20px] mr-0 w-[150px]" placeholder="hjhj" value={state.name} 
                        
                            onChange={changeName}/>
                        </div>
                        <div className="flex justify-between w-[200px] h-[30px] items-center my-3 ">
                            <div>Дугаар:</div>
                            <input className="text-black h-[20px] mr-0 w-[150px]" placeholder="утас" value={state.phone} onChange={changePhone}></input>
                        </div>

                        <div className="flex">                                                        
                        <button className="w-[100px] h-[30px] flex justify-center items-center text-[12px] bg-red-500 mx-5 rounded-2xl" onClick={() => {setEdit(false)}}>Болих</button>
                        <button className="w-[100px] h-[30px] flex justify-center items-center text-[12px] bg-blue-500 mx-5 rounded-2xl" onClick={save}>ХАДГАЛАХ</button>
                        </div>
                        
                    </div>
                </div>
                ) : (
                <div className="flex flex-col text-white justify-center items-center m-auto pt-20">
                    <div>
                        <img src={state?.photo} className="w-[150px] h-[150px] rounded-[18px] bg-baseColor"/>
                    </div>
            
                    <div className="bg-baseColor text-gray-300 text-[12px] w-[300px] h-[300px] flex flex-col justify-center items-center mt-10" >
                        <div className="flex flex-col justify-start mb-5">
                            <p>Хэрэглэгчийн ID: {state?.userID}</p>
                            {/* <p>AUTH ID: {state?.authId}</p> */}
                            <p>Email: {state?.email}</p>
                        </div>
                        
                        <div className="flex m-2 justify-start">
                            <div>Нэр:</div>
                            <div>{state?.name}</div>   
                        </div>

                        <div className="flex m-2 justify-start ">
                            <div>Дугаар:</div>
                            <div>{state?.phone}</div>
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
                </div>
                )}
           
        </div>
)}

export default ProfilePage;