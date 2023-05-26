import React, {useState} from "react";
import css from "./style.module.css";
import Button from "../Button";

const Comment = () => {
    const [comment, setComment] = useState("");
    const changeComment = (e) => {
        setComment(e.target.value)
    }
    const save = () => {
       
    }
    return (
        <div className={css.comments} >Comments
            <div className={css.comment}>{comment}</div>
            <div>
                <input onChange={changeComment} type="text" placeholder="Сэтгэгдэлээ бичнэ үү" />
            </div>
            <Button daragdsan={save} text="Хадгалах"/>
        </div>
    )
}
export default Comment;{}