import React from "react";
import { useState, useContext } from "react";
import { db, storage } from "../firebase";
import { useHistory } from "react-router-dom";
import {
  doc,
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  getCountFromServer,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import UserContext from "./UserContext";

const auth = getAuth();
const LessonContext = React.createContext();
const initialState = {
  base: [],
  translate: [],
  exam: [],
  image: [],
  video: [],
  grammar: [],
  newWord: [],
};
const getState = {
  base: [],
  translate: [],
  exam: [],
  image: [],
  video: [],
  grammar: [],
  newWord: [],
};
let unsubcribeGames;
export const LessonStore = (props) => {
  const history = useHistory();
  const ctx = useContext(UserContext)
 
  const [state, setState] = useState(initialState);
  const [lessons, setLessons] = useState([]);

  const saveBase = (base) => {
    setState({ ...state, base: base });
  };
  const saveExam = (quiz) => {
    setState({ ...state, exam: quiz });
  };
  const saveTranslate = (questions) => {
    setState({ ...state, translate: questions });
  };
  const saveImage = (downloadURL) => {
    setState({ ...state, image: downloadURL });
  };
  const saveVideo = (downloadURL) => {
    setState({ ...state, video: downloadURL });
  };
  const saveGrammar = (downloadURL) => {
    setState({ ...state, grammar: downloadURL });
  };
  const saveNewWord = (questions) => {
    setState({ ...state, newWord: questions });
  };

  const lessonsRef = collection(db, "lessons");
  const [lanId, setLanId] = useState([]);
  const [levelId, setLevelId] = useState([]);
  const [lessonsId, setLessonsId] = useState([]);
  const [userLesson, setUserLesson] = useState([])

  useEffect(() => {
    Language();

    return () => {
      unsubcribeGames && unsubcribeGames();
    };
  }, []);
  const createLesson = async () => {
    try {
      const lessRef = doc(db, "lessons", state.base.language);
      const add = await setDoc(lessRef, {
        language: state.base.language,
      
      });
      await setDoc(
        doc(db, `lessons/${state.base.language}/topics`, state.base.level),
        {
          level: state.base.level,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state.base.language}/topics/${state.base.level}/lessons`,
          state.base.lessonNumber
        ),
        { language: state.base.language,
          level: state.base.level,
          lessonNumber: state.base.lessonNumber,
          userAuthId: auth.currentUser?.uid,
          name: state.base.name,
          price: state.base.price,
          status: state.base.status,
          text: state.base.text,
          video: state.video,
          image: state.image,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state.base.language}/topics/${state.base.level}/lessons/${state.base.lessonNumber}/exam`,
          state.base.lessonNumber
        ),
        {
          exam: state.exam,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state.base.language}/topics/${state.base.level}/lessons/${state.base.lessonNumber}/translate`,
          state.base.lessonNumber
        ),
        {
          translate: state.translate,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state.base.language}/topics/${state.base.level}/lessons/${state.base.lessonNumber}/word`,
          state.base.lessonNumber
        ),
        {
          word: state.newWord,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state.base.language}/topics/${state.base.level}/lessons/${state.base.lessonNumber}/grammar`,
          state.base.lessonNumber
        ),
        {
          grammar: state.grammar,
        }
      );
     
    } catch (err) {
      console.log(err);
    }
  };

  // Language ID
  const Language = (lan) => {
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
  const Level = (chLan) => {
    const levelRef = collection(db, `lessons/${chLan}/topics`);
    const unsubcribe = onSnapshot(levelRef, (snapshot) => {
      setLevelId(() => {
        const list = snapshot.docs.map((doc) => {
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
  const Lessons = (level, chLan) => {
    const lessonsRef = collection(
      db,
      `lessons/${chLan}/topics/${level}/lessons`
    );
    const unsubcribe = onSnapshot(lessonsRef, (snapshot) => {
      setLessonsId(() => {
        const list = snapshot.docs.map((doc) => {
          return { id: doc.id };
        });
        return [...list];
      });
    });
    return () => {
      unsubcribe();
    };
  };

  const userLessons = (level, chLan) => {
    const lessonsRef = collection(
      db,
      `lessons/${chLan}/topics/${level}/lessons`
    );
    const unsubcribe = onSnapshot(lessonsRef, (snapshot) => {
      setUserLesson(() => {
        const list = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        return [...list];
      });
    });
    return () => {
      unsubcribe();
    };
  };

  const [lesson, setLesson] = useState([]);
  const [id, setId] = useState("");
  const [chLan, setChLan] = useState("");
  const [chLevel, setChLevel] = useState("");
  const [exam, setExam] = useState([]);
  const [translate, setTranslate] = useState([]);
  const [word, setWord] = useState([]);
  const [grammar, setGrammar] = useState([]);
  const [games, setGames] = useState([]);

  // Lesson хичээл татаж авах
  const Lesson = (id, chLan, chLevel) => {
    // console.log(id)
    setId(id);
    setChLan(chLan);
    setChLevel(chLevel);
    const lessonRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/`,
      id
    );
    onSnapshot(lessonRef, (doc) => {
      setLesson(doc.data(), doc.id);
    });
    translatefun()
    examfun()
    grammarfun()
    wordfun()
  };
  // Exam татаж авах
  const examfun = () => {
    const translateRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${id}/exam`,
      id
    );
    onSnapshot(translateRef, (doc) => {
      // console.log(doc.data())
      setExam(doc.data());
    });
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

  // Translate татаж авах
  const translatefun = () => {
    const translateRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${id}/translate`,
      id
    );
    onSnapshot(translateRef, (doc) => {
      setTranslate(doc.data());
    });
  };
  // Word татаж авах
  const wordfun = () => {
    const wordRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${id}/word`,
      id
    );
    onSnapshot(wordRef, (doc) => {
      setWord(doc.data());
    });
  };
  // Grammar татаж авах
  const grammarfun = () => {
    const grammarRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${id}/grammar`,
      id
    );
    onSnapshot(grammarRef, (doc) => {
      setGrammar(doc.data());
    });
  };

  // Game page дээр Games харагдах
  const chGames = async (chLan, chLevel, chLesson) => {
    const q = query(
      collection(db, "game"),
      where("language", "==", chLan),
      where("level", "==", chLevel),
      where("lesson", "==", chLesson)
    );
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
    setChLan(chLan);
    setChLevel(chLevel);
    setId(chLesson);

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
        winCoin: win,
        secondCoin: second
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
        endGame: false
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
        winCoin: win,
        secondCoin: second
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

  const updateDB = async (lan, level, number) => {
    await updateDoc(
      doc(db,`lessons/${lan}/topics/${level}/lessons`,number),
      {
        name: state.base.name,
        price: state.base.price,
        status: state.base.status,
        text: state.base.text,
        video: state.video,
        image: state.image,
      }
    );
    await updateDoc(
      doc(db,`lessons/${lan}/topics/${level}/lessons/${number}/exam`, number),
      {
        exam: state.exam,
      }
    );
    await updateDoc(
      doc(db,`lessons/${lan}/topics/${level}/lessons/${number}/translate`, number),
      {
        translate: state.translate,
      }
    );
    await updateDoc(
      doc(db,`lessons/${lan}/topics/${level}/lessons/${number}/word`, number),
      {
        word: state.newWord,
      }
    );
    await updateDoc(
      doc(db,`lessons/${lan}/topics/${level}/lessons/${number}/grammar`, number),
      {
        grammar: state.grammar,
      }
    );
    alert("lesson enlish update")

}

const deleteDB = async (lan, level, number) => {
    const LessonDoc = doc(db,`lessons/${lan}/topics/${level}/lessons`, number);
    await deleteDoc(LessonDoc);
}

 

  return (
    <LessonContext.Provider
      value={{
        state,
        lessons,
        lanId,
        levelId,
        lessonsId,
        lesson,
        Level,
        Lessons,
        Lesson,
        Language,
        examfun,
        translatefun,
        wordfun,
        grammarfun,
        exam,
        translate,
        word,
        join,
        grammar,
        games,
        createGame,
        chGames,
        createLesson,
        saveBase,
        saveExam,
        saveGrammar,
        saveImage,
        saveNewWord,
        saveTranslate,
        saveVideo,
        updateDB,
        deleteDB,
        userLessons,
        userLesson
       
        // getQuestions,
        // createQuestions,
      }}
    >
      {props.children}
    </LessonContext.Provider>
  );
};
export default LessonContext;

