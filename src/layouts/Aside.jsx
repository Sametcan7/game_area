import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoHomeOutline } from "react-icons/io5";

import CategoriesTablet from "../ui/CategoriesTablet";
import FetchGenres from "../services/AllGenres";
import Categories from "../ui/Categories";

function Aside() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  FetchGenres();
  return (
    <aside className="fixed top-[var(--header-height)] h-full w-[3rem] overflow-x-auto bg-zinc-800 bg-gradient-to-r from-zinc-800 from-95% to-zinc-700 to-100% px-1 text-stone-300 md:w-[7%] md:px-2 lg:w-[20%] xl:w-2/12 xl:px-5">
      <div>
        <nav className="hidden flex-col lg:flex">
          <NavLink onClick={handleScrollToTop} to="/">
            <div className="flex items-center rounded-lg px-1 py-2 text-lg font-bold hover:m-[-1px] hover:border-2 hover:border-zinc-600 hover:bg-zinc-700 active:bg-zinc-600 lg:px-3 lg:text-2xl">
              <span className="mr-2">
                <IconContext.Provider value={{ size: "25px" }}>
                  <IoHomeOutline />
                </IconContext.Provider>
              </span>
              <span> Home </span>
            </div>
          </NavLink>
          <Categories />
        </nav>
        <nav className="flex flex-col lg:hidden">
          <CategoriesTablet />
        </nav>
      </div>
    </aside>
  );
}

export default Aside;
