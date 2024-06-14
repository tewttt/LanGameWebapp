import React from "react";
import { useState  } from "react";
import { db} from "../firebase";
import { useHistory } from "react-router-dom";
import {
  doc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";


const auth = getAuth();
const LandingContext = React.createContext();


export const LandingStore = (props) => {

  const history = useHistory();
  const [photo, setPhoto] = useState(""); 
  const [gameVideo, setGameVideo] = useState(""); 
  const [adsVideo, setAdsVideo] = useState(""); 
  const [video , setVideo] = useState("");
  const [landing, setLanding] = useState([])


  useEffect(async() => {
      const landingRef = doc(db, "landing", "data")
      const snap =await getDoc(landingRef)
      if(snap.exists()){
      setLanding(snap.data())
      }
      const videoRef = doc(db, "landing", "video")
      const snapVideo =await getDoc(videoRef)
      if(snapVideo.exists()){
      setVideo(snapVideo.data())
      }
      const photoRef = doc(db, "landing", "photo")
      const snapPhoto =await getDoc(photoRef)
      // console.log(snapPhoto.exists)
      if(snapPhoto.exists()){
      setPhoto(snapPhoto.data())
      }
      const photoAdsRef = doc(db, "landing", "adsVideo")
      const snapAdsPhoto =await getDoc(photoAdsRef)
      if(snapAdsPhoto.exists()){
      setAdsVideo(snapAdsPhoto.data())
      }
      const photoGameRef = doc(db, "landing", "gameVideo")
      const snapGamePhoto =await getDoc(photoGameRef)
      if(snapGamePhoto.exists()){
      setGameVideo(snapGamePhoto.data())
      }

  },[])

  return (
    <LandingContext.Provider
      value={{
        landing,
        video,
        adsVideo,
        gameVideo,
        photo,
      }}
    >
      {props.children}
    </LandingContext.Provider>
  );
};
export default LandingContext;


