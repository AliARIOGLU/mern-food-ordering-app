import { useQuery } from "react-query";

import { appAxios } from "../app-axios";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { SearchState } from "@/pages/search-page";

export const useGetRestaurantDetail = (restaurantId?: string) => {
  const getRestaurantDetailRequest = async (): Promise<Restaurant> => {
    const response = await appAxios.get(`/api/restaurant/${restaurantId}`);

    if (!response.data) {
      throw new Error("Failed to get restaurant detail");
    }

    return response.data;
  };

  const { data: restaurantDetail, isLoading } = useQuery(
    ["getRestaurantDetail"],
    getRestaurantDetailRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurantDetail, isLoading };
};

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
    searchParams.set("sortOption", searchState.sortOption);

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
