import React from "react";
import { AiOutlineStepBackward } from "react-icons/ai";
import { useHistory } from "react-router-dom";
const Head = () => {
  const history = useHistory();
  const back = () => {
    history.push("/game");
  };
  return (
    <div className="h-[30px] mt-[50px] flex justify-between w-full py-2">
      <AiOutlineStepBackward
        onClick={back}
        size={18}
        className=" md:w-[30px] md:h-[30px] mx-1 lg:mx-5 hover:text-blue-500 transform duration-500 ease-in-out hover:scale-125"
      />
      <div>head</div>
    </div>
  );
};

export default Head;
