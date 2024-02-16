// hooks/methods
import { loginMsalSSO } from "utils/msalInstance";
import { useLoginSSOMutation } from "services/api/gatherapp";
import { useAppDispatch } from "store/store";
import { useNavigate } from "react-router-dom";
import { setToken } from "features/login/loginSlice";

// libraries

// types and constants
import LocalStorageItems from "ts/enums/LocalStorageItems";
import { STATIC_ROUTES } from "utils/constants";

// styles
import { MSButton } from "./styles";

const SSOButton = () => {
  const [loginSSO] = useLoginSSOMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const response = await loginMsalSSO();
    if (!response) return;
    loginSSO({ idToken: response.idToken })
      .unwrap()
      .then((res) => {
        localStorage.setItem(LocalStorageItems.Token, res.token);
        localStorage.setItem(LocalStorageItems.User, JSON.stringify(res.user));
        localStorage.setItem(
          LocalStorageItems.ExpirationDate,
          res.expirationDate
        );
        dispatch(
          setToken({
            user: res.user,
            token: res.token,
            expirationDate: res.expirationDate,
          })
        );

        navigate(STATIC_ROUTES.home);
      });
  };

  return (
    <MSButton type="button" onClick={handleLogin}>
      <img
        src="images\ms-symbollockup_mssymbol_19.png"
        style={{ paddingRight: "0.313rem" }}
        alt="microsoft logo"
      />
      Sign in with Microsoft
    </MSButton>
  );
};

export default SSOButton;
