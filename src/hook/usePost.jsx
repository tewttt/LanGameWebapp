import React, {useContext , useState, useEffect} from "react";
import {
    collection,
    serverTimestamp,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    query, where
  } from "firebase/firestore";
import { db } from "../firebase";
import UserContext from "../context/UserContext";
import {getAuth} from "firebase/auth";

const auth = getAuth();
export default function usePost(id) {
    const ctx = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [postData, setPost] = useState([])
    const [postDataAds, setPostAds] = useState([])

   useEffect(() => {
    id &&  getPost(id)
   }, [id])
   
    useEffect(() => {
      if (auth?.currentUser) {
        // const oneRef = collection(db, "posts")
        const oneRef = query(
          collection(db, "posts"),
          where("userId", "==" , auth?.currentUser?.uid),
        )
        onSnapshot(oneRef, (snapshot) => {
          let list = [];
          snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
          setPosts(list);
        });
      }
    }, [auth?.currentUser]);

    const getPost = (id) => {
      // console.log(id)
      const postRef = doc(db, "posts", id);
      onSnapshot(postRef, (doc) => {
        setPost(doc.data() , doc.id)
      });
    }
    const getPostAds = (id) => {
      // console.log(id)
      const postRef = doc(db, "posts", id);
      onSnapshot(postRef, (doc) => {
        setPostAds(doc.data() , doc.id)
      });
    }

    const addPost= async(post) => {
        const oneRef = collection(db, "posts" );
        await addDoc(oneRef , {
            userId: ctx.currentUser.authId,
            post,
            adsCreateDate: serverTimestamp(),
        } )
        .then((res) => { 
          console.log("add post");
        })
        .catch((error) => {
          console.log("error" + error);
        });
    
    }

    const editPost = async(id, post) => {
      const oneRef = doc(db, "posts",id);
      await updateDoc(oneRef , {
          post,
      } )
      .then((res) => { 
        console.log("edit post");
      })
      .catch((error) => {
        console.log("error" + error);
      });
    }
    const deletePost = async(id) => {
      const Doc = doc(db,`posts`, id);
      await deleteDoc(Doc);
    }
    return {
       addPost,
       posts,
       getPost,
        deletePost,
       editPost,
       postData,
       getPostAds,
       postDataAds
      };
}