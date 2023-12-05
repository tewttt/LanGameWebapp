import React from "react";
import { useState } from "react";
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
        {
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
      const questionsRef = collection(db, "questions");
      await addDoc(questionsRef, {
        createDate: serverTimestamp(),
        language: state.base.language,
        level: state.base.level,
        lesson: state.base.lessonNumber,
        exam: state.exam,
        translate: state.translate,
        word: state.newWord,
      });
      alert("Хичээл амжилттай үүслээ");

      const teachRef = collection(db, `teacher/${auth?.currentUser?.uid}/${state.base.language}`);
          await addDoc(teachRef, {
            createDate: serverTimestamp(),
            language: state.base.language,
            level: state.base.level,
            lesson: state.base.lessonNumber,
          
          });

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

  const [lesson, setLesson] = useState([]);
  const [id, setId] = useState("");
  const [chLan, setChLan] = useState("");
  const [chLevel, setChLevel] = useState("");
  const [exam, setExam] = useState([]);
  const [translate, setTranslate] = useState([]);
  const [word, setWord] = useState([]);
  const [grammar, setGrammar] = useState([]);
  const [games, setGames] = useState([]);

  // console.log(chLan, chLevel, id);
  // console.log(exam);
  // Lesson хичээл татаж авах
  const Lesson = (id, chLan, chLevel) => {
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
  };
  // Exam татаж авах
  const examfun = async (chLan, chLevel, chLesson) => {
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

  const join = async (state, game, chLan, chLevel, chLesson) => {
    await chGames(chLan, chLevel, chLesson)
    const id = game.id;
    setChLan(chLan);
    setChLevel(chLevel);
    setId(chLesson);

    if (game.count < 4) {
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
        color: ""
      });
    
      alert("Тоглогч нэмэгдлээ");
      history.push(
        `/newGame/${id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`
      );
      // history.push(`/newGame/${id}/${chLan}/${chLevel}/${chLesson}`);
      // history.push(`/newGame/${id}`);

      // const PlRef = collection(db, `game/${game.id}/players`);
      // const snapshot = await getCountFromServer(PlRef);
      // const count = snapshot.data().count;
      // // console.log(count);
      // const GameNewRef = doc(db, "game", game.id);
      // await updateDoc(GameNewRef, { count: count });

      if (game.count == 2) {
        updateDoc(PlayersRef, {
          color: "blue",
        });
      } else if (game.count == 3) {
        updateDoc(PlayersRef, {
          color: "orange",
        });
      } else if (game.count == 4) {
        updateDoc(PlayersRef, {
          color: "purple",
        });
      }

      // oneGame(id);
      return;
    } else if (game.count > 4) {
      alert("Тоглогч бүрдсэн байна, Өөр ширээ сонгоно уу");
      history.push("/game");
    }
  };

  const createGame = async (state, chLan, chLevel, chLesson) => {
    const questions = await examfun(chLan, chLevel, chLesson);
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

      history.push(
        `/newGame/${game.id}?lan=${chLan}&level=${chLevel}&lesson=${chLesson}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  // const updateEnglishDB = async (id) => {
  //     // preventDefault();
  //     const updateLesson = doc(db, "english" ,id)
  //     await updateDoc(updateLesson, {state: state})
  //     alert("lesson enlish update")

  // }

  // const deleteEnglishDB = async (id) => {
  //     console.log(id)
  //     const LessonDoc = doc(db, "english", id);
  //     await deleteDoc(LessonDoc);
  //     // getEnglishList();
  // }

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
