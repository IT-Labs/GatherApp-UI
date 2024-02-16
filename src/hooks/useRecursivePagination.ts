import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type RecursivePaginationParams = {
  page: number;
  resetPageOn?: any[];
};
type PaginationReturnType = {
  isNextPageLoaded: boolean;
  handleLoadNextPage: () => void;
  isFirstPage: boolean;
};

const getPageKey = ({
  location,
  page,
  resetPageOn = [],
}: { location: string } & RecursivePaginationParams): string => {
  return `${location}_${resetPageOn.join("_")}_${page}`;
};

const nextPageLoadedState: { [key: string]: boolean } = {};

const useRecusivePagination = ({
  page,
  resetPageOn = [],
}: RecursivePaginationParams): PaginationReturnType => {
  const location = useLocation();
  const pathname = location.pathname;
  const pageKey = getPageKey({ location: pathname, page, resetPageOn });

  const isFirstPage = page === 1;
  const [isNextPageLoaded, setIsNextPageLoaded] = useState<boolean>(() => {
    // Initialize state for the current pageKey and page combination if not already initialized
    if (nextPageLoadedState[pageKey] === undefined) {
      nextPageLoadedState[pageKey] = false;
      return false;
    }
    return nextPageLoadedState[pageKey];
  });

  const handleLoadNextPage = () => {
    setIsNextPageLoaded(true);
    nextPageLoadedState[pageKey] = true;
  };

  return {
    isNextPageLoaded,
    handleLoadNextPage,
    isFirstPage,
  };
};

export default useRecusivePagination;
