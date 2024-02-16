// hooks/methods
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "features/login/loginSlice";
import { useLoginMutation } from "services/api/gatherapp";
import useFormInput from "hooks/useFormInput";
import useInputs from "hooks/useInputs";

// libraries
import dayjs from "dayjs";

// components
import AuthForm from "components/Reusable/AuthForm/AuthForm";
import Input from "components/Reusable/Input/Input";
import Button from "components/Reusable/Button/Button";

// types and constants
import LocalStorageItems from "ts/enums/LocalStorageItems";
import { STATIC_ROUTES } from "utils/constants";
import { validationSchemas } from "constants/validationSchemas";

// styles
import { FormButtonStyle } from "components/Reusable/AuthForm/styles";

export default function Login() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.emailSchema,
  });

  const passwordState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.loginPasswordSchema,
  });

  const inputs = useInputs(emailState, passwordState);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const user = localStorage.getItem(LocalStorageItems.User);
    if (!user) return;
    const expirationDate = localStorage.getItem(
      LocalStorageItems.ExpirationDate
    );
    if (!expirationDate) return;
    const isExpired = dayjs(expirationDate).isBefore(dayjs(new Date()));
    if (!isExpired) {
      navigate(STATIC_ROUTES.home);
    }
  }, []);

  const handleSubmit = async () => {
    const response = await login({
      email: emailState.value,
      password: passwordState.value,
    });

    if ("error" in response) return;

    const { token, user, expirationDate } = response.data;
    localStorage.setItem(LocalStorageItems.Token, token);
    localStorage.setItem(LocalStorageItems.User, JSON.stringify(user));
    localStorage.setItem(LocalStorageItems.ExpirationDate, expirationDate);
    dispatch(
      setToken({
        user,
        token,
        expirationDate: expirationDate.toString(),
      })
    );
    navigate(STATIC_ROUTES.home);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      inputs={inputs}
      buttonContent="Login"
      links={[
        {
          link: true,
          content: (
            <Button type="button" customStyles={FormButtonStyle}>
              Sign Up
            </Button>
          ),
          to: STATIC_ROUTES.signup,
        },
        {
          link: true,
          content: "Forgot password?",
          to: STATIC_ROUTES.forgotPassword,
        },
      ]}
      microsoft
    >
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        required
        placeholder="Enter email address"
        autoFocus
        state={emailState}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        required
        placeholder="Enter password"
        state={passwordState}
      />
    </AuthForm>
  );
}
