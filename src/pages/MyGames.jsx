import { useContext } from "react";
import { MyGamesContext } from "../App";
import { Link } from "react-router-dom";
import useDeleteGameFromMyGames from "../services/useDeleteGameFromMyGames";
import DocumentTitle from "../services/DocumentTitle";

function MyGames() {
  const { myGames, setMyGames } = useContext(MyGamesContext);
  DocumentTitle("My Games");

  async function HandleDelete(g) {
    await useDeleteGameFromMyGames(myGames, setMyGames, g);
  }

  return (
    <div className="h-[calc(100%-var(--header-height))] w-full bg-zinc-700">
      <div className="px-1 py-2 md:p-4">
        <ul className="w-full font-bold text-zinc-200 lg:px-20">
          {myGames.length > 0 ? (
            <>
              <div>
                <p className="text-zinc-200 lg:text-2xl">My Games</p>
              </div>
              {myGames.map((game) => (
                <Link
                  to={`/game/${game.game_id}`}
                  className="my-1 flex items-center justify-between rounded-md border-2 border-zinc-600 bg-zinc-800 px-1 lg:m-2 lg:px-4"
                  key={game.game_id}>
                  <div className="flex flex-1 items-center">
                    {game.game_name}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      HandleDelete(game.game_id);
                    }}>
                    <span className="rounded-lg bg-red-600 px-2 py-1 text-zinc-200 md:px-4 md:py-2">
                      Remove
                    </span>
                  </button>
                  <div className="h-10 w-20 pl-1 sm:h-20 sm:w-40 lg:p-2">
                    <img
                      className="aspect-video h-full w-full rounded-md object-fill"
                      src={game.game_image}></img>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <div>
              <p className="text-zinc-200">
                No games have been added to my games!
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MyGames;
