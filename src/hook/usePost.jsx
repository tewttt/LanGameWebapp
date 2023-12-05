import React, {useContext , useState, useEffect} from "react";
import {
    collection,
    serverTimestamp,
    addDoc,
    onSnapshot,
    doc
  } from "firebase/firestore";
import { db } from "../firebase";
import UserContext from "../context/UserContext";
import {getAuth} from "firebase/auth";

const auth = getAuth();
export default function usePost(id) {
    const ctx = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState([])
   
    // console.log(posts)

    useEffect(() => {
      if (auth?.currentUser) {
        const oneRef = collection(db, "posts")
        onSnapshot(oneRef, (snapshot) => {
          let list = [];
          snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
          setPosts(list);
        });
      }
    }, [auth?.currentUser]);

    const getPost = async (postId) => {
      const docRef = doc(db, "posts", postId);
      onSnapshot(docRef, (doc) => {
      setPost(doc.data(), doc.id)
      });
    }

    const addPost= async(post, video) => {
        const oneRef = collection(db, "posts" );
        await addDoc(oneRef , {
            userId: ctx.currentUser.authId,
            userName: ctx.currentUser.name,
            post,
            video,
            createDate: serverTimestamp(),
        } )
        .then((res) => { 
          console.log("add post");
        })
        .catch((error) => {
          console.log("error" + error);
        });
    
      }

    return {
       addPost,
       posts,
       getPost,
       post
      };
}