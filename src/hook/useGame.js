import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  increment,
  onSnapshot,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import moment from "moment"

const auth = getAuth();
export default function useGame(id, chLan, chLevel, chLesson) {
  // console.log(id);
  useEffect(() => {
    oneGame(id);
  }, [id]);

  const history = useHistory();
  const [game, setGame] = useState("");
  const [players, setPlayers] = useState([]);
  const [exam, setExam] = useState([]);
  const [translate, setTranslate] = useState([]);
  const [word, setWord] = useState([]);

  // GameDetail дээр нэг тоглоомын мэдээллийг харуулна
  const PlayersRef = collection(db, `game/${id}/players`);
  //   const players = ( ) => {
  //     const players = onSnapshot(PlayersRef, (snapshot) => {
  //         snapshot.docs.map((doc) => {
  //           return { ...doc.data(), id: doc.id };
  //         });
  //       });
  //   }

  const examfun = () => {
    const examRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${chLesson}/exam`,
      chLesson
    );
    onSnapshot(examRef, (doc) => {
      setExam(doc.data());
    });
  };

  // Translate татаж авах
  const translatefun = () => {
    const translateRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${chLesson}/translate`,
      chLesson
    );
    onSnapshot(translateRef, (doc) => {
      setTranslate(doc.data());
    });
  };
  const wordfun = () => {
    const wordRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${chLesson}/word`,
      chLesson
    );
    onSnapshot(wordRef, (doc) => {
      setWord(doc.data());
    });
  };
  const oneGame = (id) => {
    const oneRef = doc(db, "game", id);
    onSnapshot(oneRef, (doc) => {
      setGame(doc.data());
    });

    const PlayersRef = collection(db, `game/${id}/players`);
    // let players = [];
    // onSnapshot(PlayersRef, (snapshot) => {
    //   snapshot.docs.map((doc) => players.push({ ...doc.data(), id: doc.id }));
    // });
    // setPlayers(players);

    const unsubcribe = onSnapshot(PlayersRef, (snapshot) => {
      setPlayers(() => {
        const list = snapshot.docs.map((doc) => {
          // return { id: doc.id };
          return { ...doc.data(), id: doc.id };
        });
        return [...list];
      });
    });
    return () => {
      unsubcribe();
    };
  };

  // Тоглогчын оноо цуглуулах

  const addPoint = async (id, val) => {
    const PlayersRef = doc(db, `game/${id}/players`, auth.currentUser?.uid);
    await updateDoc(PlayersRef, { point: increment(val + 1) });
    alert("point shinechlegdlee");
  };

  // Тоглогчыг устгах
  const deletePlayer = async (id, currentUser) => {
    const PlayersRef = doc(db, `game/${id}/players`, currentUser);
    await deleteDoc(PlayersRef)
      .then((res) => {
        console.log("player delete");
      })
      .catch((error) => {
        console.log("error" + error);
      });
    const PlRef = collection(db, `game/${id}/players`);
    const snapshot = await getCountFromServer(PlRef);
    const count = snapshot.data().count;
    // console.log(count);
    const GameNewRef = doc(db, "game", id);
    await updateDoc(GameNewRef, { count: count });

    if (game.players === null) {
      const gameRef = doc(db, "game", id);
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

  // Тоглогчидын асуултын хариулт
  const addAnswer = async (answer, authId, questionNumber) => {
  // console.log(time)
    const question = game.questions[questionNumber]
    const prevAnswers = question.answers || []
    // console.log("question",question)
    const time = new Date().getTime()
   
    const value = moment(time).format('YYYY-MM-DD HH:mm:ss:SSS')
    //  console.log(value)

    question.answers = [
      ...prevAnswers,
      { answer, authId , time : value},
    ];

    const gameRef = doc(db, "game", id);
    await updateDoc(gameRef, {
      questions: game.questions,
    });
    alert("amjiltaai")
  };

  

  return {
    game,
    players,
    addPoint,
    deletePlayer,
    exam,
    examfun,
    translatefun,
    wordfun,
    translate,
    word,
    addAnswer,
  };
}
