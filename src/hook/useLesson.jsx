import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc, 
  onSnapshot,
  query,
  increment,
  where,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase.js";
import { useHistory } from "react-router-dom";
import {getAuth} from "firebase/auth";

const auth = getAuth();
let unsubcribeGames;

export default function useLesson(languageId, topicId, lessonId) {
  // console.log(languageId, topicId,lessonId)
    const history = useHistory();
    const lessonsRef = collection(db, "lessons");
    const [lanId, setLanId] = useState([]);
    const [levelId, setLevelId] = useState([]);
    const [lessonsId, setLessonId] = useState([]);
    const [games, setGames] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [oneLesson , setOneLesson] = useState({})
    const [exam, setExam] = useState([]);
    const [listen ,setListen] = useState([])
    const [translate, setTranslate] = useState([]);
    const [word, setWord] = useState([]);
    const [grammar, setGrammar] = useState([]);
    const [verb, setVerb] = useState([]);
    const [lessonActiveUsers, setLessonActiveUsers] = useState([])
    const [commentList, setCommentList] = useState([])
    const [entry, setEntry] = useState()

    useEffect(() => {
        getLanguageId();
    }, [auth?.currentUser?.uid]);

    // Language ID
    const getLanguageId = (lan) => {
        const unsubcribe = onSnapshot(lessonsRef, (snapshot) => {
        setLanId(() => {
            const list = snapshot.docs.map((doc) => {
            return { id: doc.id };
            // return { ...doc.data(), id: doc.id };
            });
            return [...list];
        });
        });
        return () => {
        unsubcribe();
        };
    };

    // Level ID
    const getLevelId = (chLan) => {
      //  console.log(chLan)
        const levelRef = collection(db, `lessons/${chLan}/topics`);
        const unsubcribe = onSnapshot(levelRef, (snapshot) => {
        setLevelId(() => {
            const list = snapshot.docs.map((doc) => {
                // console.log(doc.id)
            return { id: doc.id };
            // return { ...doc.data(), id: doc.id };
            });
            // console.log(list);
            return [...list];
        });
        });
        return () => {
        unsubcribe();
        };
    };
  

    // Lesson ID
    const getLessonId = (level , chLan) => {
        // console.log(level, chLan)
        const levelRef = collection(db, `lessons/${chLan}/topics/${level}/lessons`);
        const unsubcribe = onSnapshot(levelRef, (snapshot) => {
        setLessonId(() => {
            const list = snapshot.docs.map((doc) => {
            return { id: doc.id };
            // return { ...doc.data(), id: doc.id };
            });
        
            return [...list];
        });
        });
        return () => {
        unsubcribe();
        };
    };

    
    const chGames = async (chLan, chLevel, chLesson) => {
      const q = query(
      collection(db, "game"),
      where("language", "==", chLan),
      where("level", "==", chLevel),
      where("lesson", "==", chLesson)
      );
      // console.log(q)
      unsubcribeGames = onSnapshot(q, (snapshot) => {
      setGames(() => {
          const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
          });
          list.map((e, i) => {
          let players = [];

          const PlayersRef = collection(db, `game/${e.id}/players`);
          // const unsubplayer = onSnapshot(PlayersRef, (snapshot) => {
          onSnapshot(PlayersRef, (snapshot) => {
              snapshot.docs.map((doc) =>
              players.push({ ...doc.data(), id: doc.id })
              );
          });

          list[i].players = players;
          });
          return [...list];
      });
      });
  };

    const join = async (state, game, chLan, chLevel, chLesson, entry, win , second) => {
         
      // console.log("joim")
          await chGames(chLan, chLevel, chLesson)
          const id = game?.id; 
          const data = game?.players.find((e, i) => e.id === auth?.currentUser?.uid);
          if (data) {
              return history.push(
              `/newGame/${id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`
              );
          }
          const PlayersRef = doc(db, `game/${id}/players`, state?.authId);
          setDoc(PlayersRef, {
              state,
              point: 0,
              color: "",
              shield: 0,
              go: 0,
              back: 0, 
              endGamePlayer: false,
              endGamePlayerTime: "",
              activatedGo: false,
              activatedBack: false,
              activatedShield : false,
              paidEntry: false
          });
          const dataTnx = {
              coin: entry,
              label: "play game",
              labelType: "game",
              type: "withdraw"
          }
          const oneRef = collection(db, `users/${auth?.currentUser?.uid}/transaction` );
          await addDoc(oneRef , {
              data: dataTnx,
              createDate: serverTimestamp(), 
          })
          setEntry(entry)

          if (game?.count == 1) {
              updateDoc(PlayersRef, {
              color: "blue",
              });
          } else if (game?.count == 2) {
              updateDoc(PlayersRef, {
              color: "orange",
              });
          } else if (game?.count == 3) {
              updateDoc(PlayersRef, {
              color: "purple",
              });
          }
          return;
  
    };

    const createGame = async (state, chLan, chLevel, chLesson , entry , authId, win , second) => {
        
        const getExam = await examfunGame(chLan, chLevel, chLesson);
        const getWord = await wordfunGame(chLan, chLevel, chLesson);
        const add = getExam.concat(getWord)
       
        const questions =  shuffleArray(add);
        // Асуултуудыг хольж байна
        function shuffleArray(questionsToShuffle) {
          for (let i = questionsToShuffle.length - 1; i > 0; i--) {
            let randomPosition = Math.floor(Math.random() * (i + 1));
            let temp = questionsToShuffle[i];
            questionsToShuffle[i] = questionsToShuffle[randomPosition];
            questionsToShuffle[randomPosition] = temp;
          }
          return questionsToShuffle;
        }

        await chGames(chLan, chLevel, chLesson)
        try {
              setEntry(entry)
              const GameRef = collection(db, "game");
              // Тоглооом үүсгэж байна
              const game = await addDoc(GameRef, {
                  count: 0,
                  createDate: serverTimestamp(),
                  language: chLan,
                  level: chLevel,
                  lesson: chLesson,
                  questions,
                  endGame: false,
                  winCoin: win,
                  secondCoin: second,
                  entryCoin: entry,
                  waitPlayers: true,
                  showStartGame: false,
                  showQuestion: false,
                  showAnswer: false,
                  showPlayer: false,
                  logoutGame: false,
                  showDiceTime: false,
                  showTurn: false,
                  startTime: 5, 
                  questionTime: 15,
                  questionNumber: 0,
                  diceTime: 5,
                  turn: 0,
                  answeredPlayers: [],
                  activeDice: ""
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
                  shield: 0,
                  go: 0,
                  back: 0,
                  endGamePlayer: false,
                  endGamePlayerTime: "",
                  activatedGo: false,
                  activatedBack: false,
                  activatedShield : false,
                  logoutGame: false,
                  paidEntry: false
              
              });
              history.push(`/newGame/${game.id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`)

              const data = {
                  coin: entry,
                  label: "play game",
                  labelType: "game",
                  type: "withdraw"
              }

              // Add tnx in user information
              const oneRef = collection(db, `users/${authId}/transaction`);
              await addDoc(oneRef, {
                  data,
                  createDate: serverTimestamp(),
                  } )
                  .then((res) => { 
                  history.push(`/newGame/${game.id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`);
                  })
                  .catch((error) => {
                  console.log("error" + error);
                  });
            } 
                catch (err) {
            console.log(err); 
            }
        
    };

   

    const examfunGame = async (chLan, chLevel, chLesson) => {
        const examRef = collection(
        db,
        `lessons/${chLan}/topics/${chLevel}/lessons/${chLesson}/exam`
        );
        const data = await getDocs(examRef);
        const docs = data.docs.map((o) => o.data());
        return docs[0].exam;
    };
    const wordfunGame = async (chLan, chLevel, chLesson) => {
      const examRef = collection(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${chLesson}/word`
      );
      const data = await getDocs(examRef);
      const docs = data.docs.map((o) => o.data());
      return docs[0].word;
    };

  // filt Lessons
  const getLessons = (level, chLan) => {
    // const lessonsRef = collection(db,`lessons/${chLan}/topics/${level}/lessons`);
    const lessonsRef = query(
      collection(db,`lessons/${chLan}/topics/${level}/lessons`),
      where("acceptStatus", "==", "accept")
      );

    const unsubcribe = onSnapshot(lessonsRef, (snapshot) => {
      setLessons(() => {
        const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        return [...list];
      });
    });
    return () => {
      unsubcribe();
    };
  };
  
  const getLessonUsers = async() => {
    const lesUsRef = query(collection(db, "lessonActiveUser"),
    where("userId" , "==" , auth?.currentUser?.uid),
    where("lan" , "==", languageId ),
    where("level" , "==", topicId ),
    where("number" , "==", lessonId )
  )
    const unsubcribe = onSnapshot(lesUsRef, (snapshot) => {
      setLessonActiveUsers(() => {
        const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        return [...list];
      });
    });
    return () => {
      unsubcribe();
    };
  }

  const getOneLesson = async() => {
    const lessonRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/`, lessonId);
    const snap = await getDoc(lessonRef)
    if(snap.exists()){
      setOneLesson({...snap.data() ,id: doc.id})
      // console.log(snap.data())
    }
  };

   // Exam татаж авах
   const examfun = async() => {
    const examRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/exam`, lessonId);
    const snap = await getDoc(examRef)
    if(snap.exists()){
      setExam(snap.data())
      // console.log(snap.data())
    }
  };

  // Translate татаж авах
  const translatefun =async () => {
    const translateRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/translate`, lessonId);
    const snap = await getDoc(translateRef)
    if(snap.exists()){
      setTranslate(snap.data())
      // console.log(snap.data())
    }
  };

  // Word татаж авах
  const wordfun =async () => {
    const wordRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/word`, lessonId);
    const snap = await getDoc(wordRef)
    if(snap.exists()){
      setWord(snap.data())
    }
  };
  // listen download
  const listenfun =async () => {
    const wordRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/listen`, lessonId);
    const snap = await getDoc(wordRef)
    if(snap.exists()){
      setListen(snap.data())
    }
  };

  // Grammar татаж авах
  const grammarfun = async() => {
    const wordRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/grammar`, lessonId);
    const snap = await getDoc(wordRef)
    if(snap.exists()){
      setGrammar(snap.data())
    }
  };

  // Verb татаж авах
  const verbfun = async() => {
    const wordRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/verb`, lessonId);
    const snap = await getDoc(wordRef)
    if(snap.exists()){
      setVerb(snap.data())
    }
  };

  const countCustomer = async(time) =>{
    // if(time > 28){   
      const countRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons`, lessonId);
      await updateDoc(countRef, { viewCustomer: increment(1) });
    // }
   
  }
  const countGrammar =async()=> {
    const countRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons`, lessonId);
    await updateDoc(countRef, { clickGrammar: increment(1) });
  }
  const countWord =async()=> {
    const countRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons`, lessonId);
    await updateDoc(countRef, { clickWord: increment(1) });
  }
  const countVerb =async()=> {
    const countRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons`, lessonId);
    await updateDoc(countRef, { clickVerb: increment(1) });
  }
  const countTranslate =async()=> {
    const countRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons`, lessonId);
    await updateDoc(countRef, { clickTranslate: increment(1) });
  }
  const countListen =async()=> {
    const countRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons`, lessonId);
    await updateDoc(countRef, { clickListen: increment(1) });
  }
  const countExam =async()=> {
    const countRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons`, lessonId);
    await updateDoc(countRef, { clickExam: increment(1) });
  }

  const commentRef = collection(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/comment`);
  const postSend = async (comment, Id, profile, name) => {
    await addDoc(commentRef,
      {
        Id,
        profile,
        name,
        comment,
        authId: auth?.currentUser?.uid,
        createDate: serverTimestamp(),
      }
    );
   alert("success post")
  }
  useEffect(() => {
    const listRef = query(
      collection(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/comment`),
      orderBy("createDate", "desc")
    )
    const unsubscribe = onSnapshot(listRef, (snapshot) => {
      let list = [];
      snapshot.docs.map((doc) => list.push({ ...doc.data(), id: doc.id }));
      setCommentList(list);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const deleteComment =async (id) =>{
    const comment = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/comment`, id)
    await deleteDoc(comment) 
  }



    return {
     
      deleteComment,
      commentList,
      postSend,
      getLessonUsers,
       lanId,
       levelId,
       lessonsId,
       getLevelId,
       getLessonId,
       chGames,
       games,
       join, 
       createGame,
       lessons,
       getLessons,
       getOneLesson,
       oneLesson,
       translate,
       exam,
       word,
       listen,
       grammar,
       verb,
       lessonActiveUsers,
       examfun,
       wordfun,
       translatefun,
       grammarfun,
       listenfun,
       verbfun,
       countCustomer,
       countGrammar,
       countWord,
       countVerb,
       countTranslate,
       countListen,
       countExam

        
    }
}