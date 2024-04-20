import { useQuery } from "react-query";

import { appAxios } from "../app-axios";
import { RestaurantSearchResponse } from "@/types";
import { SearchState } from "@/pages/search-page";

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const searchParams = new URLSearchParams();
    searchParams.set("searchQuery", searchState.searchQuery);
    searchParams.set("page", searchState.page.toString());
    searchParams.set(
      "selectedCuisines",
      searchState.selectedCuisines.join(",")
    );

    const response = await appAxios.get(
      `/api/restaurant/search/${city}?${searchParams.toString()}`
    );

    if (!response.data) {
      throw new Error("Failed to search for restaurants");
    }

    return response.data;
  };

  const { data: searchResults, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    {
      enabled: !!city,
    }
  );

  return { searchResults, isLoading };
};
