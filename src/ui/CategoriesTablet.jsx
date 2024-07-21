import { IconContext } from "react-icons";
import { FaGun } from "react-icons/fa6";
import { GiHighPunch, GiMagicAxe, GiRaceCar } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { PiStrategy } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { NavLink } from "react-router-dom";

function CategoriesTablet() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };
  return (
    <ul>
      <IconContext.Provider value={{ size: "auto" }}>
        <li className="py-1">
          <NavLink onClick={handleScrollToTop} to="/">
            <IoHomeOutline />
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink onClick={handleScrollToTop} to="/genres">
            <TbCategory />
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink onClick={handleScrollToTop} to="/genres/action">
            <FaGun />
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            onClick={handleScrollToTop}
            to="/genres/role-playing-games-rpg">
            <GiMagicAxe />
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink to="/genres/strategy">
            <PiStrategy />
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink onClick={handleScrollToTop} to="/genres/racing">
            <GiRaceCar />
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink onClick={handleScrollToTop} to="/genres/fighting">
            <GiHighPunch />
          </NavLink>
        </li>
      </IconContext.Provider>
    </ul>
  );
}

export default CategoriesTablet;
