import React, {useEffect, useState, useContext} from "react"
import {
    collection,
    serverTimestamp,
    addDoc,
    onSnapshot,
    updateDoc,
    doc,
    deleteDoc, 
    setDoc,
    query,
    where,
    getDoc,
    orderBy,
    limit,
    getDocs
  } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment"
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom"
import {getAuth} from "firebase/auth";
import { Man2 } from "@mui/icons-material";
const auth = getAuth();
export default function useAds(id) {
  const ctx = useContext(UserContext)
  const [ads, setAds] = useState([])
  const [allads, setAllAds] = useState([])
  const history = useHistory() 
  const [addCoinShow , setAddCoinShow] = useState(false)
  const time = new Date().getTime()
  const watchDate = moment(time).format('YYYY-MM-DD')
  const [filterAds, setFilterAds ] = useState([])
  const [filterUsers, setFilterUsers] = useState([])
  const [filterStatic, setFilterStatic] = useState([])
  // console.log(filterStatic)
  // console.log(filterAds)
  // 1 ads heden hereglecgh bgaag haruulah
  // ads iin data awah

  const getStatic =async (ads) => {
    console.log(ads.gender)
    // const stRef = doc(db, "static", "man")
    // const snap = await getDoc(stRef)
    // if(snap.exists()){
    //   console.log(snap.data())
    // }

    // const womanRef = doc(db, "static", "woman")
    // const snaps = await getDoc(womanRef)
    // if(snaps.exists()){
    //   console.log(snaps.data())
    // }

    // const allRef = doc(db, "static", "allUsers")
    // const all = await getDoc(womanRef)
    // if(all.exists()){
    //   console.log(all.data())
    // }

    // const ageRef = doc(db, "static", "age")
    // const age = await getDoc(ageRef)
    // if(age.exists()){
    //   console.log(age.data())
    // }

   
  }

  useEffect ( () => {
    //create ads user  all ads
    const allRef = query(
      collection(db, "ads"),
      where("userId", "==" , auth?.currentUser?.uid),
      )
      onSnapshot(allRef, (snapshot) => {
        let list = [];
        snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
        setAllAds(list);
        // console.log(list)
      });

    
     // filter userID
     const userRef = query(
      collection(db, "users"),
      where("gender" , "==" , "man"),
      // where("regions", "array-contains", "west_coast")
    )
    onSnapshot( userRef, (snapshot) => {
      const filteredUsers = [];
        snapshot.forEach((doc) => {
          const userData = doc.data();
          // Check if user age is within the specified range (15 - 40)
         
          if (userData.age >= 15 && userData.age <= 40) {
            filteredUsers.push({ id: doc.id, ...userData });
          }
        });
        setFilterUsers(filteredUsers);

        filterAds.map((ads, i) => {
          console.log(ads.ads?.ageStart)
        })
    });


   //show filter ads
    const oneRef = query(
      collection(db, "ads"),
      where("doneAds", "==" , false ), 
      // where("ageStart", ">=" , age ), 
      // where("ageEnd", "<=" , age ), 
      limit(5)
    )
   
    onSnapshot( oneRef, (snapshot) => {
      const list = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      Promise.all(  
        list.map((e, i) => getDoc(doc (db, `/ads/${e?.id}/${watchDate}/` , auth?.currentUser?.uid)))
        )
        .then( values =>{
          setFilterAds([])
            values.map(doc=> {
            // console.log(doc.exists());
            // console.log(doc.ref.parent.parent)
            if(!doc.exists()){
              getDoc(doc.ref.parent.parent).then((parentDoc) => {
                setFilterAds(prev => [...prev, {id:  parentDoc.id, ...parentDoc.data()}])   
              });
            
            }
          }) 
        })
    });

   

     
  }, [])

  const getAds = (id) => {
    // console.log(id)
    const postRef = doc(db, "ads", id);
    onSnapshot(postRef, (doc) => {
      setAds(doc.data() , doc.id)
    });
  }

  const sendAds = async (ads , goalPerson) => {
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
          message: "request",
          doneAds : false,
          goalPerson,
          watchedPerson: 0
         
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
      history.push(`/oneAds/${id}`)
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

  const putTransaction =async (data , adsId) => {
    // console.log(watchDate)
    const oneRef = collection(db, `users/${auth?.currentUser?.uid}/transaction` );
    await addDoc(oneRef , {
      data,
      createDate: serverTimestamp(),
    })
    const adsRef =  doc(db, `ads/${adsId}/${watchDate}` , auth?.currentUser?.uid)
    await setDoc(adsRef , {
      watchUserId : auth?.currentUser?.uid , adsId: id})
      
    .then((res) => { 
      setAddCoinShow(true)
      setTimeout(() => {
        setAddCoinShow(false)
      }, 3000)
    })
    .catch((error) => {
      console.log("error" + error);
    });
   
  }
  return {
      sendAds,
      editAds,
      deleteAds,
      getAds,
      ads,
      putTransaction,
      addCoinShow,
      filterAds,
      allads,
      filterUsers,
      getStatic
  }
}


  // filter users
//  Promise.all(  
//   list.map((e, i) => 
//   getDoc(doc (db, `ads` , e.id)))
//   // console.log(e.id))
//   )
//   .then( values =>{
//     // console.log(values)
//     setFilterUsers([])
//       values.map(doc=> {
//       // console.log(doc.exists());
//       if(doc.exists()){
//         getDoc(doc.ref).then((parentDoc) => {
//           const adsData = parentDoc.data().ads
//           // console.log(adsData?.ageStart)
//             const userRef = query(
//                 collection(db, "users"),
//                 where("gender" , "==" , "man"),
//                 // where("regions", "array-contains", "west_coast")
//               )
//               onSnapshot( userRef, (snapshot) => {
//                 const filteredUsers = [];
//                   snapshot.forEach((doc) => {
//                     const userData = doc.data();
//                     // Check if user age is within the specified range (15 - 40)
                  
//                     if (userData.age >= adsData?.ageStart && userData.age <= adsData?.ageEnd) {
//                       filteredUsers.push({ id: doc.id, ...userData });
//                     }
//                   });
//                   setFilterUsers(filteredUsers);

//               });
          
//         });
      
//       }
//     }) 
//   })


 // const data = getDocs(oneRef);
    // console.log(data.docs)
    // const docs = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
  
    // Promise.all(  
    //   docs.map((e, i) => getDoc(doc (db, `/ads/${e?.id}/${watchDate}/` , auth?.currentUser?.uid)))
    //   )
    //   .then( values =>{
    //     setFilterAds([])
    //       values.map(doc=> {
    //       // console.log(doc.exists());
    //       // console.log(doc.ref.path)
    //       if(!doc.exists()){
    //         getDoc(doc.ref.parent.parent).then((parentDoc) => {
    //           setFilterAds(prev => [...prev, {id:  parentDoc.id, ...parentDoc.data()}])   
    //         });
          
    //       }
    //     }) 
    //   })



 // allads?.map((e, i) => {
    //   // console.log(e)
    //   const q = query(
    //     collection(db, `ads/${e.id}/${watchDate}`),
    //     where("watchUserId", "==", auth?.currentUser?.uid )
    //   )
    //   // console.log(q)
    //   onSnapshot(q, (snapshot) => {
    //     snapshot.docs.map((doc) => {
    //       // console.log(doc.id)
    //     setFilterAds({...doc.data() , id: doc.id})
        
    //   })
    //   })
    //   // console.log(ads.id)
    // })