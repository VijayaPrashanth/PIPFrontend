import React from "react";
import { render, screen } from "@testing-library/react";
import Bill from "./Bill";

describe("Bill Basic rendering", () => {

  it("Should have Bill id", () => {
    render(<Bill />);
    expect(screen.getByTestId("bill")).toBeTruthy();
  });

  it("Should display Bill Details Text", () => {
    render(<Bill />);
    expect(screen.getByText("Bill Details")).toBeInTheDocument();
  })

});