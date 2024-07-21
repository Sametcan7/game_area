/* eslint-disable react/prop-types */
function GameOtherDetails({ genres, tags, released, publishers, score }) {
  const releasedYear = released.slice(0, 4);
  return (
    <div className="mt-10">
      <div className="mx-auto flex flex-1 flex-col items-center gap-4 rounded-lg border-2 border-zinc-500 bg-zinc-800 text-center text-zinc-300">
        <div className="w-full p-2">
          <div className="rounded-lg bg-zinc-700">
            <p className="border-b-2 border-zinc-800 text-lg font-semibold">
              Score
            </p>
            <p>{score}</p>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-zinc-700">
            <p className="border-b-2 border-zinc-800 text-lg font-semibold">
              Released
            </p>
            <p>{releasedYear}</p>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-zinc-700">
            <p className="border-b-2 border-zinc-800 text-lg font-semibold">
              Genres
            </p>
            <div className="flex flex-wrap justify-center">
              {genres.map((genres, index) => (
                <p className="px-2" key={index}>
                  {genres.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-zinc-700">
            <p className="border-b-2 border-zinc-800 text-lg font-semibold">
              Tags
            </p>
            <div className="flex flex-wrap justify-center">
              {tags.map((tags, index) => (
                <p className="px-2" key={index}>
                  {tags.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="rounded-lg bg-zinc-700">
            <p className="border-b-2 border-zinc-800 text-lg font-semibold">
              Publisher
            </p>
            <div>
              {publishers.map((publishers, index) => (
                <p key={index}>{publishers.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOtherDetails;
