import { toast } from "sonner";
import { useMutation, useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

import { appAxios } from "../app-axios";
import { Restaurant, Order } from "@/types";

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await appAxios.get("/api/my/restaurant", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data) {
      throw new Error("Failed to get restaurant");
    }

    return response.data;
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getRestaurantRequest
  );

  return { restaurant, isLoading };
};
export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await appAxios.post(
      "/api/my/restaurant",
      restaurantFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data) {
      throw new Error("Failed to create restaurant");
    }

    return response.data;
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }

  if (error) {
    toast.error("Unable to create restaurant");
  }

  return {
    createRestaurant,
    isLoading,
  };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await appAxios.put(
      "/api/my/restaurant",
      restaurantFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data) {
      throw new Error("Failed to update restaurant");
    }

    return response.data;
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant updated successfully");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return {
    updateRestaurant,
    isLoading,
  };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await appAxios.get("/api/my/restaurant/order", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to get my restaurant orders");
    }

    return response.data;
  };

  const { data: myRestaurantOrders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { myRestaurantOrders, isLoading };
};
