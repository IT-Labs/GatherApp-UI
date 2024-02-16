/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-unused-expressions */
// hooks/methods
import { CheckboxInputReturnType } from "hooks/useCheckbox";

// styles
import {
  Input,
  Switch,
  Label,
  SSpan,
  SContainer,
} from "components/Reusable/Toggle/styles";

type Props = {
  state: CheckboxInputReturnType;
  id: string;
} & JSX.IntrinsicElements["input"];

function Toggle({ state, id }: Props) {
  // Insert colors for the toggle when on/off in <Input> and <Switch>, otherwise the default colors will be used

  // Toggle for event type

  return (
    <SContainer>
      <Label>
        <SSpan data-testid="label 1">{state.label}</SSpan>
        <Input
          id={id}
          data-testid="input 1"
          color=""
          checked={state.checked}
          type="checkbox"
          onChange={state.onChange}
        />
        <Switch color="" />
      </Label>
    </SContainer>
  );
}
export default Toggle;
