// hooks/methods
import { FormInputReturnType } from "hooks/useFormInput";

// components
import Input from "components/Reusable/Input/Input";
import LocationAutoComplete from "./LocationAutoComplete"; // must be imported after Input component

type Props = {
  inputState: FormInputReturnType;
  isOnline: boolean;
};

function LocationGroup({ inputState, isOnline }: Props) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Input
        id="event-location"
        name="event-location"
        type={isOnline ? "url" : "text"}
        state={inputState}
        label={`Enter the ${isOnline ? "URL" : "Location"} of your event.`}
        placeholder={isOnline ? "https://www.example.com/" : "Select place"}
        autoComplete={isOnline ? "on" : "off"}
        required
      />
      {!isOnline && <LocationAutoComplete inputState={inputState} />}
    </div>
  );
}

export default LocationGroup;
