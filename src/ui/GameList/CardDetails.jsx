/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyGamesContext, SessionContext } from "../../App";
import { IoAddCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { IoIosRemoveCircleOutline } from "react-icons/io";

import useAddGameToMyGames from "../../services/useAddGameToMyGames";
import useDeleteGameFromMyGames from "../../services/useDeleteGameFromMyGames";

function CardDetails({
  name,
  background_image,
  metacritic,
  genres,
  released,
  id,
}) {
  const releasedYear = released?.slice(0, 4);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const genre = genres.map((genre) => genre.name);
  return (
    <div>
      <div className="z-20 m-[-2px] flex h-full flex-col rounded-lg border-2 border-zinc-600 bg-zinc-800 px-1 py-2 font-semibold text-zinc-200 hover:border-zinc-500 hover:shadow-lg hover:shadow-zinc-500 md:px-4">
        <div className="w-full rounded-xl bg-zinc-900">
          <Link onClick={handleScrollToTop} to={`/game/${id}`}>
            <img
              className="aspect-video rounded-xl object-cover"
              src={background_image}></img>
          </Link>
        </div>
        <div className="md:text-md flex flex-1 flex-col gap-1 text-center lg:gap-2 lg:text-lg">
          {name}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {genre.map((genre, i) => {
                return (
                  <div className="rounded-xl bg-zinc-700 px-3" key={i}>
                    {genre}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ml-auto">Score: {metacritic}</div>
          <div className="ml-auto w-max">
            <div>Released: {releasedYear ? releasedYear : "Unknown"}</div>
          </div>
          <MyGames gameId={id} gameName={name} gameImage={background_image} />
        </div>
      </div>
    </div>
  );
}

function MyGames({ gameId, gameName, gameImage }) {
  const session = useContext(SessionContext);
  const { myGames, setMyGames } = useContext(MyGamesContext);
  const [isAdded, setIsAdded] = useState(false);

  const userId = session?.user?.id;

  useEffect(() => {
    let gameIds = myGames.map(({ game_id }) => game_id);

    if (gameIds.includes(gameId)) setIsAdded(true);
  }, [gameId, myGames]);

  async function HandleAdd() {
    setIsAdded(true);
    const status = await useAddGameToMyGames(
      userId,
      gameId,
      gameName,
      gameImage,
      setMyGames,
    );
    setIsAdded(status);
  }

  async function HandleDelete() {
    setIsAdded(false);
    const status = await useDeleteGameFromMyGames(myGames, setMyGames, gameId);
    setIsAdded(status);
  }

  return (
    <div className="my-2 mt-auto">
      {userId ? (
        isAdded ? (
          <button
            className="mx-auto flex items-center gap-2 rounded-full bg-zinc-700 px-4 py-1 text-red-500"
            disabled={!isAdded}
            onClick={(e) => {
              e.preventDefault();
              HandleDelete();
            }}>
            Remove From My Games
            <span>
              <IconContext.Provider value={{ size: "25px" }}>
                <IoIosRemoveCircleOutline />
              </IconContext.Provider>
            </span>
          </button>
        ) : (
          <button
            className="mx-auto flex items-center gap-2 rounded-full bg-zinc-700 px-2 py-1 text-blue-500 lg:px-4"
            disabled={isAdded}
            onClick={(e) => {
              e.preventDefault();
              HandleAdd();
            }}>
            Add To My Games
            <span>
              <IconContext.Provider value={{ size: "25px" }}>
                <IoAddCircleOutline />
              </IconContext.Provider>
            </span>
          </button>
        )
      ) : (
        <Link className="rounded-full bg-zinc-700 px-2 py-1" to={"/sign"}>
          Sign To Add My Games
        </Link>
      )}
    </div>
  );
}

export default CardDetails;
