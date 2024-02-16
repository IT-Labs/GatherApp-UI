// hooks/methods
import { useParams, useNavigate, Params } from "react-router-dom";
import { useResetPasswordMutation } from "services/api/gatherapp";
import useFormInput from "hooks/useFormInput";
import useInputs from "hooks/useInputs";

// libraries

// Components
import AuthForm from "components/Reusable/AuthForm/AuthForm";
import Input from "components/Reusable/Input/Input";

// types and constants
import { ResetPassword } from "ts/types/ResetPassword";
import { toastMessages } from "constants/toastMessages";
import { validationSchemas } from "constants/validationSchemas";
import { STATIC_ROUTES } from "utils/constants";

export default function ForgotPasswordReset() {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const passwordState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.signUpPasswordSchema,
  });
  const confirmPasswordState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.signUpPasswordSchema.refine(
      (data) => data === passwordState.value,
      "Passwords must match."
    ),
  });
  const inputs = useInputs(passwordState, confirmPasswordState);
  const params = useParams();

  const { token }: Readonly<Params<string>> = params;

  const handleSubmit = async () => {
    const formData: ResetPassword = {
      token,
      newPassword: passwordState.value,
      confirmPassword: confirmPasswordState.value,
    };

    await resetPassword(formData)
      .unwrap()
      .then((response) => {
        if (response.status !== 400) {
          navigate(STATIC_ROUTES.login);
        }
      })
      .catch(() => {
        console.log(toastMessages.somethingWentWrong);
      });
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      inputs={inputs}
      buttonContent="Change password"
      links={[
        {
          link: true,
          content: "Go back to login page",
          to: STATIC_ROUTES.login,
        },
      ]}
    >
      <Input
        name="password"
        id="password"
        type="password"
        label="Password"
        required
        placeholder="Enter password"
        state={passwordState}
      />

      <Input
        name="confirm-password"
        id="confirm-password"
        type="password"
        label="Confirm Password"
        required
        placeholder="Confirm password"
        state={confirmPasswordState}
      />
    </AuthForm>
  );
}
