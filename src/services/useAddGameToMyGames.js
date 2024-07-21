import { supabase } from "../supabase/api";

export default async function useAddGameToMyGames(
  userId,
  gameId,
  gameName,
  gameImage,
  setArr,
) {
  const { error } = await supabase
    .from("mygames")
    .insert([
      {
        user_id: userId,
        game_id: gameId,
        game_name: gameName,
        game_image: gameImage,
      },
    ])
    .select();

  if (error) return false;

  if (!error) {
    setArr((game) => [
      ...game,
      { game_id: gameId, game_name: gameName, game_image: gameImage },
    ]);
    return true;
  }
}
