import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Input from ".";

test("input change event", () => {
  render(<Input code="4500" isGameEnded={false} />);
  const input = screen.getByTestId("input1");
  expect(input).toContainHTML("");
  fireEvent.input(input, { target: { value: "4" } });
  expect(input).toContainHTML("4");
});

test("input change event with right digit", () => {
  render(<Input code="4500" isGameEnded={false} />);
  const input = screen.getByTestId("input1");
  fireEvent.input(input, { target: { value: "4" } });
  expect(input).toHaveClass("right");
});

test("input change event with wrong digit", () => {
  render(<Input code="4500" isGameEnded={false} />);
  const input = screen.getByTestId("input1");
  fireEvent.input(input, { target: { value: "6" } });
  expect(input).toHaveClass("wrong");
});
