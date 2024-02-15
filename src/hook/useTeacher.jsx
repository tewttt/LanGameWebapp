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
import { db } from "../firebase.js";
import {getAuth} from "firebase/auth";
import UserContext from "../context/UserContext.js"


const auth = getAuth();


export default function useTeacher(id) {
    const [teachers, setTeachers] = useState([])

    const ctx = useContext(UserContext)


    // teachers
    useEffect(() => {
        const oneRef = collection(db, "users")
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
    const addTeacher =async (teacher) => {
        const teachRef = doc(db, "users", auth?.currentUser?.uid )
        await updateDoc(teachRef , { 
            teacher,
            createDate: serverTimestamp(),
            teacherStatus: false,
            teacherMessage: "request"
        })
        .then((res) => { 
            alert("request teacher")
        // console.log("request teacher");
        })
        .catch((error) => {
        console.log("error" + error);
        });
          
    }
    const cancelTeacher =async() => {
        const teachRef = doc(db, "users", auth?.currentUser?.uid )
        await updateDoc(teachRef , { 
            createDate: serverTimestamp(),
            teacherStatus: false,
            teacherMessage: "cancel"
        })
        .then((res) => { 
            alert("cancellation of request")
        // console.log("request teacher");
        })
        .catch((error) => {
        console.log("error" + error);
        });
    }



    return {
        addTeacher,
        teachers,
        changeMessage,
        cancelTeacher,
        
    }
}