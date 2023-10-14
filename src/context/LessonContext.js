import React from "react";
import { useState } from "react";
import { db, storage } from "../firebase";
import {
  doc,
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
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
export const LessonStore = (props) => {
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
  }, []);

  const Language = () => {
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

  const Level = (chLan) => {
    const levelRef = collection(db, `lessons/${chLan}/topics`);
    const unsubcribe = onSnapshot(levelRef, (snapshot) => {
      setLevelId(() => {
        const list = snapshot.docs.map((doc) => {
          return { id: doc.id };
          // return { ...doc.data(), id: doc.id };
        });
        console.log(list);
        return [...list];
      });
    });
    return () => {
      unsubcribe();
    };
  };

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
  // console.log(id, chLan, chLevel);
  // console.log(lesson)
  // console.log(exam);
  // console.log(translate)
  // console.log(word)
  // console.log(grammar)


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

  const examfun = () => {
    const examRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${id}/exam`,
      id
    );
    onSnapshot(examRef, (doc) => {
      setExam( doc.data() );
    });
  };

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
  const grammarfun = () => {
    const grammarRef = doc(
      db,
      `lessons/${chLan}/topics/${chLevel}/lessons/${id}/grammar`,
      id
    );
    onSnapshot(grammarRef, (doc) => {
      setTranslate(doc.data());
    });
  };

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
      alert("Хичээл амжилттай үүслээ");
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
        grammar,

        createLesson,
        saveBase,
        saveExam,
        saveGrammar,
        saveImage,
        saveNewWord,
        saveTranslate,
        saveVideo,
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
