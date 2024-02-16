import { renderHook, act } from "@testing-library/react";
import { z } from "zod";
import useFormInput from "./useFormInput";

describe("useFormInput", () => {
  const mockChangeEvent = (
    value = "abc"
  ): React.ChangeEvent<HTMLInputElement> => {
    return {
      target: {
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
  };

  test("should update input value and validity on user input", () => {
    const { result } = renderHook(() =>
      useFormInput({ initialValue: "", zodSchema: z.string().min(3) })
    );

    expect(result.current.value).toBe("");
    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.onChange(mockChangeEvent());
    });

    expect(result.current.value).toBe("abc");
    expect(result.current.isValid).toBe(true);
  });

  test("should run onChange callback on input change or setValue function", () => {
    let a = false;
    const changeBoolean = () => {
      a = !a;
    };
    const { result } = renderHook(() =>
      useFormInput({ initialValue: "", onChange: changeBoolean })
    );

    act(() => {
      result.current.onChange(mockChangeEvent());
    });

    expect(a).toBe(true);

    act(() => {
      result.current.setValue("Example Value");
    });
    expect(a).toBe(false);
  });

  test("should update hasError and errorMessage on Input Blur", () => {
    const errorMessage = "Input must be at least 4 characters long";
    const { result } = renderHook(() =>
      useFormInput({
        initialValue: "",
        zodSchema: z.string().min(4, { message: errorMessage }),
      })
    );
    expect(result.current.hasError).toBe(false);
    expect(result.current.errorMessage).toBe("");

    act(() => {
      result.current.onBlur();
    });

    expect(result.current.hasError).toBe(true);
    expect(result.current.errorMessage).toBe(errorMessage);
  });

  test("should reset the input to it's initial values when reset is called", () => {
    const { result } = renderHook(() =>
      useFormInput({ initialValue: "", zodSchema: z.string().min(3) })
    );

    const initialState = {
      value: result.current.value,
      hasError: result.current.hasError,
      errorMessage: result.current.errorMessage,
      isValid: result.current.isValid,
    };

    act(() => {
      result.current.onChange(mockChangeEvent());
      result.current.onBlur();
      result.current.reset();
    });

    expect(result.current.value).toBe(initialState.value);
    expect(result.current.hasError).toBe(initialState.hasError);
    expect(result.current.errorMessage).toBe(initialState.errorMessage);
    expect(result.current.isValid).toBe(initialState.isValid);
  });
});
