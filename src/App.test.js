import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import App from "./App";
import Input from "./components/Input";
import { generateCode } from "./helpers";

describe("main test", () => {
  it("render inputs", () => {
    render(<App />);
    const inputs = screen.getAllByRole("textbox");

    expect(inputs.length).toBe(4);
  });

  it("Generate random 4 digit number", () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;

    const code = generateCode();

    expect(code).toEqual("4500");
  });

  it("fill inputs", () => {
    const setStateMock = jest.fn();
    const useStateMock = (stateMock) => [stateMock, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    render(<Input code="4500" endGame={setStateMock} isGameEnded={false} />);
    fireEvent.change(screen.queryByTestId("input1"), {
      target: { value: "4" },
    });
    fireEvent.change(screen.queryByTestId("input2"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.queryByTestId("input3"), {
      target: { value: "0" },
    });
    fireEvent.change(screen.queryByTestId("input4"), {
      target: { value: "0" },
    });
    render(<App />);
    expect(setStateMock).toHaveBeenCalledTimes(6);
  });
});
