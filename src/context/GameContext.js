import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
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
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const GameContext = React.createContext();
const GameRef = collection(db, "game");

export const GameStore = (props) => {
  const history = useHistory();
  const [games, setGames] = useState([]);
  const [languageId, setLanguage] = useState("");
  const [levelId, setLevel] = useState("");
  const [lessonId, setLesson] = useState("");
  // console.log(games);
  // console.log(languageId, levelId, lessonId);

  // console.log(games)
  const chGames = async (chLan, chLevel, chLesson) => {
    console.log(chLan, chLevel, chLesson);
    const q = query(
      collection(db, "game"),
      where("language", "==", chLan),
      where("level", "==", chLevel),
      where("lesson", "==", chLesson)
    );
    const querySnapshot = await getDocs(q);

   
    const tmp = [];
    querySnapshot.forEach((doc) => {
      tmp.push({ ...doc.data(), id: doc.id });
    });
  
    tmp.map((e, i) => {
      
      let players = [];
      const PlayersRef = collection(db, `game/${e.id}/players`);
        const unsubplayer = onSnapshot(PlayersRef, (snapshot) => {
          snapshot.docs.map(
            (doc) => players.push({ ...doc.data(), id: doc.id })
          );
        });

        tmp[i].players = players;
    })
    setGames(tmp);
  };

  const createGame = async (state, chLan, chLevel, chLesson) => {
    // console.log(chLan);
    try {
      const game = await addDoc(GameRef, {
        count: "",
        createDate: serverTimestamp(),
        language: chLan,
        level: chLevel,
        lesson: chLesson,
      });
      const PlayersRef = doc(
        db,

        `game/${game.id}/players`,
        auth.currentUser?.uid
      );

      const player = await setDoc(PlayersRef, {
        state,
      });
      setLanguage(chLan);
      setLevel(chLevel);
      setLesson(chLesson);
      history.push(`/newGame/${game.id}${chLan}${chLevel}${chLesson}`);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePlayer = async (game, player) => {
    const PlayersRef = doc(db, `game/${game.id}/players`, player.id);
    await deleteDoc(PlayersRef)
      .then((res) => {
        console.log("player delete");
      })
      .catch((error) => {
        console.log("error" + error);
      });

    if (game.players === null) {
      const gameRef = doc(db, "game", game.id);
      await deleteDoc(gameRef)
        .then((res) => {
          console.log("game delete");
        })
        .catch((error) => {
          console.log("error" + error);
        });
    }

    history.push("/game");
  };

  const join = async (state, game, chLan, chLevel, chLesson) => {
    // Gamectx.join(state, game, chLan, chLevel, chLesson );
    // Check game players
    // if (length < 4 ) Join else False
    // JOIN: 1. add doc to players 2. Navigate detail page

    const id = game.id;
    const length = game.players.length;
    const players = game.players;

    // history.push(`/newGame/${id}`)

    players.map((e, i) => {
      if (e.id === auth.currentUser?.uid) {
        return history.push(`/newGame/${id}`);
      }
       else if (length < 3) {
        const PlayersRef = doc(db, `game/${id}/players`, state.authId);
        const add = setDoc(PlayersRef, {
          state,
        });
        alert("Тоглогч нэмэгдлээ");
        history.push(`/newGame/${id}`);

        return;
      } else if (length > 3) {
        alert("Тоглогч бүрдсэн байна, Өөр ширээ сонгоно уу");
        history.push("/game");
      }
    });
  };

  return (
    <GameContext.Provider
      value={{
        games,
        createGame,
        join,
        deletePlayer,
        chGames,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
export default GameContext;

// const PlayersRef = collection(db, `game/${e.id}/players`);
//   const snap = await getDocs(PlayersRef);
//   const players = snap.docs.map((doc) => {
//     return { ...doc.data(), id: doc.id };
// });

// const snap =await getCountFromServer(PlayersRef)
// const count = snap.data().count;

//   if (length < 3) {
//   try {
//     const PlayersRef = doc(db, `game/${id}/players`, state.authId);
//     const add = setDoc(PlayersRef, {
//       state,
//     });
//     alert("Тоглогч нэмэгдлээ");
//     history.push(`/newGame/${id}`);
//   } catch (err) {
//     console.log(err);
//   }
//   return;
// } else {
//   alert("Тоглогч бүрдсэн байна, Өөр ширээ сонгоно уу");
//   history.push("/game");
// }




// useEffect(() => {
  //   const unsubscribe = onSnapshot(GameRef, (snapshot) => {
  //     setGames((prev) => {
  //       const list = snapshot.docs.map((doc) => {
  //         return { ...doc.data(), id: doc.id };
  //       });

  //       list.map(async (e, i) => {
  //         let players = [];

  //         const PlayersRef = collection(db, `game/${e.id}/players`);
  //         const unsubplayer = onSnapshot(PlayersRef, (snapshot) => {
  //           snapshot.docs.map(
  //             (doc) => players.push({ ...doc.data(), id: doc.id })

  //             // console.log(doc.data())
  //           );
  //         });

  //         list[i].players = players;
  //       });
  //       // return { ...list };
  //       return [...list];
  //     });
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // const LessonRef = doc(db ,"english")