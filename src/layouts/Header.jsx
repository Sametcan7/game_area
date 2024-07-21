/* eslint-disable react/prop-types */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { EventContext, SessionContext } from "../App";
import { supabase } from "../supabase/api";
import {
  IoCloseCircleSharp,
  IoCloseSharp,
  IoGameControllerOutline,
} from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

import Spinner from "../ui/Spinner";
import useSearch from "../services/useSearch";

function Header() {
  const session = useContext(SessionContext);
  const event = useContext(EventContext);
  const [show, setShow] = useState(false);

  const menuRef = useRef(null);

  const HandleClick = useCallback((e) => {
    if (!menuRef.current.contains(e.target)) {
      setShow(false);
    }
  }, []);

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", HandleClick);
      return () => {
        document.removeEventListener("mousedown", HandleClick);
      };
    }
  }, [HandleClick, show]);

  return (
    <header className="fixed top-0 z-10 w-full bg-zinc-800 px-1.5 md:px-10">
      <nav className="mx-auto flex flex-row items-center gap-2 py-2 text-2xl font-bold text-stone-300 max-sm:overflow-x-auto md:justify-between md:py-6">
        <Logo />
        <SearchInput />
        {event ? (
          session ? (
            <>
              <MyGames />
              <Logout />
            </>
          ) : (
            <>
              <div
                ref={menuRef}
                className={`${show ? "fixed" : "max-lg:hidden"} left-1/2 top-1/2 flex items-center justify-center gap-1 rounded-lg max-lg:h-3/5 max-lg:w-4/5 max-lg:translate-x-[-50%] max-lg:translate-y-[-50%] max-lg:border-2 max-lg:border-zinc-600 max-lg:bg-zinc-800 max-lg:text-lg lg:gap-2`}>
                <Login setShow={setShow} />
                <Sign setShow={setShow} />
                <button className="lg:hidden" onClick={() => setShow(false)}>
                  <IconContext.Provider value={{ size: "40px" }}>
                    <IoCloseCircleSharp className="absolute right-5 top-5 text-zinc-400" />
                  </IconContext.Provider>
                </button>
              </div>
              <div className="lg:hidden">
                <FaBars
                  className={`${show ? "text-zinc-600" : null}`}
                  onClick={() => setShow(true)}
                />
              </div>
            </>
          )
        ) : (
          <Spinner />
        )}
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <div className="p-2">
      <a href="/">
        <span>Game_</span>
        <span>Area</span>
      </a>
    </div>
  );
}

function SearchInput() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);
  const iconRef = useRef(null);

  const { data, status, refetch } = useSearch(search);

  useEffect(() => {
    if (!search) return;
    refetch();
  }, [search, refetch]);

  function HandleSearch(e) {
    setSearch(e.target.value);
  }

  function HandleCloseButton() {
    setSearch("");
    inputRef.current.value = "";
    setIsOpen(false);
  }

  return (
    <>
      <div className="ml-auto lg:hidden">
        <IconContext.Provider value={{ size: "30px" }}>
          <FaSearch onClick={() => setIsOpen(true)} />
        </IconContext.Provider>
      </div>

      <div
        className={`max-lg:min-w-screen left-0 top-0 ${isOpen ? "max-lg:absolute" : "hidden"} grow rounded-lg max-lg:h-full max-lg:min-h-screen max-lg:w-full max-lg:border-2 max-lg:border-zinc-400 max-lg:bg-zinc-800 lg:flex`}>
        <form
          className="relative max-lg:mx-4 lg:w-full"
          onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            className="w-full rounded-lg bg-gray-600 py-2 pl-2 text-sm"
            onClick={() => setIsOpen(true)}
            autoComplete="off"
            onChange={(e) => HandleSearch(e)}
            type="text"
            placeholder="Search"></input>
          {isOpen ? (
            <IconContext.Provider value={{ size: "35px" }}>
              <span ref={iconRef}>
                <IoCloseSharp
                  onClick={() => HandleCloseButton()}
                  className="absolute right-0 top-[50%] translate-y-[-47%]"
                />
              </span>
            </IconContext.Provider>
          ) : null}

          {status === "success" && isOpen ? (
            <>
              <SearchResults
                data={data}
                setIsOpen={setIsOpen}
                inputRef={inputRef}
                iconRef={iconRef}
              />
            </>
          ) : null}
        </form>
      </div>
    </>
  );
}

function SearchResults({ data, setIsOpen, inputRef, iconRef }) {
  const results = data.results.slice(0, 5);
  const divRef = useRef(null);

  const HandleClick = useCallback(
    function (e) {
      if (
        !(
          divRef.current.contains(e.target) ||
          inputRef.current.contains(e.target) ||
          iconRef.current.contains(e.target)
        )
      )
        setIsOpen(false);
    },
    [inputRef, setIsOpen, iconRef],
  );

  useEffect(() => {
    document.addEventListener("mousedown", HandleClick);
    return () => {
      document.removeEventListener("mousedown", HandleClick);
    };
  }, [HandleClick]);

  return (
    <div
      ref={divRef}
      className="absolute left-0 top-full z-20 w-full rounded-lg border-2 border-zinc-900 bg-zinc-700">
      <ul className="text-m z-20 flex flex-col gap-2 p-3">
        {results.map((result) => (
          <Link
            to={`/game/${result.id}`}
            key={result.id}
            onClick={() => setIsOpen(false)}>
            {result.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}

function Sign({ setShow }) {
  return (
    <Link
      onClick={() => setShow(false)}
      to={"/sign"}
      className="text-m rounded-lg bg-zinc-600 px-0.5 py-0.5 font-bold text-zinc-200 shadow-lg shadow-zinc-700 hover:bg-zinc-600 active:ring-2 active:ring-zinc-500 lg:px-2 lg:py-1">
      SIGN UP
    </Link>
  );
}

function Login({ setShow }) {
  return (
    <Link
      onClick={() => setShow(false)}
      to={"/login"}
      className="text-m rounded-lg bg-zinc-600 px-0.5 py-0.5 font-bold text-zinc-200 shadow-lg shadow-zinc-700 hover:bg-zinc-600 active:ring-2 active:ring-zinc-500 lg:px-2 lg:py-1">
      LOGIN
    </Link>
  );
}

function Logout() {
  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <div onClick={() => logout()}>
      <Link to={"/"}>
        <span className="text-m hidden rounded-lg bg-zinc-600 px-2 py-1 font-bold text-zinc-200 shadow-lg shadow-zinc-700 hover:bg-zinc-600 active:ring-2 active:ring-zinc-500 lg:inline">
          Logout
        </span>
        <span className="lg:hidden">
          <IconContext.Provider value={{ size: "40px" }}>
            <BiLogOut />
          </IconContext.Provider>
        </span>
      </Link>
    </div>
  );
}

function MyGames() {
  return (
    <div>
      <Link to={"/mygames"}>
        <span className="text-m hidden rounded-lg bg-zinc-600 px-2 py-1 font-bold text-zinc-200 shadow-lg shadow-zinc-700 hover:bg-zinc-600 active:ring-2 active:ring-zinc-500 lg:inline">
          My Games
        </span>
        <span className="lg:hidden">
          <IconContext.Provider value={{ size: "40px" }}>
            <IoGameControllerOutline />
          </IconContext.Provider>
        </span>
      </Link>
    </div>
  );
}

export default Header;
