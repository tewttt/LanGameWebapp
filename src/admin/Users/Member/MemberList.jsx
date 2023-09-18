import React , {useState, useContext} from "react"
import Modal from "../../../components/General/Modal";
import MemberContext from "../../../context/MemberContext";
import {AiFillEdit, AiFillDelete} from "react-icons/ai"

const MemberList = (props) => {
   const ctx = useContext(MemberContext) ;
   const [confirm , setConfirm] = useState(false)

   const showConfirm = () => {
      setConfirm(true)
     };
     const closeConfirm = () => {
      setConfirm(false)
     };
    const remove =  () => {
        const id = props.data.id
        // console.log(id)
        alert("Member delete")
        ctx.deleteMember(id)
        closeConfirm()
    }
   
 return (
    <div  className=" border border-gray-500 text-white rounded-[6px] w-[350px] md:w-[450px]  h-[30px] my-1 mx-4 flex justify-between items-center " >
    <Modal closeConfirm={closeConfirm} show={confirm}>
        <div className="flex flex-col justify-around items-center  h-[100px]">
            <p>Гишүүнийг устгахдаа итгэлтэй байна уу?</p>
            <div>
                <button onClick={closeConfirm} className="mx-3 p-2 rounded-2xl border border-gray-400 hover:border-baseBlue hover:bg-baseBlue hover:text-white">Болих</button>
                <button onClick={remove} className="mx-3 p-2 rounded-2xl border border-gray-400 hover:border-red-500 hover:bg-red-500 hover:text-white">Хэрэглэгч устгах</button>
            </div>
        </div>
    </Modal>
    <img src={props.data.photo} className="w-[25px] h-[25px]"/>
    <div className="mx-1">{props.data.email}</div>
    {/* <div className="mx-1">user id:{props.data.id}</div> */}
    <div className="mx-1">{props.data.phone}</div>
    <AiFillDelete size={20} className="hover:text-baseBlue hover:rotate-12" onClick={showConfirm} />
    {/* <AiFillEdit  size={20} className="hover:text-baseBlue  hover:scale-125" /> */}
</div>
 )
}

export default MemberList;