// hooks/methods
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInvalidateRefreshMutation } from "services/api/gatherapp";

// libraries
import { useMsal } from "@azure/msal-react";

// types and constants
import { STATIC_ROUTES } from "utils/constants";

type Props = {
  onClick: () => void;
};

function LogoutLink({ onClick }: Props) {
  const navigate = useNavigate();
  const [invalidateRefresh] = useInvalidateRefreshMutation();
  const { instance } = useMsal();

  const handleLogoutClick = async () => {
    const response = await invalidateRefresh();
    if ("error" in response) return;
    // Remove the user's authentication token from localStorage
    localStorage.clear();
    instance.setActiveAccount(null);
    navigate(STATIC_ROUTES.login);
    onClick();
  };

  useEffect(() => {
    const removeTokenListener = () => {
      if (!localStorage.getItem("authToken")) {
        navigate(STATIC_ROUTES.login);
      }
    };
    window.addEventListener("storage", removeTokenListener);

    return () => {
      window.removeEventListener("storage", removeTokenListener);
    };
  }, []);

  return (
    <Link to={STATIC_ROUTES.home} onClick={handleLogoutClick}>
      Log Out
    </Link>
  );
}

export default LogoutLink;
