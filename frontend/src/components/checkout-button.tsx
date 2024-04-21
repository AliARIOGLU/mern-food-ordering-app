import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

import { Button } from "./ui/button";
import { LoadingButton } from "./loading-button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { UserFormData, UserProfileForm } from "@/forms/user-profile-form";
import { useGetUser } from "@/lib/api/user-api";

type CheckoutButtonProps = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

export const CheckoutButton = ({
  onCheckout,
  disabled,
}: CheckoutButtonProps) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetUser();

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

  if (isAuthLoading || !currentUser) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
