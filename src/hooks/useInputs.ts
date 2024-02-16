type InputObject = {
  reset: () => void;
  hasChanged: boolean;
  isValid: boolean;
};
export type InputsMethods = {
  reset: () => void;
  haveChanged: boolean;
  areValid: boolean;
};

const useInputs = (...inputs: InputObject[]): InputsMethods => {
  const reset = () => inputs.forEach((input) => input.reset());

  const changedInput = inputs.find((input) => input.hasChanged);
  const invalidInput = inputs.find((input) => !input.isValid);

  return {
    reset,
    haveChanged: changedInput !== undefined,
    areValid: invalidInput === undefined,
  };
};

export default useInputs;
