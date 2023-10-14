import React, { useState, useContext, useEffect } from "react";
import Head from "./Head";
import Body from "./Body";
import Footer from "./Footer";
import Spinner from "../components/General/Spinner";
import { useParams } from "react-router-dom";
import GameContext from "../context/GameContext";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const GameDetail = () => {
  const ctx = useContext(GameContext);
  const [game, setGame] = useState("");
  const [player, setPlayer] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (ctx.games) {
      const game = ctx.games.find((item) => item.id === id);
      setGame(game);
    }
  }, [ctx.games]);

  useEffect(() => {
    if (game) {
      const player = game.players.find(
        (item) => item.id === auth.currentUser?.uid
        // item => console.log(item.id)
      );
      setPlayer(player);
    }
  }, [game]);

  const [loader, setLoader] = useState(false);

  const logout = () => {
    ctx.deletePlayer(game, player);
  };

  return (
    <div className="flex flex-col justify-center m-auto text-white h-[660px]  max-w-[400px] ">
      <div>
        <header className="fixed flex h-[50px] w-screen  z-10 items-center justify-between  bg-baseColor ">
          {/* <Logo/> */}
          <div className="flex justify-between " onClick={logout}>
            Гарах
          </div>
        </header>
      </div>

      <div className="flex flex-col  relative  bg-green-600 w-full h-full ">
        {loader && (
          <div className="absolute bg-baseColor">
            <Spinner />
            <div className="text-sm w-full text-center">
              Waiting for other players... 30sec
            </div>
          </div>
        )}
        <Head />
        <Body game={game} />
        <Footer />
      </div>
    </div>
  );
};

export default GameDetail;
