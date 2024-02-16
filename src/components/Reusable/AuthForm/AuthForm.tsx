// hooks/methods
import { Link } from "react-router-dom";
import { InputsMethods } from "hooks/useInputs";

// components
import SSOButton from "components/SSOButton/SSOButton";
import Button from "components/Reusable/Button/Button";

// styles
import { SContainer, SForm, SLogo, FormButtonStyle } from "./styles";

type FormSubmitLink = {
  link: boolean;
  content: JSX.Element | string;
  to: string;
};

type Props = {
  onSubmit: () => void;
  inputs: InputsMethods;
  buttonContent?: string;
  children: React.ReactNode;
  links?: Array<FormSubmitLink>;
  microsoft?: boolean;
};

export default function AuthForm({
  onSubmit,
  inputs,
  buttonContent = "",
  children = null,
  links = [],
  microsoft = false,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.areValid) return;

    onSubmit();
  };
  return (
    <SContainer>
      <SForm onSubmit={handleSubmit}>
        <SLogo src="/images/Logo.png" alt="company logo" />
        {children}
        <Button
          type="submit"
          disabled={!inputs.areValid}
          customStyles={FormButtonStyle}
        >
          {buttonContent}
        </Button>

        {links.length &&
          links.map(
            (link) =>
              link.link &&
              link.to && (
                <Link to={link.to} key={link.to}>
                  {link.content}
                </Link>
              )
          )}
        {microsoft ? <SSOButton /> : null}
      </SForm>
    </SContainer>
  );
}
