import {
  collection,
  deleteDoc,
  doc,
 
  increment,
  onSnapshot,
  updateDoc,
 
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
  const [isGameEnded, setIsGameEnded] = useState(true);
// TO DO
// 2 zereg horse current user bish ved uhrahgvi bn
// random power neg negeeree random hiigdeh
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
        // end player
        const endPlayer = list.filter((item) => item.point >= 40) 

        endPlayer.map((e, i) => {
          if(e.endGamePlayer === false) {
          const endRef = doc(db, `game/${id}/players`, e?.id)
          updateDoc(endRef, {endGamePlayer : true , endGamePlayerTime : serverTimestamp()} )
        }

        const serverTime = moment(doc.customTimestamp).format('YYYY-MM-DD HH:mm:ss');
        console.log(serverTime + " servertime")
      
        const playerTime = moment(e?.endGamePlayerTime.toDate()).format('YYYY-MM-DD HH:mm:ss')
        console.log(playerTime + " playertime")
        console.log(serverTime > playerTime)
        })
    

     
      //  console.log(value)
        // if(winPlayer) {
        //   setIsGameEnded(true)
        //   updateDoc(oneRef, {endGame : true})
        // }
       
        return [...list];
      });
    });
    
   
    return () => {
      unsubcribe();
    };
  };

  const showGameEnd = (status) => {
    console.log(status)
    // setIsGameEnded(status)
  }
  // Тоглогчын оноо цуглуулах
  
  const addPoint = async (status, ran1, ran2, ran3, updateHorsePoint, id, val, isZeroCnt = false) => {
    
    const playerRef = doc(db, `game/${id}/players`, auth.currentUser?.uid)
    await updateDoc(playerRef, { activatedShield : status, activatedBack : status, activatedGo : status  })

    if(ran1 === updateHorsePoint) {
      await updateDoc(playerRef, {go : increment(1)})
    } else if (ran2 === updateHorsePoint) {
      await updateDoc(playerRef, {shield : increment(1)  })
    } 
    else if(ran3 === updateHorsePoint) {
      await updateDoc(playerRef, {back : increment(1)})
    } 
    else {
      // console.log("hooson")
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

  const isBack = async(status, e , currentUserId , selectedPower , currentUser) => {
    const total = currentUser.point - 6 
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
      await updateDoc(currentRef, {back : increment(-1), activatedBack : status})
    }
  }

 
  
  const isShield = async(status, currentUser , currentUserId , cb ) => {
    // console.log(status)
      try {
        
      const currentRef = doc(db, `game/${id}/players`, currentUserId);
      if( currentUser.shield > 0) {
      await updateDoc(currentRef, {shield : increment(-1) , activatedShield : status})
      
      } else {
        console.log("no shield")
        // TODO: warning
      }
    } catch (error) {
        
    } finally{
      cb && cb()
    }
  }

  const isGo = async(status, currentUser , selectedPower, currentUserId , diceNumber , go) => {
    try {
      const currentRef = doc(db, `game/${id}/players`, currentUserId);
      if( currentUser.go > 0 ) {
        await updateDoc(currentRef, {point : increment(diceNumber + 1)})
        await updateDoc(currentRef, {go : increment(-1), activatedGo : status})
      }
    } catch (err) {

    } finally{
      go && go()
    }
    
  }

  const isBegin = async(e) => {
    try {
      if(e.endGamePlayer === false) {
        const currentRef = doc(db, `game/${id}/players`, e.id);
        await updateDoc(currentRef, {point : 0})
      }
     } catch (err) {

    } finally{
      
    }
  
  }

  const minusCoin =async(e , currentUser , currentUserId , sendPlayerId) => {
    const currentRef = doc(db, "users", currentUserId);
    await updateDoc(currentRef, {coins : increment(-100)})
    const gameRef = doc(db, `game/${id}/players`, sendPlayerId);
    await updateDoc(gameRef, {sendEmoji : e})
  }

  return {
    game,
    players,
    addPoint,
    deletePlayer,
    addAnswer,
    isGameEnded,
    showGameEnd,
    isBack,
    isShield,
    isGo,
    isBegin,
    minusCoin
  
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