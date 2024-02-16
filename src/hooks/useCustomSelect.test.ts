import { act, renderHook } from "@testing-library/react";

import "@testing-library/jest-dom";
import { useCustomSelect } from "./useCustomSelect";

describe("useCustomSelect", () => {
  const mockData = [
    {
      label: "Country1",
      value: 1,
    },
    {
      label: "Country2",
      value: 2,
    },
  ];
  const DEFAULT_VALUE = mockData[0];

  test("Custom methods should return correct value and label respectively", () => {
    const { result } = renderHook(() =>
      useCustomSelect({
        options: mockData,
        defaultValue: DEFAULT_VALUE,
      })
    );
    expect(result.current.getSelectValue()).toBe(DEFAULT_VALUE.value);
    expect(result.current.getSelectLabel()).toBe(DEFAULT_VALUE.label);

    expect(result.current.getSelectValue()).toBe(
      // @ts-ignore
      result.current.props.value!.value
    );
    expect(result.current.getSelectLabel()).toBe(
      // @ts-ignore
      result.current.props.value!.label
    );

    act(() => {
      result.current.props.onChange!(mockData[1], {
        action: "select-option",
        option: mockData[1],
      });
    });

    expect(result.current.getSelectValue()).toBe(mockData[1].value);
    expect(result.current.getSelectLabel()).toBe(mockData[1].label);

    expect(result.current.getSelectValue()).toBe(
      // @ts-ignore
      result.current.props.value!.value
    );
    expect(result.current.getSelectLabel()).toBe(
      // @ts-ignore
      result.current.props.value!.label
    );
  });

  test("should accept isMulti input to transform it into a multi select", () => {
    const { result } = renderHook(() =>
      useCustomSelect({
        options: mockData,
        isMulti: true,
      })
    );
    act(() => {
      result.current.props.onChange!([mockData[0]], {
        action: "select-option",
        option: mockData[0],
      });
    });
    expect(result.current.props.value).toEqual([mockData[0]]);

    act(() => {
      result.current.props.onChange!(
        // @ts-ignore
        [...result.current.props.value, mockData[1]],
        {
          action: "select-option",
          option: mockData[0],
        }
      );
    });

    expect(result.current.props.value).toEqual(mockData);
  });

  test("Should reset to defaultValue prop when reset method is called", () => {
    const { result } = renderHook(() =>
      useCustomSelect({
        options: mockData,
      })
    );

    act(() => {
      result.current.props.onChange!(mockData[1], {
        action: "select-option",
        option: mockData[1],
      });
      result.current.reset();
    });

    expect(result.current.props.value).toEqual(null);
  });

  test("Should provide correct isValid and errorMessage values when required prop is passed down", () => {
    const { result } = renderHook(() =>
      useCustomSelect({
        options: mockData,
        required: true,
      })
    );

    act(() => {
      // @ts-ignore
      result.current.props.onBlur();
    });

    expect(result.current.isValid).toEqual(false);
    expect(result.current.errorMessage).toBeTruthy();

    act(() => {
      result.current.props.onChange!(mockData[1], {
        action: "select-option",
        option: mockData[1],
      });
    });
    expect(result.current.isValid).toEqual(true);
    expect(result.current.errorMessage).toBeFalsy();
  });

  test("should provide correct hasChanged value", () => {
    const { result } = renderHook(() =>
      useCustomSelect({
        options: mockData,
      })
    );

    expect(result.current.hasChanged).toEqual(false);

    act(() => {
      result.current.props.onChange!(mockData[1], {
        action: "select-option",
        option: mockData[1],
      });
    });

    expect(result.current.hasChanged).toEqual(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.hasChanged).toEqual(false);
  });
});

export {};
