import { QueryClient } from "@tanstack/react-query";

const resetInfiniteQuery = function () {
  QueryClient.setQueryData(["gameList"], (oldData) =>
    oldData
      ? {
          ...oldData,
          pages: oldData.pages.slice(0, 1),
          pageParams: [1],
        }
      : oldData,
  );
};

export default resetInfiniteQuery;
