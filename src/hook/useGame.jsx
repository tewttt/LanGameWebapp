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
export default function useGame(id) {
  // console.log(id);
  useEffect(() => {
    oneGame(id);
  }, [id]);

  const history = useHistory();
  const [game, setGame] = useState("");
  const [players, setPlayers] = useState([]);
  const [isGameEnded, setIsGameEnded] = useState(false);

  const oneGame = (id) => {
    const oneRef = doc(db, "game", id);
    onSnapshot(oneRef, (doc) => {
      setGame(doc.data());
    });
    const PlayersRef = collection(db, `game/${id}/players`);
    const unsubcribe = onSnapshot(PlayersRef, (snapshot) => {
      setPlayers(() => {
        const list = snapshot.docs.map((doc) => {
          // return { id: doc.id };
          return { ...doc.data(), id: doc.id };
        });
        const winPlayer = list.find((item) => item.point >= 40) 
        if(winPlayer) {
          setIsGameEnded(true)
          updateDoc(oneRef, {endGame : true})
        }
       
        return [...list];
      });
    });
    
   
    return () => {
      unsubcribe();
    };
  };

  const showGameEnd = () => {
    setIsGameEnded(true)
  }
  // Тоглогчын оноо цуглуулах
  
  const addPoint = async (ran1, ran2, ran3, updateHorsePoint, id, val, isZeroCnt = false) => {
    // console.log(updateHorsePoint)
    // console.log(ran1 + "ran1")
    // console.log(ran2 + "ran2")
    // console.log(ran3 + "ran3")

    const playerRef = doc(db, `game/${id}/players`, auth.currentUser?.uid);
    if(ran1 === updateHorsePoint) {
      await updateDoc(playerRef, {go : increment(1)})
    } else if (ran2 === updateHorsePoint) {
      await updateDoc(playerRef, {shield : increment(1)})
    } 
    else if(ran3 === updateHorsePoint) {
      await updateDoc(playerRef, {back : increment(1)})
    } 
    else {
      console.log("hooson")
    }
   
    await updateDoc(playerRef, { point: increment(val + 1) , pointCount: isZeroCnt ? 0 : increment(1) });
  
  };
  
  // Тоглогчыг устгах
  const deletePlayer = async (id, currentUserId , game) => {
    console.log(game.count)
    const PlayersRef = doc(db, `game/${id}/players`, currentUserId);

    // await updateDoc (PlayersRef, {
    //   place : 4
    // })
    await deleteDoc(PlayersRef)
      .then((res) => { 
        console.log("player delete");
      })
      .catch((error) => {
        console.log("error" + error);
      });
  // player log out hiihed 4, 3 bairiig haruulna
  // 

    history.push("/game");
  };

  // Тоглогчидын асуултын хариулт
  const addAnswer = async (answer, authId, questionNumber) => {
    const question = game.questions[questionNumber]
    const prevAnswers = question.answers || []
    const time = new Date().getTime()
    const value = moment(time).format('YYYY-MM-DD HH:mm:ss:SSS')
   
    question.answers = [
      ...prevAnswers,
      { answer, authId , time : value},
    ];

    const gameRef = doc(db, "game", id);
    await updateDoc(gameRef, {
      questions: game.questions,
    });
   
  };

  const minusPoint = async(e , currentUserId , selectedPower , currentUser) => {
    const total = currentUser.back - 6 
    const playerRef = doc(db, `game/${id}/players`, e.id);
    // TO DO
    // esreg toglogch shield awsniig yaaj medhvv
    // 2 , 3  toglogch zereg baiwal hamtad n uhraana
    if (total < 0) {
      await updateDoc(playerRef, {point : 0})
    } else {
      await updateDoc(playerRef, {point : increment(-6)})
    }
    const currentRef = doc(db, `game/${id}/players`, currentUserId);
    if (selectedPower === "back" && currentUser.back > 0){
      await updateDoc(currentRef, {back : increment(-1)})
    }
  }

  const isShield = async( currentUser , currentUserId ) => {
    const currentRef = doc(db, `game/${id}/players`, currentUserId);
    if( currentUser.shield > 0) {
    await updateDoc(currentRef, {shield : increment(-1)})
   
    } else {
      console.log("no shield")
    }
  }

  const isGo = async(currentUser , selectedPower, currentUserId , diceNumber) => {
    const currentRef = doc(db, `game/${id}/players`, currentUserId);
    if( currentUser.go > 0 ) {
      await updateDoc(currentRef, {point : increment(diceNumber + 1)})
      await updateDoc(currentRef, {go : increment(-1)})
    }
  }

  return {
    game,
    players,
    addPoint,
    deletePlayer,
    addAnswer,
    isGameEnded,
    showGameEnd,
    minusPoint,
    isShield,
    isGo
    // kkk
   
  };
}


// const fieldUsers = (fieldNum) => {
  //   const playersFil = players?.filter(
  //     (item) => item.point == fieldNum
  //     // console.log(item.point)
  //   );
  //   // console.log(playersFil)
  //   return playersFil;
  // };