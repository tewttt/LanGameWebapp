import React from "react";
import { useState} from "react";
import { db} from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  updateDoc,
  deleteDoc,
  setDoc,
  query, where
} from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { getAuth} from "firebase/auth";

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
  const history = useHistory();
  const [state, setState] = useState(initialState);

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
 
  const [userLesson, setUserLesson] = useState([])
// console.log(userLesson)
  const createLesson = async () => {
    // alert("lll")
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
          coin: state.base.coin,
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
      alert("success add lesson")
      // history.push("/teacher")
     
    } catch (err) {
      console.log(err);
    }
  };

  const getUserLessons = (level, chLan) => {
    // console.log(level , chLan)
    const lessonsRef = query(
      collection(db, `lessons/${chLan}/topics/${level}/lessons`),
      where("userAuthId", "==" , auth?.currentUser?.uid),
    )

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
  // console.log(lan , level , number)
    const LessonDoc = doc(db,`lessons/${lan}/topics/${level}/lessons`, number);
    await deleteDoc(LessonDoc);
}

 

  return (
    <LessonContext.Provider
      value={{
        state,
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
        getUserLessons,
        userLesson,
      }}
    >
      {props.children}
    </LessonContext.Provider>
  );
};
export default LessonContext;

