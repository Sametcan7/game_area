import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

function useGameDetails(gameId) {
  const { data, status: gamesStatus } = useQuery({
    queryKey: ["games", [gameId]],
    queryFn: async function getGames({ queryKey }) {
      const [, game] = queryKey;
      const response = await fetch(
        `https://api.rawg.io/api/games/${game}?key=${API_KEY}`,
      );

      const data = response.json();
      return data;
    },
  });

  const { data: screenshots, status: screenshotsStatus } = useQuery({
    queryKey: ["screenshots", [gameId]],
    queryFn: async function getScreenshots({ queryKey }) {
      const [, game] = queryKey;
      const response = await fetch(
        `https://api.rawg.io/api/games/${game}/screenshots?key=${API_KEY}`,
      );

      const data = response.json();
      return data;
    },
  });
  return { data, gamesStatus, screenshots, screenshotsStatus };
}

export default useGameDetails;
