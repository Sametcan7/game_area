import { IconContext } from "react-icons";
import { FaGun } from "react-icons/fa6";
import { GiHighPunch, GiMagicAxe, GiRaceCar } from "react-icons/gi";
import { PiStrategy } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { NavLink } from "react-router-dom";

function Categories() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <ul className="text-l mt-5 flex flex-col font-semibold">
      <IconContext.Provider value={{ size: "25px" }}>
        <li>
          <NavLink onClick={handleScrollToTop} to="/genres">
            <div className="mb-2 flex items-center rounded-lg px-1 py-2 text-lg font-bold hover:m-[-1px] hover:mb-[7px] hover:border-2 hover:border-zinc-600 hover:bg-zinc-700 active:bg-zinc-600 lg:px-3 lg:text-2xl">
              <span className="mr-2">
                <TbCategory />
              </span>
              <span>All Genres</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink onClick={handleScrollToTop} to="/genres/action">
            <div className="flex rounded-lg px-1 py-1 text-lg font-bold hover:m-[-1px] hover:border-2 hover:border-zinc-600 hover:bg-zinc-700 active:bg-zinc-600 lg:text-xl">
              <span className="mr-2">
                <FaGun />
              </span>
              <span>Action</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={handleScrollToTop}
            to="/genres/role-playing-games-rpg">
            <div className="flex rounded-lg px-1 py-1 text-lg font-bold hover:m-[-1px] hover:border-2 hover:border-zinc-600 hover:bg-zinc-700 active:bg-zinc-600 lg:text-xl">
              <span className="mr-2">
                <GiMagicAxe />
              </span>
              <span>RPG</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink onClick={handleScrollToTop} to="/genres/strategy">
            <div className="flex rounded-lg px-1 py-1 text-lg font-bold hover:m-[-1px] hover:border-2 hover:border-zinc-600 hover:bg-zinc-700 active:bg-zinc-600 lg:text-xl">
              <span className="mr-2">
                <PiStrategy />
              </span>
              <span>Strategy</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink onClick={handleScrollToTop} to="/genres/racing">
            <div className="flex rounded-lg px-1 py-1 text-lg font-bold hover:m-[-1px] hover:border-2 hover:border-zinc-600 hover:bg-zinc-700 active:bg-zinc-600 lg:text-xl">
              <span className="mr-2">
                <GiRaceCar />
              </span>
              <span>Racing</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink onClick={handleScrollToTop} to="/genres/fighting">
            <div className="flex rounded-lg px-1 py-1 text-lg font-bold hover:m-[-1px] hover:border-2 hover:border-zinc-600 hover:bg-zinc-700 active:bg-zinc-600 lg:text-xl">
              <span className="mr-2">
                <GiHighPunch />
              </span>
              <span>Fighting</span>
            </div>
          </NavLink>
        </li>
      </IconContext.Provider>
    </ul>
  );
}

export default Categories;
