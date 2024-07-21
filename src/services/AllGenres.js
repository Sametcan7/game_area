const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export default async function AllGenres() {
  const res = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const data = await res.json();
  return data;
}
