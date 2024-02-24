import {
  collection,
  deleteDoc,
  doc,
  addDoc,
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
// console.log(game)
  useEffect(() => {
    oneGame();
    // queryPlayerData()
  }, [id]);

  useEffect(() => {
    if(isGameEnded){
      queryPlayerData()
    }
  },[isGameEnded])

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
        return [...list];
      });
    });

    return () => {
      unsubcribe();
    };
  };

  // end players data , win Player add coin,  second Player add coin
  const queryPlayerData = () => {
    const playersRef = collection(db, `game/${id}/players`);
    const queryData = query(playersRef , orderBy("point", "desc") , orderBy("endGamePlayerTime", "desc" ))
    const unsubcribe = onSnapshot(queryData, (snapshot) => {
      setQueryPlayer(() => {
        const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        // console.log(list[0])
        // console.log(game?.winCoin)  
        // win Player add coin
        const winRef = doc(db, "users", list[0]?.id);
        if(list[0]?.endGamePlayer === true && list[0]?.point >= 40 ) {
          updateDoc(winRef, {coins : game?.winCoin})
        }
      
        //  second Player add coin
        const secondRef = doc(db, "users", list[1]?.id);
        if(list[1]?.endGamePlayer === true && list[1]?.point >= 40 ) {
          updateDoc(secondRef, {coins : game?.secondCoin})
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
  const addPoint = async (status, go, shield, back, updateHorsePoint, id, val, isZeroCnt = false) => {
    // add powers
    const gameRef = doc(db, "game", id);
    const playerRef = doc(db, `game/${id}/players`, auth.currentUser?.uid)
    await updateDoc(playerRef, { activatedShield : status, activatedBack : status, activatedGo : status  })

    const generateUniqueRandomNumber = (exclude = []) => {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 40);
      } while (exclude.includes(randomNumber));
      return randomNumber;
    };
    // Generate three unique random numbers
    const randomGoNew = generateUniqueRandomNumber([shield, back]);
    const randomShieldNew = generateUniqueRandomNumber([go, back]);
    const randomBackNew = generateUniqueRandomNumber([go, shield]);
    // console.log(randomGoNew , randomShieldNew, randomBackNew)

    if(go === updateHorsePoint) {
      await updateDoc(playerRef, {go : increment(1)})
      await updateDoc(gameRef , {go: randomGoNew} )

    } else if (shield === updateHorsePoint) {
      await updateDoc(playerRef, {shield : increment(1)  })
      await updateDoc(gameRef , {shield: randomShieldNew} )
    } 
    else if(back === updateHorsePoint) {
      await updateDoc(playerRef, {back : increment(1)})
      await updateDoc(gameRef , {back: randomBackNew} )
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

 useEffect(() => {
  const otherPlayers = players?.filter(item => !(item?.id === userCtx?.currentUser?.id))
  const currentPlayer = players?.find(item => (item?.id === userCtx?.currentUser?.id))
  const doublePlayer = otherPlayers?.find(item => item?.point === currentPlayer?.point)
  const backUser = userCtx?.userList?.find(item => item?.id === doublePlayer?.id)
  
   try {
      const userRef = doc(db, "users", backUser?.id);
      const currentRef = doc(db, `game/${id}/players`, doublePlayer?.id);
      if(doublePlayer?.endGamePlayer === false) {
         updateDoc(currentRef, {point : 0}) 
         return
      } 

      // when begin player of the game , minus entry coin 
      if(backUser?.coins >= game?.entryCoin) {
        updateDoc(userRef, {coins : increment(-game?.entryCoin)})
       // add game coin
        const gameRef = doc(db, "game", id);
        updateDoc(gameRef, {winCoin : increment(Math.floor((game?.entryCoin/5) * 3))})
        updateDoc(gameRef, {secondCoin : increment(Math.floor((game?.entryCoin/5)))})
        // console.log(Math.floor((game?.entryCoin/5) * 3))
        // console.log(Math.floor((game?.entryCoin/5)))
      } else { 
        updateDoc(userRef, {coins : increment(0),  })
        updateDoc(currentRef, {endGamePlayer : true})
        setIsGameEnded(true)
      }

      // when ponit = 0 , logout player from the game
      if (backUser?.coins <= 0) {
         updateDoc(currentRef, {endGamePlayer : true})
        setIsGameEnded(true)
        return
      } 
     } catch (err) {
      // console.log(err)
    } finally{
      
    }
 } ,[players])
   

  const sendEmoji =async(data, e , currentUser , currentUserId , sendPlayerId , currentCoin) => {
    const oneRef = collection(db, `users/${currentUserId}/transaction` );
    await addDoc(oneRef , {
      data,
      createDate: serverTimestamp(),
    })
   
    const gameRef = doc(db, `game/${id}/players`, sendPlayerId);
    await updateDoc(gameRef, {sendEmoji : e})

    setTimeout(() => {
        updateDoc(gameRef, {sendEmoji : ''})   
    }, 2000);
  }

  const randomPower = (ranGo, ranShield, ranBack ) => {
    // console.log(ranGo, ranShield, ranBack)
    const gameRef = doc(db, "game", id);
    updateDoc(gameRef, {go : ranGo, shield: ranShield, back: ranBack})
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
    randomPower,
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