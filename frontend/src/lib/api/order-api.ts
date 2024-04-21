import { useAuth0 } from "@auth0/auth0-react";
import { appAxios } from "../app-axios";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { CheckoutSessionRequest } from "@/types";

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
