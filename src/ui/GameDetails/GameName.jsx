/* eslint-disable react/prop-types */
function GameName({ name }) {
  return (
    <h2 className="m-2 rounded-lg py-2 text-center text-2xl font-bold text-zinc-200">
      {name}
    </h2>
  );
}

export default GameName;
