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
  FieldValue,
  increment,
  count,
  getCountFromServer,
  collectionGroup,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const GameContext = React.createContext();
const GameRef = collection(db, "game");

export const GameStore = (props) => {
  const history = useHistory();
  const [games, setGames] = useState([]);
  const [game, setGame] = useState("");
  const [players, setPlayers] = useState([]);
  const [id, setId] = useState("");
  // GamePage дээрх сонголт хийхэд хэрэглэнэ
  const chGames = async (chLan, chLevel, chLesson) => {
    const q = query(
      collection(db, "game"),
      where("language", "==", chLan),
      where("level", "==", chLevel),
      where("lesson", "==", chLesson)
    );
    const unsubcribe = onSnapshot(q, (snapshot) => {
      setGames(() => {
        const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        list.map((e, i) => {
          let players = [];

          const PlayersRef = collection(db, `game/${e.id}/players`);
          const unsubplayer = onSnapshot(PlayersRef, (snapshot) => {
            snapshot.docs.map((doc) =>
              players.push({ ...doc.data(), id: doc.id })
            );
          });

          list[i].players = players;
        });
        return [...list];
      });
    });
    return () => {
      unsubcribe();
    };
  };

  // GameDetail дээр нэг тоглоомын мэдээллийг харуулна
  const oneGame = (id) => {
    setId(id);
    const examRef = doc(db, "game", id);
    onSnapshot(examRef, (doc) => {
      setGame(doc.data());
    });
    const PlayersRef = collection(db, `game/${id}/players`);
    let players = [];
    const unsubplayer = onSnapshot(PlayersRef, (snapshot) => {
      snapshot.docs.map((doc) => players.push({ ...doc.data(), id: doc.id }));
    });

    setPlayers(players);
    // return () => {
    //   unsubplayer();
    // };
  };
  // const PlayersRef = doc(db, `game/${id}/players`, auth.currentUser?.uid);

  const createGame = async (state, chLan, chLevel, chLesson) => {
    try {
      // Тоглооом үүсгэж байна
      const game = await addDoc(GameRef, {
        count: 0,
        createDate: serverTimestamp(),
        language: chLan,
        level: chLevel,
        lesson: chLesson,
      });

      // Тоглогчын мэдээллийг нэмж байна
      const PlayersRef = doc(
        db,
        `game/${game.id}/players`,
        auth.currentUser?.uid
      );
      await setDoc(PlayersRef, {
        state,
        point: 0,
        color: "red",
      });
      // Тоглогчдыг тоог авж байна
      const PlRef = collection(db, `game/${game.id}/players`);
      const snapshot = await getCountFromServer(PlRef);
      const count = snapshot.data().count;
      const GameNewRef = doc(db, "game", game.id);
      await updateDoc(GameNewRef, { count: count });
      oneGame(game.id);
      history.push(`/newGame/${game.id}${chLan}${chLevel}${chLesson}`);
    } catch (err) {
      console.log(err);
    }
  };

  // Тоглогчын оноо цуглуулах
  const addPoint = async (id, val) => {
    const PlayersRef = doc(db, `game/${id}/players`, auth.currentUser?.uid);
    await updateDoc(PlayersRef, { point: increment(val + 1) });
    alert("point shinechlegdlee");
  };

  // Тоглогчыг устгах
  const deletePlayer = async (game, player) => {
    const PlayersRef = doc(db, `game/${game.id}/players`, player.id);
    await deleteDoc(PlayersRef)
      .then((res) => {
        console.log("player delete");
      })
      .catch((error) => {
        console.log("error" + error);
      });
    const PlRef = collection(db, `game/${game.id}/players`);
    const snapshot = await getCountFromServer(PlRef);
    const count = snapshot.data().count;
    // console.log(count);
    const GameNewRef = doc(db, "game", game.id);
    await updateDoc(GameNewRef, { count: count });

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
  // Тоглоомд орох
  const join = async (state, game) => {
    const id = game.id;

    if (game.count < 4) {
      game.players.map((e, i) => {
        // if (e.id === auth.currentUser?.uid) {
        //   oneGame(id);
        //   history.push(`/newGame/${id}`);
        //   return;
        // }

        e.id === auth.currentUser?.uid && oneGame(id);
        history.push(`/newGame/${id}`);
      });

      const PlayersRef = doc(db, `game/${id}/players`, state.authId);
      const add = setDoc(PlayersRef, {
        state,
        point: 0,
      });
      alert("Тоглогч нэмэгдлээ");
      history.push(`/newGame/${id}`);

      const PlRef = collection(db, `game/${game.id}/players`);
      const snapshot = await getCountFromServer(PlRef);
      const count = snapshot.data().count;
      // console.log(count);
      const GameNewRef = doc(db, "game", game.id);
      await updateDoc(GameNewRef, { count: count });

      if (game.count == 1) {
        updateDoc(PlayersRef, {
          color: "blue",
        });
      } else if (game.count == 2) {
        updateDoc(PlayersRef, {
          color: "orange",
        });
      } else if (game.count == 3) {
        updateDoc(PlayersRef, {
          color: "purple",
        });
      }
      oneGame(id);
      return;
    } else if (game.count > 4) {
      alert("Тоглогч бүрдсэн байна, Өөр ширээ сонгоно уу");
      history.push("/game");
    }
  };

  return (
    <GameContext.Provider
      value={{
        games,
        createGame,
        join,
        deletePlayer,
        chGames,
        game,
        id,
        players,
        addPoint,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
export default GameContext;

// const chGames = async (chLan, chLevel, chLesson) => {
//   const q = query(
//     collection(db, "game"),
//     where("language", "==", chLan),
//     where("level", "==", chLevel),
//     where("lesson", "==", chLesson)
//   );

//   const querySnapshot = await getDocs(q);

//   const tmp = [];
//   querySnapshot.forEach((doc) => {
//     tmp.push({ ...doc.data(), id: doc.id });
//   });

//   tmp.map((e, i) => {
//     let players = [];

//     const PlayersRef = collection(db, `game/${e.id}/players`);
//     const unsubplayer = onSnapshot(PlayersRef, (snapshot) => {
//       snapshot.docs.map((doc) => players.push({ ...doc.data(), id: doc.id }));
//     });

//     tmp[i].players = players;
//   });
//   setGames(tmp);
// };

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
