// hooks/methods
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "services/api/gatherapp";
import useFormInput from "hooks/useFormInput";
import useInputs from "hooks/useInputs";
import { useAppSelector } from "store/store";

// libraries

// components
import Input from "components/Reusable/Input/Input";
import AuthForm from "components/Reusable/AuthForm/AuthForm";

// types and constants
import { ChangePasswordType } from "ts/types/ResetPassword";
import { validationSchemas } from "constants/validationSchemas";
import { STATIC_ROUTES } from "utils/constants";

function ChangePassword() {
  const [changePassword] = useChangePasswordMutation();
  const userId = useAppSelector((state) => state.login.user.id);

  const navigate = useNavigate();

  const oldPasswordState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.signUpPasswordSchema,
  });
  const newPasswordState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.signUpPasswordSchema.refine(
      (data) => data !== oldPasswordState.value,
      "Your new and old password must be different."
    ),
  });
  const confirmPasswordState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.signUpPasswordSchema.refine(
      (data) => data === newPasswordState.value,
      "Passwords must match."
    ),
  });

  const inputs = useInputs(
    oldPasswordState,
    newPasswordState,
    confirmPasswordState
  );

  const handleChangePassword = async () => {
    const formData: ChangePasswordType = {
      Id: userId,
      oldPassword: oldPasswordState.value,
      newPassword: newPasswordState.value,
      confirmPassword: confirmPasswordState.value,
    };

    const response = await changePassword(formData);
    if ("error" in response) return;
    navigate(STATIC_ROUTES.myProfile);
  };

  return (
    <AuthForm
      onSubmit={handleChangePassword}
      inputs={inputs}
      buttonContent="Reset"
      links={[
        {
          link: false,
          content: "",
          to: "",
        },
      ]}
    >
      <Input
        name="old-password"
        id="old-password"
        type="password"
        label="Old Password"
        required
        placeholder="Enter password"
        state={oldPasswordState}
      />
      <Input
        name="new-password"
        id="new-password"
        type="password"
        label="Password"
        required
        placeholder="Enter password"
        state={newPasswordState}
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

export default ChangePassword;
