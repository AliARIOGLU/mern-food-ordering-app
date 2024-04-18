import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { useSignup } from "@/lib/api/user-api";

const AuthCallbackPage = () => {
  const { signupUser } = useSignup();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      signupUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }

    navigate("/");
  }, [signupUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
