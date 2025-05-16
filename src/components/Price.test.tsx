import React from "react";
import { render, screen } from "@testing-library/react";
import { Price } from "./Price";
import "@testing-library/jest-dom";

// Test file for Price component
describe("Price", () => {
  it("renders basic price value in USD (default)", () => {
    render(<Price value={1500} />);
    expect(screen.getByText("$1,500")).toBeInTheDocument();
  });

  it("renders with symbol hidden", () => {
    render(<Price value={1500} showSymbol={false} />);
    expect(screen.getByText("1,500")).toBeInTheDocument();
  });

  it("renders value in EUR", () => {
    render(<Price value={1500} currency="EUR" />);
    // Verificar formato EUR (símbolo € e separador de milhar ponto)
    expect(screen.getByText((_, node) => {
      return !!(
        node?.textContent?.includes("€") &&
        node?.textContent?.includes("1.500")
      );
    })).toBeInTheDocument();
  });

  it("renders value in BRL", () => {
    render(<Price value={1500} currency="BRL" />);
    // Verificar formato BRL (símbolo R$)
    expect(screen.getByText((_, node) => {
      return !!(
        node?.textContent?.includes("R$") &&
        node?.textContent?.includes("1.500")
      );
    })).toBeInTheDocument();
  });

  it("handles very small numbers correctly with USD", () => {
    render(<Price value={0.000004567} />);
    // Check for scientific notation representation
    const element = screen.getByText((_, node) => {
      return !!(
        node?.textContent?.includes("$") &&
        node?.textContent?.includes("0.0") &&
        node?.textContent?.includes("4567")
      );
    });
    expect(element).toBeInTheDocument();
  });

  it("handles very small numbers correctly with EUR", () => {
    render(<Price value={0.000004567} currency="EUR" />);
    // Check for scientific notation representation with EUR symbol
    const element = screen.getByText((_, node) => {
      return !!(
        node?.textContent?.includes("€") &&
        node?.textContent?.includes("0.0") &&
        node?.textContent?.includes("4567")
      );
    });
    expect(element).toBeInTheDocument();
  });
});
