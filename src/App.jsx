import { createContext, useEffect, useState } from "react";
import { supabase } from "./supabase/api.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainAndAsideContainer from "./layouts/MainAndAsideContainer.jsx";
import Login from "./pages/Login.jsx";
import Main from "./layouts/Main.jsx";
import Genres from "./pages/Genres.jsx";
import "./index.css";
import AllGenres from "./services/AllGenres.js";
import SignUp from "./pages/SignUp.jsx";
import Index from "./layouts/Index.jsx";
import MyGames from "./pages/MyGames.jsx";
import SingleGameDetails from "./pages/SingleGameDetails.jsx";
import SelectedGenreGameList from "./pages/SelectedGenreGameList.jsx";

const queryClient = new QueryClient();

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Index />}>
      <Route path="/sign" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainAndAsideContainer />}>
        <Route index element={<Main />} />
        <Route path="/game/:gameId" element={<SingleGameDetails />} />
        <Route
          path="/genres"
          element={<Genres />}
          loader={(params) => {
            return AllGenres(params);
          }}
        />
        <Route path="/mygames" element={<MyGames />} />
        <Route path="/genres/:genreName" element={<SelectedGenreGameList />} />
      </Route>
    </Route>,
  ),
);

export const SessionContext = createContext(null);
export const EventContext = createContext(null);
export const MyGamesContext = createContext(null);
export const GameIdsContext = createContext(null);

function App() {
  const [session, setSession] = useState(null);
  const [event, SetEvent] = useState(null);
  const [myGames, setMyGames] = useState([]);
  const [gameIds, setGameIds] = useState([]);

  useEffect(() => {
    setGameIds(myGames.map(({ game_id }) => game_id));
  }, [myGames]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      SetEvent(event);
      if (event === "SIGNED_IN") setSession(session);

      if (event === "SIGNED_OUT") {
        setMyGames([]);
        setSession(null);
        [
          // clear local and session storage
          (window.localStorage, window.sessionStorage),
        ].forEach((storage) => {
          Object.entries(storage).forEach(([key]) => {
            storage.removeItem(key);
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    async function bringFavorites() {
      const { data } = await supabase
        .from("mygames")
        .select("game_id, game_name, game_image")
        .eq("user_id", session.user.id);
      setMyGames(data);
    }
    if (session) {
      bringFavorites();
    }
  }, [session]);

  return (
    <GameIdsContext.Provider value={gameIds}>
      <MyGamesContext.Provider value={{ myGames, setMyGames }}>
        <EventContext.Provider value={event}>
          <SessionContext.Provider value={session}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </SessionContext.Provider>
        </EventContext.Provider>
      </MyGamesContext.Provider>
    </GameIdsContext.Provider>
  );
}

export default App;
