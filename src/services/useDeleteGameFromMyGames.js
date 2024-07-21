import { supabase } from "../supabase/api";

export default async function useDeleteGameFromMyGames(arr, setArr, game) {
  const { error } = await supabase.from("mygames").delete().eq("game_id", game);

  if (error) return true;
  if (!error) {
    setArr(arr.filter((x) => x.game_id != game));
    return false;
  }
}
