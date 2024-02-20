import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserStore } from "./context/UserContext";
import { LessonStore } from "./context/LessonContext";
import { MemberStore } from "./context/MemberContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <LessonStore>
        <UserStore>
          <MemberStore>
            <App />
          </MemberStore>
        </UserStore>
      </LessonStore>
    </BrowserRouter>
  // </React.StrictMode>
);


reportWebVitals();


  