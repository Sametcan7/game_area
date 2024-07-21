import { IconContext } from "react-icons";
import { FaPlaystation, FaWindows, FaXbox } from "react-icons/fa";

/* eslint-disable react/prop-types */
function GamePlatform({ data }) {
  const platforms = data.platforms.map((platform) => {
    return platform.platform.name;
  });

  const isPlaystation = platforms.some((x) => x.includes("PlayStation"));
  const isXbox = platforms.some((x) => x.includes("Xbox"));
  const isPC = platforms.some((x) => x.includes("PC"));

  return (
    <div className="my-4 flex justify-around rounded-lg border-2 border-zinc-500 bg-zinc-800 p-2 text-center text-zinc-300 shadow-lg shadow-zinc-600">
      <IconContext.Provider value={{ color: "white", size: "60px" }}>
        {isPC ? (
          <div>
            <FaWindows className="mx-auto rounded-lg p-2 shadow shadow-zinc-600" />
            <p>PC</p>
          </div>
        ) : null}
        {isPlaystation ? (
          <div>
            <FaPlaystation className="mx-auto rounded-lg p-2 shadow shadow-zinc-600" />
            <p>PlayStation</p>
          </div>
        ) : null}
        {isXbox ? (
          <div>
            <FaXbox className="mx-auto rounded-lg p-2 shadow shadow-zinc-600" />
            <p>Xbox</p>
          </div>
        ) : null}
      </IconContext.Provider>
    </div>
  );
}
export default GamePlatform;
