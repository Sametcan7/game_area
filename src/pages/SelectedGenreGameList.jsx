/* eslint-disable react/prop-types */
import { ImSpinner10 } from "react-icons/im";
import { IconContext } from "react-icons";
import { useInView } from "react-intersection-observer";
import { useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import useSelectedGenre from "../services/useSelectedGenre";
import GameCards from "../ui/GameList/GameCards";
import BigSpinner from "../ui/BigSpinner";
import DocumentTitle from "../services/DocumentTitle";

export default function SelectedGenreGameList() {
  const QueryClient = useQueryClient();
  let { genreName } = useParams();
  const location = useLocation();
  const title = genreName.toUpperCase().replaceAll("-", " ");

  const { data, status, fetchNextPage, isFetching, refetch, isRefetching } =
    useSelectedGenre(genreName);
  DocumentTitle("Game_Area" + " " + "-" + " " + title);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const reset = useCallback(() => {
    QueryClient.setQueryData(["gameList"], (oldData) =>
      oldData
        ? {
            ...oldData,
            pages: oldData.pages.slice(0, 1),
            pageParams: [1],
          }
        : oldData,
    );
  }, [QueryClient]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    reset();
    refetch();
  }, [location.pathname, refetch, reset]);

  return (
    <main className="w-full bg-zinc-700">
      <h2 className="py-2 text-center text-2xl font-bold text-zinc-200 lg:py-8 lg:text-4xl">
        {title}
      </h2>
      {status === "pending" ? <BigSpinner /> : null}

      {isRefetching ? <BigSpinner /> : null}

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
    </main>
  );
}
