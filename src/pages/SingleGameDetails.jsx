/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GameIdsContext, MyGamesContext, SessionContext } from "../App";
import { IconContext } from "react-icons";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

import GameName from "../ui/GameDetails/GameName";
import GameDescription from "../ui/GameDetails/GameDescription";
import GameScreenShoots from "../ui/GameDetails/GameScreenShoots";
import GamePlatform from "../ui/GameDetails/GamePlatform";
import GameOtherDetails from "../ui/GameDetails/GameOtherDetails";
import useGameDetails from "../services/useGameDetails";
import BigSpinner from "../ui/BigSpinner";
import useDeleteGameFromMyGames from "../services/useDeleteGameFromMyGames";
import useAddGameToMyGames from "../services/useAddGameToMyGames";

function SingleGameDetails() {
  const { gameId } = useParams();
  const gameIds = useContext(GameIdsContext);
  const session = useContext(SessionContext);
  const { myGames, setMyGames } = useContext(MyGamesContext);
  const [isAdded, setIsAdded] = useState(null);
  const userId = session?.user?.id;

  let gId = Number(gameId);

  const { data, gamesStatus, screenshots, screenshotsStatus } =
    useGameDetails(gameId);

  const isSuccess =
    gamesStatus === "success" && screenshotsStatus === "success";

  useEffect(() => {
    if (isSuccess) {
      gameIds.includes(gId) ? setIsAdded(true) : setIsAdded(false);
      document.title = data?.name;
    }
  }, [isSuccess, gId, gameIds, data?.name]);

  async function HandleAdd() {
    setIsAdded(true);
    const status = await useAddGameToMyGames(
      userId,
      gId,
      data.name,
      data.background_image,
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
    <div>
      {isSuccess ? (
        <div className="my-2 rounded-lg pb-8">
          <div>
            <GameName name={data.name} />
            <div className="flex flex-col-reverse justify-center lg:flex-row">
              <div className="w-full px-2 lg:w-7/12 2xl:w-3/6">
                <GameScreenShoots
                  screenshots={screenshots.results}
                  status={screenshotsStatus}
                />
                <GamePlatform data={data} />
                <GameOtherDetails
                  genres={data.genres}
                  tags={data.tags}
                  released={data.released}
                  publishers={data.publishers}
                  score={data.metacritic}
                />
              </div>
              <div className="w-full px-2 lg:w-5/12 2xl:w-2/6">
                <GameDescription description={data.description_raw} />
                {session ? (
                  isAdded ? (
                    <button
                      className="my-4 flex w-full justify-center gap-2 rounded-lg border-2 border-zinc-500 bg-zinc-800 p-2 font-bold text-red-600 shadow-md shadow-zinc-600"
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
                      className="my-4 flex w-full justify-center gap-2 rounded-lg border-2 border-zinc-500 bg-zinc-800 p-2 font-bold text-blue-600 shadow-md shadow-zinc-600"
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
                  <Link
                    className="my-4 block w-full rounded-lg border-2 border-zinc-500 bg-blue-600 p-2 font-bold text-zinc-200 shadow-md shadow-blue-700"
                    to="/sign">
                    Add To My Games
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <BigSpinner />
      )}
    </div>
  );
}

export default SingleGameDetails;
