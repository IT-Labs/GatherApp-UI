import { act, renderHook } from "@testing-library/react";

import "@testing-library/jest-dom";
import useCheckbox from "./useCheckbox";

describe("useCheckbox", () => {
  const VALUE_MAP = { true: "CORRECT", false: "WRONG" };
  const LABEL = "Answer";
  test("it should change the checked state when the onChange function is invoked", () => {
    const { result } = renderHook(() => useCheckbox({ initialChecked: true }));

    expect(result.current.checked).toBe(true);
    act(() => {
      result.current.onChange();
    });
    expect(result.current.checked).toBe(false);
    act(() => {
      result.current.onChange();
    });
    expect(result.current.checked).toBe(true);
  });

  test("Checkbox value should reflect ValueMap conditional input", () => {
    const { result } = renderHook(() =>
      useCheckbox({ initialChecked: true, valueMap: VALUE_MAP })
    );

    expect(result.current.value).toBe(VALUE_MAP.true);
    act(() => {
      result.current.onChange();
    });
    expect(result.current.value).toBe(VALUE_MAP.false);
  });

  test("Label should be correctly mapped to {label}: {value} format", () => {
    const { result } = renderHook(() =>
      useCheckbox({ initialChecked: true, valueMap: VALUE_MAP, label: LABEL })
    );
    expect(result.current.label).toBe(`${LABEL}: ${result.current.value}`);
  });

  test("should correctly return checked and value in onChange callback", () => {
    let a = true;
    const { result } = renderHook(() =>
      useCheckbox({
        initialChecked: true,
        valueMap: VALUE_MAP,
        onChange: (checked, value) => {
          // We check the opposite scenario because the onChange callback runs
          // before the actual state gets changed
          expect(!result.current.checked).toBe(checked);
          // Since we have validated the checked state, we can check for the value as such:
          expect(value).toBe(VALUE_MAP[`${checked}`]);
          if (!checked) a = false;
        },
      })
    );

    act(() => {
      result.current.onChange();
    });

    expect(a).toBe(false);
  });

  test("should correctly reset to initial state when reset method is called", () => {
    const { result } = renderHook(() =>
      useCheckbox({ initialChecked: true, valueMap: VALUE_MAP, label: LABEL })
    );
    const initialState = result.current;
    act(() => {
      result.current.onChange();
    });
    expect(result.current.checked).toEqual(false);
    expect(result.current.value).toEqual(VALUE_MAP.false);
    act(() => {
      result.current.reset();
    });
    expect(JSON.stringify(result.current)).toStrictEqual(
      JSON.stringify(initialState)
    );
  });
});

export {};
