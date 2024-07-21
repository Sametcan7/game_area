/* eslint-disable react/prop-types */
import { useInfiniteQuery } from "@tanstack/react-query";
import { ImSpinner10 } from "react-icons/im";
import { IconContext } from "react-icons";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import GameCards from "../ui/GameList/GameCards";
import BigSpinner from "../ui/BigSpinner";
import DocumentTitle from "../services/DocumentTitle";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

async function fetchGames({ pageParam }) {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=${pageParam}`,
  );
  const data = await res.json();
  return data;
}

export default function MainPageGameList() {
  DocumentTitle("Game_Area");

  const { data, status, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["gameList"],
    queryFn: fetchGames,
    initialPageParam: 1,
    getNextPageParam: (LastPage, allPages) => {
      return allPages.length + 1;
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <h2 className="py-2 text-center text-2xl font-bold text-zinc-200 lg:py-8 lg:text-4xl">
        ALL GAMES
      </h2>
      {status === "pending" ? <BigSpinner /> : null}

      {status === "success" ? (
        <div className="w-full">
          <div className="grid gap-4 px-2 lg:grid-cols-2 lg:px-4 xl:grid-cols-3 2xl:grid-cols-4">
            <GameCards data={data} />
          </div>
          {isFetching ? (
            <div className="w-full py-2">
              <IconContext.Provider
                value={{
                  className:
                    "global-class-name fill-zinc-800 react-icons mx-auto animate-spin h-full",
                  size: "4rem",
                }}>
                <ImSpinner10 />
              </IconContext.Provider>
            </div>
          ) : (
            <div className="flex w-full justify-center py-2">
              <button
                className="rounded border-2 border-zinc-800 p-2 text-2xl font-medium text-zinc-200"
                ref={ref}
                onClick={() => fetchNextPage()}>
                Load More
              </button>
            </div>
          )}
        </div>
      ) : (
        <BigSpinner />
      )}
    </>
  );
}
