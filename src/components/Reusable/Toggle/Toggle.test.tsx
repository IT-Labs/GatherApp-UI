import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockCheckboxState } from "utils/mocks/hooks";
import Toggle from "./Toggle";

describe("Toggle", () => {
  const LABEL_ID = "1";
  const view = () => {
    render(<Toggle state={mockCheckboxState} id={LABEL_ID} />);
    const label = screen.getByTestId("label 1");
    const input = screen.getByTestId("input 1") as HTMLInputElement;
    return { label, input };
  };

  test("should bind the state value to the html element", () => {
    const { label, input } = view();
    expect(label.textContent).toBe(mockCheckboxState.label);
    expect(input.checked).toBe(mockCheckboxState.checked);
    expect(input.id).toBe(LABEL_ID);
  });
});

export {};
