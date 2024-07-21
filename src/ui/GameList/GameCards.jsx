/* eslint-disable react/prop-types */
import CardDetails from "./CardDetails";

function GameCards({ data }) {
  return (
    <>
      {data.pages.map((page) =>
        page.results.map((game) => {
          return (
            <CardDetails
              name={game.name}
              background_image={game.background_image}
              metacritic={game.metacritic}
              genres={game.genres}
              key={game.id}
              released={game.released}
              id={game.id}
            />
          );
        }),
      )}
    </>
  );
}

export default GameCards;
