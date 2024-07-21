import { Link, useLoaderData } from "react-router-dom";
import DocumentTitle from "../services/DocumentTitle";

function Genres() {
  const data = useLoaderData();
  DocumentTitle("Genres");

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="w-full bg-zinc-700">
      <ul className="mx-auto my-10 flex w-11/12 flex-col gap-4 text-sm lg:w-4/5 lg:text-xl">
        {data.results.map(
          ({ id, name, games_count, image_background, slug }) => (
            <Link onClick={handleScrollToTop} to={`/genres/${slug}`} key={id}>
              <li className="h-20 rounded-xl border-2 border-zinc-600 bg-zinc-200 shadow-lg shadow-zinc-600 hover:shadow-lg lg:h-24">
                <div className="relative h-full w-full">
                  <div className="absolute flex h-full w-full items-center justify-center gap-2 font-semibold uppercase text-zinc-100">
                    <p className="rounded-lg border-2 border-zinc-600 bg-zinc-500 p-1">
                      {name}
                    </p>
                    <p className="rounded-lg border-2 border-zinc-600 bg-zinc-500 p-1">
                      Game Amount: {games_count}
                    </p>
                  </div>
                  <img
                    className="h-full w-full rounded-xl object-cover"
                    src={image_background}></img>
                </div>
              </li>
            </Link>
          ),
        )}
      </ul>
    </div>
  );
}

export default Genres;
