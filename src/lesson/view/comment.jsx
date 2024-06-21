import React, { useContext, useState } from "react";
import moment from "moment"
import { MdDelete } from "react-icons/md";
import UserContext from "../../context/UserContext";
import {  useHistory ,useParams} from "react-router-dom";
import useLesson from "../../hook/useLesson";
import Modal from "../../components/General/Modal"

const CommentView = (data) => {
    const {languageId, topicId, lessonId} = useParams()
    const {deleteComment} = useLesson(languageId, topicId, lessonId)
    const ctx = useContext(UserContext)
    const [show, setShow] = useState(false)

    const dbID= data?.data?.id
    const del =()=>{
        deleteComment(dbID)
    }
  return (
    <div className="text-white border rounded-lg p-2 w-full sm:w-[80%] lg:w-[40%]"> 
      <div className="flex flex-row text-gray-500 text-base w-full justify-between">
        <img src={data?.data?.profile} className="w-6 aspect-auto"/>
        <p>{data?.data?.name}</p>
        <p>{data?.data?.Id}</p>
        <p> {moment(data?.data?.createDate?.toDate()).calendar()}</p>   
        {(ctx?.currentUser?.authId === data?.data?.authId || ctx?.currentUser?.role === "admin" ) &&  
            <MdDelete 
                size={24}
                onClick ={() => setShow(true)}
                className="text-helpGreen hover:text-green-600"
            />
        }
        <Modal show={show}>
          <div className="flex flex-col">
              <p className="text-lg my-3 text-center">Are you sure delete the comment?</p>
              <div className="flex justify-between w-full md:w-[70%] m-auto">
                  <button  
                      className="bg-green-500 w-1/2 rounded-2xl p-2 mx-1 text-white"
                      onClick={() => setShow(false)}>NO</button>
                  <button 
                  className="bg-red-500 w-1/2 text-white  p-2 mx-1 rounded-2xl"
                  onClick={del}>Yes, delete</button>
              </div>
          </div>
        </Modal>
      </div>
      <p className="text-lg mt-4">{data?.data?.comment}</p>
    </div>
  )
}
export default CommentView


  