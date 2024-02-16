// styles
import { SLabel, SSpan, SDiv } from "components/Reusable/Label/styles";

type Props = {
  id: string;
  content: string;
  required: boolean;
};

const Label = ({ id, content, required }: Props) => {
  return (
    <SDiv>
      <SLabel htmlFor={id}>
        {content} {required && <SSpan>*</SSpan>}
      </SLabel>
    </SDiv>
  );
};

export default Label;
