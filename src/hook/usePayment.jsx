import React, {useEffect, useState, useContext} from "react"
import {
    collection,
    serverTimestamp,
    addDoc,
    onSnapshot,
    updateDoc,
    doc,
    deleteDoc,
    increment
  } from "firebase/firestore";
import { db } from "../firebase";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom"

export default function usePayment(id) {
  const ctx = useContext(UserContext)
  const history = useHistory()
 
  const exchange =async ( userId , enterValue, from , to) => {
 
   const userRef = doc(db, "users" , userId)

   if(from === "₮" && to === "coin") {
    // amonut hasaaad , coin nemne 
    // amount- entervalue
    // coin + total
    const total =  enterValue*40
    await updateDoc(userRef, {amount : increment(-enterValue) , coins: increment(total)})
   } else if (from === "coin" && to === "₮" ) {
   // coin hasaad , amount nemne
   // coin - entervalue
   // amount + total
    const total = enterValue/40
    await updateDoc(userRef, {amount : increment(total) , coins: increment(-enterValue)})
   } else {
    //  setError("choose the correct value")
     // console.log("zow oruul")
  }
  }
 
  

  
  
  return {
      exchange
  }
}