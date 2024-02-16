/* eslint-disable react/require-default-props */
// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// styles
import { SContainer } from "./styles";

type Props = {
  icon: IconProp;
  label: string | React.ReactNode;
  width?: string | undefined;
};

const InformationField = ({ icon, label, width }: Props) => {
  const labelElement = typeof label === "string" ? <p>{label}</p> : label;
  return (
    <SContainer width={width}>
      <FontAwesomeIcon
        icon={icon}
        color="var(--primary-color-green)"
        size="2x"
        style={{ padding: "0.8rem 0.8rem 0.8rem 0", width: "2rem" }}
      />
      {labelElement}
    </SContainer>
  );
};

export default InformationField;
