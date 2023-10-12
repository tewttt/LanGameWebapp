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
import { getAuth } from "firebase/auth";
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

//   console.log(lessons);

  const lessonsRef = collection(db, "lessons");

  useEffect(() => {
    const unsubcribe = onSnapshot(lessonsRef, (snapshot) => {
      setLessons((prev) => {
        const list = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      
        list.map((e, i) => {
        
          let topics = [];
          const topicsRef = collection(db, `lessons/${e.id}/topics`);
          const unsubplayer = onSnapshot(topicsRef, (snapshot) => {
            snapshot.docs.map((doc) => {
              topics.push({ ...doc.data(), id: doc.id });
            });

            topics.map((top, i) => {
              let lessons = [];

              const lessonsRef = collection(
                db,
                `lessons/${e.id}/topics/${top.id}/lessons`
              );
              const unTop = onSnapshot(lessonsRef, (snapshot) => {
                snapshot.docs.map((doc) => {
                 
                  lessons.push({ ...doc.data(), id: doc.id });
                });

                lessons.map((les, i) => {
                  
                  let exam = [];
                  const examRef = collection(db, `lessons/${e.id}/topics/${top.id}/lessons/${les.id}/exam`)
                  const unExam = onSnapshot(examRef, (snapshot) => {
                    snapshot.docs.map((doc) => {
                        //  console.log({...doc.data() , id:doc.id})
                        exam.push({...doc.data(), id:doc.id})
                    })
                  })
                  lessons[i].exam=exam

                  let translate = [];
                  const translateRef = collection(db, `lessons/${e.id}/topics/${top.id}/lessons/${les.id}/translate`)
                  const unLes = onSnapshot(translateRef, (snapshot) => {
                    snapshot.docs.map((doc) => {
                        //  console.log({...doc.data() , id:doc.id})
                        translate.push({...doc.data(), id:doc.id})
                    })
                  })
                  lessons[i].translate= translate

                  let word = [];
                  const wordRef = collection(db, `lessons/${e.id}/topics/${top.id}/lessons/${les.id}/word`)
                  const unword = onSnapshot(wordRef, (snapshot) => {
                    snapshot.docs.map((doc) => {
                        //  console.log({...doc.data() , id:doc.id})
                        word.push({...doc.data(), id:doc.id})
                    })
                  })
                  lessons[i].word= word

                  let grammar = [];
                  const grammarRef = collection(db, `lessons/${e.id}/topics/${top.id}/lessons/${les.id}/grammar`)
                  const ungrammar = onSnapshot(grammarRef, (snapshot) => {
                    snapshot.docs.map((doc) => {
                        //  console.log({...doc.data() , id:doc.id})
                        grammar.push({...doc.data(), id:doc.id})
                    })
                  })
                  lessons[i].grammar = grammar

                });
              });
              topics[i].lessons = lessons;
            });
          });

          list[i].topics = topics;
        });

        return [...list];
      });
    });
    return () => {
      unsubcribe();
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
