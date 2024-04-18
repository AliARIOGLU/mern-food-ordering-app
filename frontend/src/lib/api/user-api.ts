import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

import { appAxios } from "../app-axios";

type signupUser = {
  auth0Id: string;
  email: string;
};

export const useSignup = () => {
  const { getAccessTokenSilently } = useAuth0();

  const signupUserRequest = async (user: signupUser) => {
    const accessToken = await getAccessTokenSilently();

    const response = await appAxios.post("/api/user/signup", user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data) {
      throw new Error("Failed to signup");
    }
  };

  const {
    mutateAsync: signupUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(signupUserRequest);

  return {
    signupUser,
    isLoading,
    isError,
    isSuccess,
  };
};
