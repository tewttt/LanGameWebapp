import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../firebase";
import {
  doc,
  getCountFromServer,
  getDocs,
  setDoc,
  getDoc,
  query,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const GameContext = React.createContext();

const GameRef = collection(db, "game");

export const GameStore = (props) => {
  const history = useHistory();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(GameRef, (snapshot) => {
      setGames((prev) => {
        const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        list.map(async (e, i) => {
          let players = [];
          const PlayersRef = collection(db, `game/${e.id}/players`);
          const unsubplayer = onSnapshot(PlayersRef, (snapshot) => {
            snapshot.docs.map((doc) =>
              players.push({ ...doc.data(), id: doc.id })
            );
          });

          // const PlayersRef = collection(db, `game/${e.id}/players`);
          //   const snap = await getDocs(PlayersRef);
          //   const players = snap.docs.map((doc) => {
          //     return { ...doc.data(), id: doc.id };
          // });

          // const snap =await getCountFromServer(PlayersRef)
          // const count = snap.data().count;
        
          list[i].players = players;
          // list[i].count = count
          // console.log("list", list);
         
        });
        return { ...list };
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createGame = async (state) => {
    try {
      const game = await addDoc(GameRef, {
        count: "",
        createAt: serverTimestamp(),
      });
      const PlayersRef = collection(db, `game/${game.id}/players`);
      // const PlayersRef = doc(db, `game/${game.id}/players`, state.authId);
      const player = await addDoc(PlayersRef, {
        state,
      });
      alert("Шинэ тоглоом үүслээ")
      // console.log(game.id)
      // games/{id}s
      // game.id
      // Add player to game
      // Navigate to game detail page
    } catch (err) {
      console.log(err);
    }
  };

  const join = async (state, id, length) => {
    // Check game players
    // if (length < 4 ) Join else False
    // JOIN: 1. add doc to players 2. Navigate detail page

    if (length < 3) {
      try {
        const PlayersRef = doc(db, `game/${id}/players`, state.authId);
        const add = await setDoc(PlayersRef, {
          state,
        });
        alert("Тоглогч нэмэгдлээ")
        history.push("/newGame");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Тоглогч бүрдсэн байна, Өөр ширээ сонгоно уу");
      history.push("/game");
    }
  };

  // console.log("TEST");
  // console.log((games));
  return (
    <GameContext.Provider
      value={{
        games,
        createGame,
        join,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
export default GameContext;
