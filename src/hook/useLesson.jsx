import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";
import {getAuth} from "firebase/auth";
import UserContext from "../context/UserContext.js"


const auth = getAuth();
export default function useLesson(id) {
    const [teachers, setTeachers] = useState([])
    const ctx = useContext(UserContext)
    // console.log(ctx.currentUser)

    useEffect(() => {
        const oneRef = collection(db, "teacher")
        onSnapshot(oneRef, (snapshot) => {
        let list = [];
        snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
        setTeachers(list);
        });
      }, []);
      
    const changeMessage =async (message, id) => {
        const oneRef = doc(db, "teacher", id)
        if(message === "accept") {
            await updateDoc(oneRef , {
            status: true,
            message: message
            })

            const userRef = doc(db, "users", auth?.currentUser?.uid)
            await setDoc(userRef, { 
                teacher: true 
            } , {merge: true})

        } else {
            await updateDoc(oneRef , {
            message: message,
            status: false
            })

            const userRef = doc(db, "users", auth?.currentUser?.uid)
            await setDoc(userRef, { 
                teacher: false
            } , {merge: true})
        }
        alert("status oorchlogdloo")

      
    }
  
    // console.log(ctx.currentUser)
    const addTeacher =async (data) => {
        // console.log(data)
        const teachRef = doc(db, "teacher", auth?.currentUser?.uid )
        await setDoc(teachRef , {
            data,
            userId: ctx?.currentUser?.authId,
            userName: ctx?.currentUser?.name,
            userEmail: ctx?.currentUser?.email,
            userPhone: ctx?.currentUser?.phone,
            createDate: serverTimestamp(),
            status: false,
            message: "request"
        })
        .then((res) => { 
        console.log("request teacher");
       
        })
        .catch((error) => {
        console.log("error" + error);
        });
          
    }

    return {
        addTeacher,
        teachers,
        changeMessage
    }
}