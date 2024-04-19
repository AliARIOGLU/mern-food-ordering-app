import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";

import { appAxios } from "../app-axios";
import { User } from "@/types";

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await appAxios.get("/api/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data) {
      throw new Error("Failed to get user");
    }

    return response.data;
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};

type SignupUser = {
  auth0Id: string;
  email: string;
};

export const useSignup = () => {
  const { getAccessTokenSilently } = useAuth0();

  const signupUserRequest = async (user: SignupUser) => {
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

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  country: string;
  city: string;
};

export const useUpdateUserProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await appAxios.put("/api/user/update", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.data) {
      throw new Error("Failed to update user");
    }

    return response.data;
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success("User updated successfully");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};
