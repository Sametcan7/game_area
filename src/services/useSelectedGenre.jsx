import { useInfiniteQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function useSelectedGenre(genreName) {
  const { data, status, fetchNextPage, isFetching, refetch, isRefetching } =
    useInfiniteQuery({
      queryKey: ["gameList"],
      queryFn: async function fetchGames({ pageParam }) {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreName}&page=${pageParam}`,
        );
        const data = await res.json();
        return data;
      },
      initialPageParam: 1,
      getNextPageParam: (LastPage, allPages) => {
        return allPages.length + 1;
      },
    });

  return {
    data,
    status,
    fetchNextPage,
    isFetching,
    refetch,
    isRefetching,
  };
}
