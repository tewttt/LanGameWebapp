import React, {useState, useContext, useEffect} from "react";
import css from "./style.module.css";
import Button from "../../../components/Button";
import SendLessonContext from "../../../context/sendLessonContext";
import Modal from "../../../components/General/Modal";
import { useHistory } from "react-router-dom";
import {DefaultPlayer as Video} from "react-html5video";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { storage, db } from "../../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import { v4 } from "uuid";
import {doc, onSnapshot,collection, setDoc} from "firebase/firestore";




const AddLesson = () => {
    const SendLessonCtx = useContext(SendLessonContext);

    
    const history = useHistory();
    const [confirm , setConfirm] = useState(false);
    const [addlesson, setAddLesson] = useState(
        {
        language: "",
        level: "",
        lessonNumber: "",
        lessonName: "", 
        grammar: "",
        newWord: "",
        video: "",
        photo: ""
      
    });
    const [video, setVideo] = useState("");
    const [photo, setPhoto] = useState("");
    const [fetchData, SetFetchData] = useState([])
    
    // console.log(fetchData)
    // useEffect(() => {
    //     onSnapshot(collection(db, "addlesson"), (snapshot) => {
    //         SetFetchData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    //     })
    // }, [])


    //    useEffect(() => {
      
    //         db.collection("addlesson").onSnapshot(snapshot => {
    //             setState(...state, snapshot.docs.map(doc => ({
    //                 id:doc.id,
    //                 lesson:doc.data().lesson
    //             })))
    //         })
    //     }, []);



//    useEffect (() => {
//     const uploadFile = () => {
//         const name = new Date().getTime() + photo.name
//         const storageRef = ref(storage, photo.name)
//         const uploadTask = uploadBytesResumable(storageRef, photo);

//         uploadTask.on('state_changed', 
//         (snapshot) => {
           
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             switch (snapshot.state) {
//             case 'paused':
//                 console.log('Upload is paused');
//                 break;
//             case 'running':
//                 console.log('Upload is running');
//                 break;
//             }
//         }, 
//         (error) => {
//            console.log(error)
//         }, 
//         () => {
           
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 // setPhoto(downloadURL)
//           setPhoto((prev) => [{...prev, photo: downloadURL}])
//             });
//         }
//         );
//     };
//     photo && uploadFile();
//    }, [photo]);
       


//    useEffect ( () => {
//         const uploadFile = () =>{
//             if (photo == null) return;
//             const imageRef = ref(storage, `images/${photo.name + v4()}`);
//             uploadBytes(imageRef, photo).then((snapshot) => {
//                 getDownloadURL(snapshot.ref).then((url) => {
//                     setPhoto(url)
//                     // setPhotoList((prev) => [...prev, url])
//                 })
            
//             })
//             alert("photo amjilttai")
//         };
//         photo && uploadFile();
//    }, [photo])


        const uploadImage = () =>{
            if (photo == null) return;
            const imageRef = ref(storage, `images/${photo.name + v4()}`);
            uploadBytes(imageRef, photo).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setPhoto(url)
                    // setPhotoList((prev) => [...prev, url])
                })
               
            })
            alert("photo amjilttai")
        }

        const editPicture = () => {
            const fileInput = document.getElementById("imageInput");
            fileInput.click();
        }
        // const changePhoto = (e) => {
        //     const image = e.target.files[0];
        //     setPhoto(image)
        // };



        // const uploadToDatabase = (url) => {
        //     let docData = {

        //     }
        // }

        // const uploadVideo = () => {
        //     if (video === null) return;
        //     const videoRef = ref(storage, `videos/${video.name}`)
        //     const uploadTask = uploadBytesResumable(videoRef, video)

        //     uploadTask.on("state_changed" , (snapshot) => {
        //         let progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
        //         // progress = Math.trunc(progress)
        //         console.log(progress)
        //     }, (error) => {
        //         console.log("error : ")
        //     }, () => {
        //         console.log("success")
        //         getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        //             uploadToDatabase(downloadURL)
        //             console.log(downloadURL)
        //         })
        //     })
        // }

        const uploadVideo = () =>{
            if (video == null) return;
            const videoRef = ref(storage, `videos/${video.name + v4()}`);
            uploadBytes(videoRef, video).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setVideo(url)
                    // setPhotoList((prev) => [...prev, url])
                })
               
            })
            alert("video amjilttai")
        }

        const editVideo = () => {
            const fileInput = document.getElementById("videoInput");
            fileInput.click();
        };
        // const changeVideo = (e) => {
        //     const video = e.target.files[0];
        //     setVideo(video)
        // }

   const showConfirm = () => {
    setConfirm(true)
   };
   const closeConfirm = () => {
    setConfirm(false)
   };

   const changeVideo = (e) => {
    setAddLesson({...addlesson, video: e.target.files[0]})
}
const changePhoto = (e) => {
    setAddLesson({...addlesson, photo: e.target.files[0]})
}



    const changeLanguage = (e) => {
        setAddLesson({ ...addlesson, language: e.target.value});
    };
    const changeLevel = (e) => {
        setAddLesson({ ...addlesson, level: e.target.value});
    };
    const changeLessonNumber = (e) => {
        setAddLesson({ ...addlesson, lessonNumber: e.target.value});
    };
    const changeName = (e) => {
        setAddLesson({ ...addlesson, name: e.target.value});
    };
   
   
 
   
   
    const changeGrammar = (e) => {
        setAddLesson({ ...addlesson, grammar: e.target.value});
    };
    const changeNewWord = (e) => {
        setAddLesson({ ...addlesson, newWord: e.target.value});
    }
   
    const save = () => {
        const base = {
                    language: addlesson.language,
                    level: addlesson.level,
                    lessonNumber: addlesson.lessonNumber,
                    name: addlesson.name,
                    video,
                    photo,
                    grammar: addlesson.grammar,
                    newWord: addlesson.newWord,
          
        };
        alert("Үндсэн мэдээллийн хэсгийг амжилттай хадгаллаа"); 
        SendLessonCtx.saveBase(base);
       
        history.push("/dashboard/addlesson/translate");
    }
  

    return (
    <div className={css.body}>
        <Modal closeConfirm={closeConfirm} show={confirm} >
            <div style={{display: "flex", flexDirection: "column"}}>
            Хадгалахдаа итгэлтэй байна уу
            <div >
                <Button btn="Cont" text="Тийм" daragdsan={save}/>
                <Button  text="Үгүй" daragdsan={closeConfirm}/>
            </div>
          
            </div>
        </Modal>
            <div style={{color: "white", fontSize: "30px"}}> МЭДЭЭЛЭЛ</div>
            <div className={css.row} >
                language: {addlesson.language} 
                <br/>
                {/* <input onChange={changeLanguage} type="text" name="Хэл" placeholder="Хэл сонгох"/> */}
                <select onChange={changeLanguage}>
                    <option>Сонгох</option>
                    <option>Англи хэл</option>
                    <option>Бусад</option>
                
                </select>
                <br/>  <br/>
            </div>

            <div className={css.row}>
                level: {addlesson.level}
                <select onChange={changeLevel}>
                    <option>Сонгох</option> 
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B1+</option>
                    <option>B2</option>
                    <option>B2+</option>
                
                </select>
                <br/>  <br/>
          
            </div>

            <div className={css.row}>
            lessonNumber: {addlesson.lessonNumber} <br/>
            <input onChange={changeLessonNumber} required type="text" name="Хичээлийн дугаар" placeholder="Хичээлийн дугаар"/>
            </div>
 
            <div className={css.row}>
            name: {addlesson.name} <br/>
            <input onChange={changeName} required type="text" name="Хичээлийн нэр" placeholder="Хичээлийн нэр"/>
            </div>
            
            <div className={css.row}> 
           
                <Video autoPlay loop 
                        // poster={photo} 
                        on>
                            <source
                            //  src={lessonId[1].base.video}
                            src={video}

                            type="video/webm"
                            />
                </Video>
                <Tooltip title="Edit" placement="top">
                <IconButton onClick={editVideo} >
                        <EditIcon color="primary"/>
                    </IconButton>
               </Tooltip>
                <input onChange={changeVideo} 
                    required type="file" 
                    name="video" 
                    id="videoInput" 
                    // hidden="hidden"
                    />
                {/* <Button text="Upload" daragdsan={uploadVideo}></Button> */}
            </div>
           
           <div className={css.photo}>
                {/* {photoList.map((url) => 
                     <img src={url}/>
                )} */}
                <img src={photo} className={css.image}/>
                <input onChange={changePhoto} 
                    required type="file" 
                    // hidden="hidden"  
                    id="imageInput" />
               <Tooltip title="Edit" placement="top">
                <IconButton onClick={editPicture} >
                        <EditIcon color="primary"/>
                    </IconButton>
               </Tooltip>
               {/* <Button text="Upload" 
               daragdsan={uploadImage}
        
               ></Button> */}
            </div>
         
            <div className={css.row}>
            grammar: {addlesson.grammar} <br/>
            <input onChange={changeGrammar} required type="file" name="Дүрэм" placeholder="Дүрэм сонгох"/>
            </div>

            <div className={css.row}>
            newWord: {addlesson.newWord} <br/>
            <input onChange={changeNewWord} required type="file" name="Шинэ үг" placeholder="Шинэ үг сонгох"/>
            </div>

          
           
            <Button text="Хадгалах" daragdsan={showConfirm}/> 
    </div>
      
    )
}

export default AddLesson;