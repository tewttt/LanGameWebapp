import React from "react";
import { useState, useEffect } from "react";
import {db, storage} from "../firebase";
import {doc,getCountFromServer, getDocs,setDoc, getDoc,query, onSnapshot,collection, addDoc, updateDoc, deleteDoc, serverTimestamp} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { NewReleases } from "@mui/icons-material";


const auth = getAuth();
const GameContext = React.createContext();


export const GameStore = (props) => {
   
    const [gameList, setGameList] = useState([])
    const [playerList, setPlayerList] = useState([])
    const [gamesLength, setGamesLength] = useState("")
    const [playersLength, setPlayersLength] = useState("")
 
    console.log("game Length  " + gamesLength)
    console.log("players Length  " + playersLength)
    console.log(playerList)
    console.log(gameList)


    const GameRef = collection(db, "game");
    
    useEffect  (() => {
        shine();
      
    },[]);
   

    const shine = async() => {
        try {
            // game iin medeelel awj bn
            
            let list = []
            const unsubscribe  = onSnapshot(GameRef, (snapshot) => {
                  snapshot.docs.map((doc) => list.push({...doc.data(), id: doc.id}))
                setGameList(list)
                setGamesLength(list.length)
                // console.log(list.length)
            })
            // const snapshot = await getCountFromServer(GameRef)
            // const tcount = snapshot.data().count;
            // setGamesLength(tcount)

                try {
                    // Player medeelel awj bn
                    list.map(async(e, i) => {
                        const PlayersRef =  (collection(db, `game/${e.id}/players`))
                        const snap =await getCountFromServer(PlayersRef)
                        const count = snap.data().count;
                        setPlayersLength(count)
                        console.log(count)

                        const unsubplayer  = onSnapshot(PlayersRef, (snapshot) => {
                            let players = []
                            snapshot.docs.map((doc) => players.push({...doc.data(), id: doc.id}))
                            setGameList(prev=>{
                                prev[i].players = players;
                                return {...prev}
                            })
                            // setPlayerList(players)
                        })  
                       
                        
                        
                } catch (err) {
                    console.log(err)
                }
            
            return ()=>{
                unsubscribe();
            }
        } catch (err) {
            console.log(err)
        }
    
    }

    

    const createGame = async (state) => {
        // shine();
        if (playersLength < 3) {
            setOnePlayer(state)
        } else {
            try {
                await addDoc(GameRef, {
                    count: "",
                    createAt: serverTimestamp(),
                });
                alert("game collection vvslee")
                    try {
                        setOnePlayer(state);
    
                    } catch (err) {
                        console.log(err)
                    }
            } catch (err) {
                console.log(err)
            }
        }
       
     
    }

    const setOnePlayer = async(state ,id) => {  
         const unsubscribe  = onSnapshot(GameRef, (snapshot) => {
            let list = []
            snapshot.docs.map((doc) => list.push({...doc.data(), id: doc.id}))

            list.map(async(e) => {
                await setDoc(doc(db, `game/${e.id}/players`, state.authId), {
                    state
                })
                .then((res) => {console.log("success one player")})
                .catch((error) => {console.log("error" + error)})
            })
           
        })
        return ()=>{
            unsubscribe();
    }}
  

   
    
return (
    <GameContext.Provider
        value={{
            createGame,
            setOnePlayer,
            gameList,
            playerList,
            gamesLength,
            playersLength
        }}
    >
        {props.children}
    </GameContext.Provider>
);

};
export default GameContext;