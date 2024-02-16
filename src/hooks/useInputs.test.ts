import { renderHook } from "@testing-library/react";

import "@testing-library/jest-dom";
import useInputs from "./useInputs";

describe("useInputs", () => {
  const mockInputs = [
    { hasChanged: false, isValid: true, reset: () => {} },
    { hasChanged: false, isValid: true, reset: () => {} },
    { hasChanged: false, isValid: true, reset: () => {} },
  ];

  const changedInput = { hasChanged: true, isValid: true, reset: () => {} };
  const invalidInput = { hasChanged: false, isValid: false, reset: () => {} };

  test("should provide valid haveChanged and areValid values", () => {
    const { result } = renderHook(() => useInputs(...mockInputs));

    expect(result.current.haveChanged).toBe(false);
    expect(result.current.areValid).toBe(true);

    const { result: changedResult } = renderHook(() =>
      useInputs(...mockInputs, changedInput)
    );
    expect(changedResult.current.haveChanged).toBe(true);
    expect(changedResult.current.areValid).toBe(true);

    const { result: invalidResult } = renderHook(() =>
      useInputs(...mockInputs, invalidInput)
    );
    expect(invalidResult.current.haveChanged).toBe(false);
    expect(invalidResult.current.areValid).toBe(false);
  });
});
