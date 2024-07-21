import { Outlet } from "react-router-dom";
import Aside from "./Aside";

function MainAndAsideContainer() {
  return (
    <div className="h-screen min-h-full">
      <Aside />
      <div className="absolute right-0 top-[var(--header-height)] min-h-full w-[calc(100%-3rem)] bg-zinc-700 text-center md:w-[93%] lg:w-[80%] xl:w-10/12">
        <Outlet />
      </div>
    </div>
  );
}

export default MainAndAsideContainer;
