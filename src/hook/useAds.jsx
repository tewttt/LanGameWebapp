import React, {useEffect, useState, useContext} from "react"
import {
    collection,
    serverTimestamp,
    addDoc,
    onSnapshot,
    updateDoc,
    doc
  } from "firebase/firestore";
import { db } from "../firebase";
import UserContext from "../context/UserContext";
import { useHistory , useParams} from "react-router-dom"

export default function useAds(id) {
  const ctx = useContext(UserContext)
  const [ads, setAds] = useState([])
  const history = useHistory()

  useEffect(() => {
    // if (auth?.currentUser) {
      const oneRef = collection(db, "ads")
      onSnapshot(oneRef, (snapshot) => {
        let list = [];
        snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
        setAds(list);
      });
    // }
  }, []);
  
  const changeMessage =async (message, adsId) => {
    const oneRef = doc(db, "ads", adsId)

    if(message === "accept") {
      await updateDoc(oneRef , {
        status: true,
        message: message
      })
    } else {
      await updateDoc(oneRef , {
        message: message,
        status: false
      })
    }
    alert("status oorchlogdloo")
  }

  const sendAds = async (ads) => {
      const adsRef = collection(db, "ads")
      await addDoc(adsRef , {
          ads,
          createDate: serverTimestamp(),
          status: false,
          postId: id,
          userId: ctx.currentUser.authId,
          userName: ctx.currentUser.name,
          userEmail:ctx.currentUser.email,
          userPhone: ctx.currentUser.phone,
          message: ""
      } )
      .then((res) => { 
        history.push("/advertise")
        console.log("add ads");
      })
      .catch((error) => {
        console.log("error" + error);
      });

  }
    return {
        sendAds,
        ads,
        changeMessage 
    }
}