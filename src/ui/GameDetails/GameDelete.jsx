/* eslint-disable react/prop-types */
import useDeleteGameFromMyGames from "../../services/useDeleteGameFromMyGames";

function GameDelete({ myGames, setMyGames, gameId }) {
  function HandleDeleteGame(game) {
    useDeleteGameFromMyGames(myGames, setMyGames, game);
  }

  return (
    <button
      className="my-4 w-full rounded-lg border-2 border-zinc-500 bg-red-600 p-2 font-bold text-zinc-200 shadow-md shadow-red-700"
      onClick={(e) => {
        e.preventDefault();
        HandleDeleteGame(gameId);
      }}>
      Remove
    </button>
  );
}

export default GameDelete;
