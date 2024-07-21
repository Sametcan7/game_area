import { useQuery, useQueryClient } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default function useSearch(search) {
  const QueryClient = useQueryClient();

  if (search.length === 0) {
    QueryClient.resetQueries({ queryKey: ["searching"], exact: true });
  }

  const { data, status, refetch } = useQuery({
    queryKey: ["searching"],
    queryFn: async function searchGames({ signal }) {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`,
        { signal },
      );

      const data = await res.json();
      return data;
    },
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, status, refetch };
}
