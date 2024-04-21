import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";

import { appAxios } from "../app-axios";
import { CheckoutSessionRequest, Order } from "@/types";

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await appAxios.get("/api/order", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to get my orders");
    }

    return response.data;
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      // order status pooling -> yapılan her status değişikliğini takip eder ve 5sn aralıklarla tekrar cagırılır böylece dinamik bir sonuç
      // görürsün order status sayfasında.
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await appAxios.post(
      "/api/order/checkout/create-checkout-session",
      checkoutSessionRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data) {
      throw new Error("Failed to create checkout session");
    }

    return response.data;
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { createCheckoutSession, isLoading };
};
