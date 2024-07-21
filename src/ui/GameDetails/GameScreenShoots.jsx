/* eslint-disable react/prop-types */
import { useState } from "react";
import { IconContext } from "react-icons";
import {
  FaAngleLeft,
  FaAngleRight,
  FaRegCircle,
  FaRegDotCircle,
} from "react-icons/fa";

function GameScreenShoots({ screenshots, status }) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === screenshots.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return screenshots.length - 1;
      return index - 1;
    });
  }

  return (
    <div>
      {status === "success" ? (
        <div className="w-full rounded-lg border-2 border-zinc-500 bg-zinc-800 shadow-lg shadow-zinc-600">
          <div className="relative flex h-full w-full overflow-hidden">
            {screenshots.map((image) => (
              <img
                className="h-full w-full flex-shrink-0 flex-grow-0 rounded-lg object-cover transition-all"
                key={image.id}
                src={image.image}
                style={{
                  translate: `${-100 * imageIndex}%`,
                }}></img>
            ))}
            <IconContext.Provider value={{ size: "45px", color: "white" }}>
              <button
                className="absolute left-0 top-1/2 rounded-full p-0.5"
                onClick={showPrevImage}>
                <FaAngleLeft />
              </button>
              <button
                className="absolute right-0 top-1/2 rounded-full p-0.5"
                onClick={showNextImage}>
                <FaAngleRight />
              </button>
            </IconContext.Provider>
            <div className="absolute bottom-2 right-1/2 flex translate-x-1/2 gap-1 rounded-lg">
              <IconContext.Provider value={{ size: "20px", color: "white" }}>
                {screenshots.map((_, index) => (
                  <button key={index} onClick={() => setImageIndex(index)}>
                    {index === imageIndex ? (
                      <FaRegDotCircle />
                    ) : (
                      <FaRegCircle />
                    )}
                  </button>
                ))}
              </IconContext.Provider>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GameScreenShoots;
