import React, { useState, useEffect, useContext } from "react";
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
  increment,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase.js";
import { useHistory } from "react-router-dom";
import {getAuth} from "firebase/auth";
import UserContext from "../context/UserContext.js"


const auth = getAuth();

let unsubcribeGames;

export default function useLesson(languageId, topicId, lessonId) {
    const history = useHistory();
    const lessonsRef = collection(db, "lessons");
    const [lanId, setLanId] = useState([]);
    const [levelId, setLevelId] = useState([]);
    const [lessonsId, setLessonId] = useState([]);
    const [games, setGames] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [oneLesson , setOneLesson] = useState({})
    const [exam, setExam] = useState([]);
    const [translate, setTranslate] = useState([]);
    const [word, setWord] = useState([]);
    const [grammar, setGrammar] = useState([]);
    const [lessonActiveUsers, setLessonActiveUsers] = useState({})


  
    useEffect(() => {
        getLanguageId();
        
        return () => {
            unsubcribeGames && unsubcribeGames();
        };
    }, []);

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
        await chGames(chLan, chLevel, chLesson)
        const id = game.id;

        if (game.count <= 4) {
        const data = game.players.find((e, i) => e.id === auth?.currentUser?.uid);
        if (data) {
            alert("Тоглоом руу буцлаа");

            return history.push(
            `/newGame/${id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`
            );
        }

        const PlayersRef = doc(db, `game/${id}/players`, state.authId);
        const add = setDoc(PlayersRef, {
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
        
        });
        
        alert("Тоглогч нэмэгдлээ");
        history.push(
            `/newGame/${id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`
        );

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

        // oneGame(id);
        return;
        } else if (game.count >= 4) {
        alert("Тоглогч бүрдсэн байна, Өөр ширээ сонгоно уу");
        history.push("/game");
        }

    };

    const createGame = async (state, chLan, chLevel, chLesson , entry , authId, win , second) => {
        const questions = await examfunGame(chLan, chLevel, chLesson);
        await chGames(chLan, chLevel, chLesson)
        try {

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
            entryCoin: entry
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
        
        });

        const data = {
            coin: entry,
            label: "play game",
            labelType: "game",
            type: "withdraw"
        }

        
            const oneRef = collection(db, `users/${authId}/transaction` );
            await addDoc(oneRef , {
            data,
            createDate: serverTimestamp(),
            
            } )
            .then((res) => { 
            alert("togloom ru newterlee")
            history.push(
                `/newGame/${game.id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`
            );
            })
            .catch((error) => {
            console.log("error" + error);
            });
        
        // Тоглогчдыг тоог авж байна
        // const PlRef = collection(db, `game/${game.id}/players`);
        // const snapshot = await getCountFromServer(PlRef);
        // const count = snapshot.data().count;
        // const GameNewRef = doc(db, "game", game.id);
        // await updateDoc(GameNewRef, { count: count });

        // history.push(
        //   `/newGame/${game.id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`
        // );
        } catch (err) {
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

    
  // filt Lessons
  const getLessons = (level, chLan) => {
    const lessonsRef = collection(
      db,
      `lessons/${chLan}/topics/${level}/lessons`
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

  const getLessonUsers = () => {
    // console.log(languageId , topicId, lessonId)
    const lesUsRef = (collection(db, "lessonActiveUser"))
  //   const lesUsRef = query(collection(db, "lessonActiveUser"),
  //   where("userId" , "==" , auth?.currentUser?.uid),
  //   where("lan" , "==", languageId ),
  //   where("level" , "==", topicId ),
  //   where("number" , "==", lessonId )
  // )
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
  //  onSnapshot(lesUsRef ,(snapshot) => {
  //   snapshot.forEach((doc) => {
  //      const data= doc.data()
  //      setLessonActiveUsers(data)
  //   })
  //  })

  }

  const getOneLesson = async() => {
    const lessonRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/`, lessonId);
    const snap = await getDoc(lessonRef)
    if(snap.exists()){
      setOneLesson({...snap.data() ,id: doc.id})
      // console.log(snap.data())
    }
   
    // translatefun()
    // examfun()
    // grammarfun()
    // wordfun()
    
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

  // Grammar татаж авах
  const grammarfun = async() => {
    const wordRef = doc(db, `lessons/${languageId}/topics/${topicId}/lessons/${lessonId}/grammar`, lessonId);
    const snap = await getDoc(wordRef)
    if(snap.exists()){
      setGrammar(snap.data())
    }
  };
    

    return {
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
       grammar,
       lessonActiveUsers,
       examfun,
       wordfun,
       translatefun,
       grammarfun

        
    }
}