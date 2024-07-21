import { IconContext } from "react-icons";
import { ImSpinner10 } from "react-icons/im";

function Spinner() {
  return (
    <IconContext.Provider
      value={{
        className:
          "global-class-name animate-spin	react-icons mx-auto fill-zinc-400 h-full",
        size: "2rem",
      }}>
      <ImSpinner10 />
    </IconContext.Provider>
  );
}

export default Spinner;
