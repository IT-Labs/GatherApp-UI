// hooks/methods
import { Navigate } from "react-router";
import { useAppSelector } from "store/store";
import { STATIC_ROUTES } from "utils/constants";
import { isUserAdmin } from "utils/helpers";

interface IProps {
  children: JSX.Element | null;
  isRoleProtected?: boolean;
}

export default function ProtectedRoute({ children, isRoleProtected }: IProps) {
  const loginUserData = useAppSelector((state) => state.login.user);

  if (loginUserData === null) {
    return <Navigate to={STATIC_ROUTES.login} />;
  }

  const isAdmin = isUserAdmin(loginUserData.roleName);

  // check if the route is specific to the Admin role and if the role isn't Admin
  if (!isAdmin && isRoleProtected) {
    return null;
  }

  return children;
}

ProtectedRoute.defaultProps = {
  isRoleProtected: false,
};
