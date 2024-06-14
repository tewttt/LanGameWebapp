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
  listen: [],
  verb: []
};


export const LessonStore = (props) => {
  const [state, setState] = useState(initialState);

  const saveBase = (base) => {
    setState({ ...state, base: base });
  };
  const saveExam = (quiz) => {
    setState({ ...state, exam: quiz });
  };
  const saveTranslate = (questions) => {
    // console.log(questions)
    setState({ ...state, translate: questions });
  };
  const saveImage = (downloadURL) => {
    setState({ ...state, image: downloadURL });
  };
  const saveVideo = (downloadURL) => {
    setState({ ...state, video: downloadURL });
  };
  const saveGrammar = (questions) => {
    setState({ ...state, grammar: questions });
  };
  const saveVerb = (questions) => {
    setState({ ...state, verb: questions });
  };
  const saveNewWord = (questions) => {
    setState({ ...state, newWord: questions });
  };
  const saveListen = (questions) => {
    // console.log(questions)
    setState({ ...state, listen: questions });
  };
 
  const [userLesson, setUserLesson] = useState([])
// console.log(userLesson)
  const createLesson = async () => {
    try {
      const lessRef = doc(db, "lessons", state.base.language);
      await setDoc(lessRef, {
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
        { language: state?.base?.language,
          level: state?.base?.level,
          lessonNumber: state?.base?.lessonNumber,
          userAuthId: auth?.currentUser?.uid,
          name: state?.base?.name,
          price: state?.base?.price,
          coin: state?.base?.coin,
          status: state?.base?.status,
          text: state?.base?.text,
          video: state?.video,
          image: state?.image,
          acceptStatus: "request",
          viewCustomer: 0
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state?.base?.language}/topics/${state?.base?.level}/lessons/${state?.base?.lessonNumber}/exam`,
          state?.base?.lessonNumber
        ),
        {
          exam: state?.exam,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state?.base?.language}/topics/${state?.base?.level}/lessons/${state?.base?.lessonNumber}/translate`,
          state?.base?.lessonNumber
        ),
        {
          translate: state?.translate,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state?.base?.language}/topics/${state?.base?.level}/lessons/${state?.base?.lessonNumber}/word`,
          state?.base?.lessonNumber
        ),
        {
          word: state?.newWord,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state?.base?.language}/topics/${state?.base?.level}/lessons/${state?.base?.lessonNumber}/grammar`,
          state?.base?.lessonNumber
        ),
        {
          grammar: state?.grammar,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state?.base?.language}/topics/${state?.base?.level}/lessons/${state?.base?.lessonNumber}/listen`,
          state?.base?.lessonNumber
        ),
        {
          listen: state?.listen,
        }
      );
      await setDoc(
        doc(
          db,
          `lessons/${state?.base?.language}/topics/${state?.base?.level}/lessons/${state?.base?.lessonNumber}/verb`,
          state?.base?.lessonNumber
        ),
        {
          verb: state?.verb,
        }
      );
      alert("success add lesson")
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
// console.log(state)
  const updateDB = async (lan, level, number) => {
    await updateDoc(
      doc(db,`lessons/${lan}/topics/${level}/lessons`,number),
      {
        name: state?.base?.name,
        price: state?.base?.price,
        status: state?.base?.status,
        text: state?.base.text,
        // video: state.video,
        // image: state.image,
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
    await updateDoc(
      doc(db,`lessons/${lan}/topics/${level}/lessons/${number}/listen`, number),
      {
        listen: state.listen,
      }
    );
    await updateDoc(
      doc(db,`lessons/${lan}/topics/${level}/lessons/${number}/verb`, number),
      {
        verb: state.verb,
      }
    );
    alert("lesson enlish update")
}

const updateVideo = async (lan, level, number, video)=>{
  console.log(lan, level, number, video)
  await updateDoc(
    doc(db,`lessons/${lan}/topics/${level}/lessons`,number),
    {
      video:video,
    }
  );
  alert("update video")
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
        saveListen,
        saveVideo,
        saveVerb,
        updateDB,
        deleteDB,
        getUserLessons,
        userLesson,
        updateVideo
      }}
    >
      {props.children}
    </LessonContext.Provider>
  );
};
export default LessonContext;

