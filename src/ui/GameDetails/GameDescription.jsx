/* eslint-disable react/prop-types */
import { useState } from "react";

function GameDescription({ description }) {
  const [expanded, setExpanded] = useState(true);
  const MAX_CHARS = 1000;

  const text = expanded ? description.substring(0, MAX_CHARS) : description;

  return (
    <div className="rounded-lg border-2 border-zinc-500 bg-zinc-800 px-4 py-2 text-zinc-300 shadow-lg shadow-zinc-600">
      <h2 className="text-start text-xl font-medium">Summary</h2>
      <p>
        {description.length <= MAX_CHARS ? description : text}
        <button
          className="text-xl"
          onClick={() => setExpanded((expand) => !expand)}>
          {description.length <= MAX_CHARS
            ? null
            : expanded
              ? "[Read More]"
              : "[Read Less]"}
        </button>
      </p>
    </div>
  );
}

export default GameDescription;