//   useEffect(() => {
//     const unsubcribe = onSnapshot(lessonsRef, (snapshot) => {
//       let lessonsList = [];
//       snapshot.docs.map((doc) =>
//         lessonsList.push({
//           // console.log(...doc.data())
//           ...doc.data(),
//             id: doc.id,
//         })
//       );
//       setLessons(lessonsList);

//     });
//     return () => {
//       unsubcribe();
//     };
//   }, []);

//   const createLesson = async () => {
//     const lessonsRef = doc(
//       db,
//       `lessons/${state.base.language}/topics/${state.base.level}/lessons/`,
//       state.base.lessonNumber
//     );
//     try {
//       await setDoc(lessonsRef, {
//         userAuthId: auth.currentUser?.uid,
//         name: state.base.name,
//         price: state.base.price,
//         status: state.base.status,
//         text: state.base.text,
//         video: state.video,
//         image: state.image,
//       });
//       const dataRef = doc(
//         db,
//         `lessons/${state.base.language}/topics/${state.base.level}/lessons/${state.base.lessonNumber}/exam/`,
//         state.base.lessonNumber
//       );
//       const exam = await setDoc(dataRef, {
//         exam: state.exam,
//       });

//       const translate = await setDoc(
//         doc(
//           db,
//           `lessons/${state.base.language}/topics/${state.base.level}/lessons/${state.base.lessonNumber}/translate/`,
//           state.base.lessonNumber
//         ),
//         {
//           exam: state.translate,
//         }
//       );
//       const word = await setDoc(
//         doc(
//           db,
//           `lessons/${state.base.language}/topics/${state.base.level}/lessons/${state.base.lessonNumber}/word/`,
//           state.base.lessonNumber
//         ),
//         {
//           exam: state.newWord,
//         }
//       );
//       const grammar = await setDoc(
//         doc(
//           db,
//           `lessons/${state.base.language}/topics/${state.base.level}/lessons/${state.base.lessonNumber}/grammar/`,
//           state.base.lessonNumber
//         ),
//         {
//           exam: state.grammar,
//         }
//       );

//       alert("Хичээл амжилттай үүслээ");
//     } catch (err) {
//       console.log(err);
//     }
//   };
