import { useQuery } from "react-query";

import { appAxios } from "../app-axios";
import { RestaurantSearchResponse } from "@/types";

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await appAxios.get(`/api/restaurant/search/${city}`);

    if (!response.data) {
      throw new Error("Failed to search for restaurants");
    }

    return response.data;
  };

  const { data: searchResults, isLoading } = useQuery(
    ["searchRestaurants"],
    createSearchRequest,
    {
      enabled: !!city,
    }
  );

  return { searchResults, isLoading };
};
