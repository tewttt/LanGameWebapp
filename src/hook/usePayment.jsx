import React, {useEffect, useState, useContext} from "react"
import {
    collection,
    serverTimestamp,
    addDoc,
    onSnapshot,
    updateDoc,
    doc,
    deleteDoc,
    increment,
    setDoc
  } from "firebase/firestore";
import { db } from "../firebase";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom"

export default function usePayment(id) {
  const ctx = useContext(UserContext)
  
  const amount = ctx?.currentUser?.amount
  const coins = ctx?.currentUser?.coins
  const userId= ctx?.currentUser?.authId

 
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
 
  const payLesson = async(data , lesson) => {
    // console.log(lesson.language)
    // console.log(lesson.level)
    const lan = lesson.language
    const level = lesson.level
    const number = lesson.lessonNumber
    const userRef = collection(db, `users/${userId}/transaction`)
    await addDoc(userRef , {
      data,
      createDate: serverTimestamp(),
    })

    try{
      // const lessonActiveUser =  doc(db, "lessonActiveUser", userId )
      const lessonActiveUser =  doc(db, "lessonActiveUser", `${userId}${lesson.language}${lesson.level}${lesson.lessonNumber}` )
      await setDoc(lessonActiveUser, 
        {
          userId , lan, level, number,
          accountID: ctx?.currentUser?.userID,
          name: ctx?.currentUser?.name,
          phone: ctx?.currentUser?.phone
        } 
        )
    }catch (err) {
      console.log(err)
    }
   
   
  }
  
  
  return {
      exchange,
      payLesson
  }
}