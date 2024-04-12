import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import usePost from "../../hook/usePost";
import Modal from "../../components/General/Modal"
import useAds from "../../hook/useAds"

const PostCard = ({data}) => {
    const history = useHistory()
    const { deletePost} = usePost();
    const {deletePostAds} = useAds()
    const [show, setShow] = useState(false)
    const edit = () => {
        history.push(`/editpost/${data.id}`)
    }
    // console.log(data)
    const remove = () => {
        deletePost(data.id)
        deletePostAds(data.id)
    }
   
    return (
        <div className="w-full sm:w-[340px] m-2 border border-helpGray p-2 rounded-2xl">
            <Modal show={show} >
                <div className="flex flex-col">
                    <p className="text-lg my-3 text-center">Are you sure delete the post ?</p>
                    <div className="flex justify-between">
                        <button  
                            className="bg-green-500 w-1/2 rounded-2xl p-2 mx-1 text-white"
                            onClick={() => setShow(false)}>NO</button>
                        <button 
                        className="bg-red-500 w-1/2 text-white  p-2 mx-1 rounded-2xl"
                        onClick={remove}>Yes, delete post</button>
                    </div>
                </div>
            </Modal>
            <button 
                className="bg-baseBlue1 w-full rounded-2xl p-2 font-semibold hover:bg-blue-600" 
                onClick={() =>history.push(`/addAds/${data.id}`)}>Add advertise
            </button>
            <div className="rounded-2xl my-2 w-full p-2 text-base">
                <p className="text-xl text-center">Post information</p>
                <div className="my-2">
                    <div className="my-2">
                        <div className="flex flex-col  my-1 py-1">
                            <p className="mr-1 text-gray-400">Title</p>
                            <p>{data.post.title}</p>
                        </div>
                        <div className="flex flex-col my-1 py-1">
                            <p className="mr-1 text-gray-400">Text </p>
                            <p>{data.post.text}</p>
                        </div>
                        <div className="flex flex-col my-1 py-1">
                            <p className="mr-1 text-gray-400">Phone</p>
                            <p>{data.post.phone}</p>
                        </div>
                        <div className="flex flex-col my-1 py-1">
                            <p className="mr-1 text-gray-400">Address</p>
                            <p>{data.post.address}</p>
                        </div>
                        <div className="flex flex-col my-1 py-1">
                            <p className="mr-1 text-gray-400">Email</p>
                            <p>{data.post.email}</p>
                        </div>
                        
                    </div>

                    <video 
                        className="my-2 w-full"
                        src={data?.post?.video}  type="video/mp4" controls>
                    </video>
                    {data?.post?.instagramLink != "" &&
                    <div className="flex w-full text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                        <a href={data?.post?.instagramLink} target="_blank" rel="video" className=" w-full p-2 text-center">
                            Instagram visit 
                        </a>
                    </div>
                    }
                    {data?.post?.facebookLink != "" &&
                    <div className="flex w-full  text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                        <a href={data?.post?.facebookLink} target="_blank" rel="video" className=" w-full p-2 text-center">
                            Facebook visit 
                        </a>
                    </div>
                    }
                    {data?.post?.link != "" &&
                    <div className="flex w-full  text-white hover:bg-blue-700  bg-baseBlue1 justify-center rounded-2xl py-2 px-4 my-3 border border-baseColor">
                        <a href={data?.post?.link} target="_blank" rel="video" className=" w-full p-2 text-center">
                            visit 
                        </a>
                    </div>
                    }
                    {/* <div className="flex justify-between text-[12px] text-helpGray">
                        <div className="flex w-[70px] justify-between">
                            <p>100</p>
                            <p>Reach</p>
                        </div>
                        <div className="flex w-[70px] justify-between">
                            <p>$10</p>
                            <p>Spent</p>
                        </div>
                    </div> */}
                </div>
           
                <div className="flex justify-between my-2 w-full">
                    <button 
                        className="bg-green-500 mr-1 w-1/2 py-2 px-3 font-semibold rounded-xl hover:bg-green-800"
                        onClick={edit}>Edit post 
                    </button>
                    <button 
                        className="bg-red-600 ml-1 py-2 w-1/2 px-3 font-semibold rounded-xl hover:bg-red-800"
                        onClick={() => setShow(true)}>Delete Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostCard