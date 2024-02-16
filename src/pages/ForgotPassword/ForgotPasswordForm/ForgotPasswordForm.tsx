// hooks/methods
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "services/api/gatherapp";
import useFormInput from "hooks/useFormInput";
import useInputs from "hooks/useInputs";

// libraries

// components
import AuthForm from "components/Reusable/AuthForm/AuthForm";
import Input from "components/Reusable/Input/Input";

// types and components
import { validationSchemas } from "constants/validationSchemas";
import { STATIC_ROUTES } from "utils/constants";

type FormData = {
  to: string;
};

export default function ForgotPasswordForm() {
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const emailState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.emailSchema,
  });

  const inputs = useInputs(emailState);

  const handleSubmit = async () => {
    const formData: FormData = {
      to: emailState.value,
    };

    const response = await forgotPassword(JSON.stringify(formData));
    if ("error" in response) return;
    setTimeout(() => {
      navigate(STATIC_ROUTES.login);
    }, 5000);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      inputs={inputs}
      buttonContent="Send reset link"
      links={[
        {
          link: true,
          content: "Go back to login page",
          to: STATIC_ROUTES.login,
        },
      ]}
    >
      <Input
        id="recovery-email"
        name="recovery-email"
        label="Email"
        required
        type="email"
        placeholder="Enter email address"
        state={emailState}
      />
    </AuthForm>
  );
}
