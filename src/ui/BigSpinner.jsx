import { IconContext } from "react-icons";
import { ImSpinner10 } from "react-icons/im";

function BigSpinner() {
  return (
    <div className="flex h-screen w-full items-center">
      <IconContext.Provider
        value={{
          className:
            "global-class-name animate-spin	react-icons mx-auto fill-zinc-800 h-full",
          size: "4rem",
        }}>
        <ImSpinner10 />
      </IconContext.Provider>
    </div>
  );
}

export default BigSpinner;
