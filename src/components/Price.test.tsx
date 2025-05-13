import React from "react";
import { render, screen } from "@testing-library/react";
import { Price } from "./Price";
import "@testing-library/jest-dom";

// Mock test file - add actual tests when setting up Jest
describe("Price", () => {
  it("renders basic price value", () => {
    render(<Price value={1500} />);
    expect(screen.getByText("$1,500")).toBeInTheDocument();
  });

  it("renders with symbol hidden", () => {
    render(<Price value={1500} showSymbol={false} />);
    expect(screen.getByText("1,500")).toBeInTheDocument();
  });

  it("handles very small numbers correctly", () => {
    render(<Price value={0.000004567} />);
    // Check for scientific notation representation
    const element = screen.getByText((_, node) => {
      return !!(
        node?.textContent?.includes("0.0") &&
        node?.textContent?.includes("4567")
      );
    });
    expect(element).toBeInTheDocument();
  });
});
