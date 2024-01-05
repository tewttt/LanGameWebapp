import React, {useEffect, useState, useContext} from "react"
import {
    collection,
    serverTimestamp,
    addDoc,
    onSnapshot,
    updateDoc,
    doc,
    deleteDoc
  } from "firebase/firestore";
import { db } from "../firebase";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom"

export default function useAds(id) {
  const ctx = useContext(UserContext)
  const [allads, setAds] = useState([])
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
        history.push("/ads")
        console.log("add ads");
      })
      .catch((error) => {
        console.log("error" + error);
      });

  }
  const editAds = async(ads, id) => {
    const oneRef = doc(db, "ads",id);
    await updateDoc(oneRef , {
        ads,
    } )
    .then((res) => { 
      history.push("/ads")
      console.log("edit ads");
    })
    .catch((error) => {
      console.log("error" + error);
    });
  }
  const deleteAds = async(id) => {
    const Doc = doc(db,`ads`, id);
    await deleteDoc(Doc);
  }
  return {
      sendAds,
      editAds,
      deleteAds,
      allads,
      
  }
}