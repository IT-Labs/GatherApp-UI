// hooks/methods
import { useSignupMutation } from "services/api/gatherapp";
import { useNavigate } from "react-router-dom";
import useInputs from "hooks/useInputs";
import { useCustomSelect } from "hooks/useCustomSelect";
import useFormInput from "hooks/useFormInput";

// components
import Input from "components/Reusable/Input/Input";
import AuthForm from "components/Reusable/AuthForm/AuthForm";
import CountriesSelect from "components/CountriesSelect/CountriesSelect";

// types and constants
import { validationSchemas } from "constants/validationSchemas";
import { CountryOption } from "ts/types/User";
import { STATIC_ROUTES } from "utils/constants";

export default function SignUp() {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const firstNameState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.nameSchema,
  });
  const lastNameState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.nameSchema,
  });
  const emailState = useFormInput({
    initialValue: "",
    zodSchema: validationSchemas.auth.emailSchema,
  });
  const countryState = useCustomSelect<CountryOption>({
    label: "Location",
    id: "choose-country-select",
    defaultValue: null,
    options: [],
    isMulti: false,
    required: true,
  });
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

  const inputs = useInputs(
    firstNameState,
    lastNameState,
    emailState,
    passwordState,
    countryState,
    confirmPasswordState
  );

  const handleSubmit = async () => {
    const response = await signup({
      firstName: firstNameState.value,
      lastName: lastNameState.value,
      email: emailState.value,
      countryId: countryState.getSelectValue(),
      password: passwordState.value,
    });
    if ("error" in response) return;
    setTimeout(() => navigate(STATIC_ROUTES.login), 2000);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      inputs={inputs}
      buttonContent="Sign Up"
      links={[
        {
          link: true,
          content: "Already have an account?",
          to: STATIC_ROUTES.login,
        },
      ]}
    >
      <Input
        id="firstName"
        name="firstName"
        type="text"
        label="First Name"
        state={firstNameState}
        required
        placeholder="Enter first name"
      />

      <Input
        id="lastName"
        name="lastName"
        type="text"
        label="Last Name"
        state={lastNameState}
        required
        placeholder="Enter last name"
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        required
        placeholder="Enter email"
        state={emailState}
      />

      <CountriesSelect state={countryState} />

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
