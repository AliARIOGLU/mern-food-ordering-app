import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

import { Button } from "./ui/button";
import { LoadingButton } from "./loading-button";

export const CheckoutButton = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  // returnTo: after auth0 login, go back to this page
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading) {
    return <LoadingButton />;
  }
};
