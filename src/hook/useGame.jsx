import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  increment,
  onSnapshot,
  updateDoc,
 query,
 where,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import moment from "moment"
import UserContext from "../context/UserContext";

const auth = getAuth();
export default function useGame(id ) {
  const userCtx = useContext(UserContext)
  const history = useHistory();
  const [game, setGame] = useState("");
  const [players, setPlayers] = useState([]);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [queryPlayer , setQueryPlayer] = useState([])

  useEffect(() => {
    oneGame();
    queryPlayerData()
  }, [id]);

  useEffect(() => {  
    players?.map((e, i) => {
      if(e?.endGamePlayer === true) {
        setIsGameEnded(true)
      }
    })
      
  },[players])


  // one game data, players data
  const oneGame = () => {
    const oneRef = doc(db, "game", id);
    onSnapshot(oneRef, (doc) => {
      setGame(doc.data());
    });

    const playersRef = collection(db, `game/${id}/players`);
    const unsubcribe = onSnapshot(playersRef, (snapshot) => {
      setPlayers(() => {
        const list = snapshot.docs.map((doc) => {
          // return { id: doc.id };
          return { ...doc.data(), id: doc.id };
        });
        // end player
        const endPlayer = list.filter((item) => item.point >= 40) 
        endPlayer.map((e, i) => {
          if(e.endGamePlayer === false ) {
          const endRef = doc(db, `game/${id}/players`, e?.id)
          updateDoc(endRef, {endGamePlayer : true , endGamePlayerTime : serverTimestamp()} )
        }})

        // end game
        const endGame = list.filter(item => item.endGamePlayer === true)
        if(endGame.length >= 2) {
          const gameRef = doc(db, "game", id);
          updateDoc(gameRef, {endGame : true})
          setIsGameEnded(true)
        }

        // const endCoin = list.filter(item )
// useriin coin iig shalgana , user iin id heregtei
// coin duussan toglogchiig olood endGamePlayer true bolgono
// coin heregleh bvrd useriin coiniig shalgana
// emoji minus coin 
// create , join game minus coin 

        return [...list];
      });
    });

    return () => {
      unsubcribe();
    };
  };

  // end players data
  const queryPlayerData = () => {
    const playersRef = collection(db, `game/${id}/players`);
    const queryData = query(playersRef , orderBy("point", "desc") , orderBy("endGamePlayerTime", "desc" ))
    const unsubcribe = onSnapshot(queryData, (snapshot) => {
      setQueryPlayer(() => {
        const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        // win Player add coin
        const winRef = doc(db, "users", list[0]?.id);
        if(list[0]?.endGamePlayer === true && list[0]?.point >= 40 ) {
          updateDoc(winRef, {coins : list[0]?.winCoin})
        }
      
         // second Player add coin
        const secondRef = doc(db, "users", list[1]?.id);
        if(list[1]?.endGamePlayer === true && list[1]?.point >= 40 ) {
          updateDoc(secondRef, {coins : list[1]?.secondCoin})
        }
      

      // console.log(list)
        return [...list];
      });
    });
    return () => {
      unsubcribe();
    };
  }

  const showGameEnd = (status) => {
    // console.log(status)
    setIsGameEnded(status)
  }

  // Тоглогчын оноо цуглуулах
  const addPoint = async (status, ran1, ran2, ran3, updateHorsePoint, id, val, isZeroCnt = false) => {
    // add powers
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
    // add point
   if( updateHorsePoint > 40) {
    await updateDoc(playerRef, { point: 40 , pointCount: 0});
   } else {
    await updateDoc(playerRef, { point: increment(val + 1) , pointCount: isZeroCnt ? 0 : increment(1) });
   }
  };

  // Тоглогч тоглоомноос гарах
  const logoutPlayer = async (id, currentUserId , game) => {
    // console.log(game.count)
    const PlayersRef = doc(db, `game/${id}/players`, currentUserId);

    await updateDoc (PlayersRef, {
      logoutGame : true
    })
    // await deleteDoc(PlayersRef)
    //   .then((res) => { 
    //     console.log("player delete");
    //   })
    //   .catch((error) => {
    //     console.log("error" + error);
    //   });

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

  // begin player , end player, end game
 useEffect(() => {
  const otherPlayers = players?.filter(item => !(item?.id === userCtx?.currentUser?.id))
  const currentPlayer = players?.find(item => (item?.id === userCtx?.currentUser?.id))
  const doublePlayer = otherPlayers?.find(item => item?.point === currentPlayer?.point)
  const backUser = userCtx?.userList?.find(item => item?.id === doublePlayer?.id)

  // console.log(doublePlayer)
  // console.log(backUser?.coins <= 0)

   try {
      if(doublePlayer.endGamePlayer === false) {
        const currentRef = doc(db, `game/${id}/players`, doublePlayer?.id);
         updateDoc(currentRef, {point : 0}) 
      }

      // when begin player of the game , minus entry coin 
      if(backUser.coins >= doublePlayer.entryCoin) {
        const userRef = doc(db, "users", backUser.id);
        updateDoc(userRef, {coins : increment(-doublePlayer.entryCoin)})
        console.log(" minus coin ")
      } else {
        const currentRef = doc(db, `game/${id}/players`, doublePlayer?.id);
        updateDoc(currentRef, {endGamePlayer : true})
        setIsGameEnded(true)
        console.log("end game")
      }

      // when ponit = 0 , logout player from the game
      if(backUser.coins <= 0) {
        const currentRef = doc(db, `game/${id}/players`, doublePlayer?.id);
         updateDoc(currentRef, {endGamePlayer : true})
        setIsGameEnded(true)
      }



     } catch (err) {

    } finally{
      
    }


 } ,[players])
   

  const sendEmoji =async(e , currentUser , currentUserId , sendPlayerId , currentCoin) => {
    const currentRef = doc(db, "users", currentUserId);
    await updateDoc(currentRef, {coins : increment(-100)})
   
    const gameRef = doc(db, `game/${id}/players`, sendPlayerId);
    await updateDoc(gameRef, {sendEmoji : e})

    setTimeout(() => {
        updateDoc(gameRef, {sendEmoji : ''})
    }, 2000);
  }

  return {
    game,
    players,
    addPoint,
    logoutPlayer,
    addAnswer,
    isGameEnded,
    showGameEnd,
    isBack,
    isShield,
    isGo,
   
    sendEmoji,
    queryPlayer,
    queryPlayerData,
   
  
   
   
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

   // const serverTime = moment(doc.customTimestamp).format('YYYY-MM-DD HH:mm:ss');
        // console.log(serverTime + " servertime")
      
        // const playerTime = moment(e?.endGamePlayerTime.toDate()).format('YYYY-MM-DD HH:mm:ss')
        // console.log(playerTime + " playertime")
        // console.log(serverTime > playerTime)
        // })