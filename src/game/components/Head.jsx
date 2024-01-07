import React from "react";
import { AiOutlineStepBackward,  } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { useHistory } from "react-router-dom";
import useGame from "../../hook/useGame";

const Head = (props) => {
  console.log( props.coins)
  const history = useHistory();
  const {deletePlayer} = useGame()
  const logout = () => {
    // deletePlayer(id, currentUser);
  };


  return (
    <div className="h-[30px] mt-[50px] flex justify-between w-full py-2">
      {/* <MdOutlineLogout
        onClick={logout}
        size={18}
        className=" md:w-[30px] md:h-[30px] mx-1 lg:mx-5 hover:text-blue-500 transform duration-500 ease-in-out hover:scale-125"
      />
      <div>{coins}</div> */}
      kkk
    </div>
  );
};

export default Head;
